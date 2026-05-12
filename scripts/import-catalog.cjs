const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../catalogo.csv');
const tsPath = path.join(__dirname, '../src/data/equipment.ts');

if (!fs.existsSync(csvPath)) {
  console.error("No se encontro el archivo catalogo.csv en la carpeta principal. Por favor sube el archivo.");
  process.exit(1);
}

const lines = fs.readFileSync(csvPath, 'utf8').split('\n');
const equipments = [];
const seenNames = new Set();

lines.forEach(line => {
  if (!line.trim()) return;
  const cols = line.split(';');
  
  if (cols.length >= 15 && !line.includes('SMARTPHONE') && cols[0] !== 'Marca' && cols[0] !== 'EQUIPO') {
    const marca = cols[0].trim().toUpperCase();
    const nombre = (cols[3] || '').replace(/"/g, '').trim();
    let precioStr = cols[9] || '0';
    let precio = parseInt(precioStr.replace(/\D/g, ''), 10);
    
    if (isNaN(precio) || precio === 0) {
        for (let i = 5; i < 11; i++) {
           let temp = parseInt((cols[i] || '0').replace(/\D/g, ''), 10);
           if (!isNaN(temp) && temp > 0) { precio = temp; break; }
        }
    }
    
    if (nombre && !isNaN(precio) && precio > 0 && !seenNames.has(nombre)) {
      equipments.push({ nombre, marca, categoria: 'TECNOLOGIA', precio });
      seenNames.add(nombre);
    }
  } 
  else if (line.includes('SMARTPHONE') || line.includes('VOZ')) {
    const nombre = (cols[0] || '').replace(/"/g, '').trim();
    let marca = nombre.split(' ')[0].toUpperCase();
    
    if (nombre.toUpperCase().includes('IPHONE') || nombre.toUpperCase().includes('APPLE')) marca = 'APPLE';
    if (nombre.toUpperCase().includes('GALAXY')) marca = 'SAMSUNG';
    
    let precio = 0;
    for (let i = 5; i < cols.length; i++) {
        let textVal = cols[i] || '0';
        if (textVal.includes('$')) {
            let temp = parseInt(textVal.replace(/\D/g, ''), 10);
            if (!isNaN(temp) && temp > 0) {
                precio = temp;
                break;
            }
        }
    }

    if (nombre && !isNaN(precio) && precio > 0 && !seenNames.has(nombre)) {
      equipments.push({ nombre, marca, categoria: 'SMARTPHONE', precio });
      seenNames.add(nombre);
    }
  }
});

if (equipments.length > 0) {
  const tsContent = `// Archivo autogenerado a partir de catalogo.csv
import { Equipment } from '../types';

export const EQUIPMENT_DATA: Equipment[] = ${JSON.stringify(equipments, null, 2)};
`;

  fs.writeFileSync(tsPath, tsContent, 'utf8');
  console.log('¡Éxito! Se actualizaron ' + equipments.length + ' equipos en la base de datos.');
} else {
  console.log("No se encontraron equipos válidos para importar en el CSV.");
}
