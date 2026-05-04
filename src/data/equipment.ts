import { Equipment } from '../types';

export const EQUIPMENT_DATA: Equipment[] = [
  // ACER
  { marca: "ACER", categoria: "PORTATIL", nombre: "PORT 14\" ACER Core i3 TMP214-55-38VL", precio: 2432900, specs: ["Intel Core i3", "14 Pulgadas", "SSD 256GB", "Windows 11 Pro"] },
  { marca: "ACER", categoria: "PORTATIL", nombre: "Port A515-54-31S4 Ici3 4G 15.6\" Slv Acer", precio: 2150000, specs: ["Core i3", "4GB RAM", "15.6 Pulgadas", "Slim Design"] },
  { marca: "ACER", categoria: "PORTATIL", nombre: "Portátil 14\" Acer 381X Ci3 16GBSteelGray", precio: 2899900, specs: ["16GB RAM", "Intel Core i3", "Chasis Metálico"] },
  { marca: "ACER", categoria: "PORTATIL", nombre: "Portátil 16\" Acer 32KZ Ci3 16GBSteelGray", precio: 3100000, specs: ["Pantalla 16\" Amplia", "16GB RAM", "Alto Rendimiento"] },
  { marca: "ACER", categoria: "PORTATIL", nombre: "PRT TMP214-55-586G ICI5 16G 14\" GR ACER", precio: 3450000, specs: ["Intel Core i5", "16GB RAM", "14 Pulgadas"] },
  { marca: "ACER", categoria: "TABLET", nombre: "Tablet Acer P10 10.4 128GB", precio: 850000, specs: ["Pantalla 2K", "128GB Almacenamiento", "Batería 6000mAh"] },

  // AIWA
  { marca: "AIWA", categoria: "BARRA SONIDO", nombre: "Barra de sonido Aiwa AWSBH1W-W", precio: 769900, specs: ["Bluetooth 5.0", "HDMI ARC", "Sonido Envolvente"] },
  { marca: "AIWA", categoria: "EQUIPO SONIDO", nombre: "Equipo One box AIWA 2000W pok100d", precio: 1899900, specs: ["2000W Potencia", "Efectos DJ", "Doble entrada Mic"] },
  { marca: "AIWA", categoria: "TORRE SONIDO", nombre: "Onebody Aiwa AWPOK7D 30W RMS Radio FM", precio: 550000, specs: ["300W RMS", "Portátil", "Radio FM"] },
  { marca: "AIWA", categoria: "TORRE SONIDO", nombre: "Torre Sonido Aiwa AWPOH5D Negro", precio: 1124900, specs: ["Potencia 100W", "Luces LED", "Radio FM"] },
  { marca: "AIWA", categoria: "PARLANTE", nombre: "Parlante Aiwa Bluetooth AWS1000BT", precio: 858900, specs: ["Sonido 360", "IPX6 Resistente", "Batería 10h"] },

  // AMAZON
  { marca: "AMAZON", categoria: "ASISTENTE DE VOZ", nombre: "Altavoz Intelig Echo Dot 5Gen Negro Amaz", precio: 328900, specs: ["Alexa Integrada", "Mejor Sonido", "Sensor de Temperatura"] },
  { marca: "AMAZON", categoria: "ASISTENTE DE VOZ", nombre: "Amazon Echo Dot 5 Gen + Echo Dot 5 Gen", precio: 599900, specs: ["Combo 2 Unidades", "Alexa", "Multi-room"] },

  // APPLE
  { marca: "APPLE", categoria: "AUDIFONOS", nombre: "AirPods Pro2 Bltth 5.3 Blanco Apple", precio: 1305900, specs: ["Cancelación activa", "Audio espacial", "USB-C"] },
  { marca: "APPLE", categoria: "AUDIFONOS", nombre: "AirPods 4 Nc Btth 5.3 Blanco Apple", precio: 950000, specs: ["Cancelación de Ruido", "Audio Adaptativo"] },

  // ARGOM
  { marca: "ARGOM", categoria: "AUDIFONOS", nombre: "Audifonos Argom E40 Prupura", precio: 119900, specs: ["Bluetooth 5.3", "Diseño Ergonómico"] },
  { marca: "ARGOM", categoria: "CAMARA", nombre: "Camara de Accion Epic 90 negra Argom", precio: 799900, specs: ["Resolución 4K", "Sumergible 30m"] },
  { marca: "ARGOM", categoria: "SMARTWATCH", nombre: "Reloj Argom Skeiwatch C80 Negro", precio: 569900, specs: ["Pantalla AMOLED", "Llamadas BT"] },
  { marca: "ARGOM", categoria: "SMARTWATCH", nombre: "Skeiwatch C61 + Audifonos E66 negros", precio: 650000, specs: ["Combo Reloj + Audifonos", "Llamadas BT"] },

  // ASUS
  { marca: "ASUS", categoria: "PORTATIL", nombre: "PC ASUS Ci3 1315U 512GB 15.6P", precio: 2336900, specs: ["Intel Core i3 13va Gen", "8GB RAM", "SSD 512GB"] },
  { marca: "ASUS", categoria: "PORTATIL", nombre: "Portátil ASUS Ci3-1315U 8GB 512GB SSD Combo M+M", precio: 2550000, specs: ["Incluye Mouse y Maletín"] },

  // BELKIN
  { marca: "BELKIN", categoria: "CARGADOR", nombre: "Cargador Pared Belkin 1P Usb-C 30W+Cable", precio: 176900, specs: ["Carga rápida 30W", "Incluye Cable"] },
  { marca: "BELKIN", categoria: "POWER BANK", nombre: "POWER BANK MAGNETICO 7.5W 5000MAH BELK", precio: 279900, specs: ["Carga MagSafe", "Compacto"] },
  { marca: "BELKIN", categoria: "LAMINA", nombre: "SFP Tempered Glass iPhone 15 Pro", precio: 129000, specs: ["Vidrio Templado 9H", "Protección 360"] },

  // ESENSES
  { marca: "ESENSES", categoria: "PARLANTE", nombre: "Parlante Esenses SP-5360 Negro", precio: 339900, specs: ["Bluetooth 30W", "Luces RGB"] },
  { marca: "ESENSES", categoria: "SMARTWATCH", nombre: "Smart Watch AMOLED 1.96\" Ref SW-32 W", precio: 235900, specs: ["Pantalla 1.96\"", "AMOLED"] },

  // HISENSE
  { marca: "HISENSE", categoria: "TELEVISOR", nombre: "TV 65Q6N 65\" 4K QLED GOOGLE_TV NEGR HSSN", precio: 3457900, specs: ["QLED 4K", "65 Pulgadas", "Google TV"] },
  { marca: "HISENSE", categoria: "TELEVISOR", nombre: "TV Hisense 50\" QLED UHD 4K Smart TV50Q6N", precio: 2450000, specs: ["50 Pulgadas", "QLED", "Google TV"] },

  // HONOR
  { marca: "HONOR", categoria: "SMARTWATCH", nombre: "SMARTWATCH HONOR WATCH 4", precio: 699900, specs: ["AMOLED", "GPS", "Batería Pro"] },
  { marca: "HONOR", categoria: "TABLET", nombre: "Tablet Honor Pad X9 128GB", precio: 849900, specs: ["120Hz", "6 Parlantes", "128GB"] },
  { marca: "HONOR", categoria: "AUDIFONOS", nombre: "Honor Choice earbuds clip Negro", precio: 599900, specs: ["Clip-on Design", "Open-ear Audio"] },
  { marca: "HONOR", categoria: "PATINETA", nombre: "Honor Choice Electric Scooter P10", precio: 1999900, specs: ["Autonomía 35km", "Velocidad 25km/h"] },

  // HP
  { marca: "HP", categoria: "PORTATIL", nombre: "HP 255 G10 PC Ryzen 5 16GB 512GB 15.6\"", precio: 3401900, specs: ["Ryzen 5", "16GB RAM", "SSD 512GB"] },
  { marca: "HP", categoria: "PORTATIL", nombre: "HP 255 G10 PCRyz 3 16GB 512GB 15.5\" + MORRAL", precio: 2950000, specs: ["Ryzen 3", "16GB RAM", "Incluye Morral"] },
  { marca: "HP", categoria: "PORTATIL", nombre: "Hp 240 G8 Ci3 - 8/256/14\"", precio: 2100000, specs: ["Core i3", "8GB RAM", "Portable"] },

  // HUAWEI
  { marca: "HUAWEI", categoria: "SMARTWATCH", nombre: "Huawei GT5Pro 46mm Negro", precio: 1460900, specs: ["Titanio", "Batería 14 días"] },
  { marca: "HUAWEI", categoria: "SMARTWATCH", nombre: "Huawei Watch Fit 3 Black", precio: 650000, specs: ["Diseño Cuadrado", "AMOLED"] },
  { marca: "HUAWEI", categoria: "TABLET", nombre: "Huawei Matepad 11.5\" 128 GB", precio: 1753900, specs: ["120Hz", "PC-Level Tasks"] },
  { marca: "HUAWEI", categoria: "SMARTBAND", nombre: "Huawei Band 9 Negro", precio: 220000, specs: ["Monitoreo Sueño", "Carga Rápida"] },
  { marca: "HUAWEI", categoria: "AUDIFONOS", nombre: "Huawei Freebuds Pro 5 Negro", precio: 766900, specs: ["Hi-Res Audio", "ANC Inteligente"] },

  // KALLEY
  { marca: "KALLEY", categoria: "TELEVISOR", nombre: "TV KALLEY 58\" GTV QLED 4KUHD", precio: 2669900, specs: ["58 Pulgadas", "Google TV", "QLED 4K"] },
  { marca: "KALLEY", categoria: "TELEVISOR", nombre: "TV KALLEY 43\" K-GTV43FHD GOOGLE TV", precio: 1350000, specs: ["43 Pulgadas", "Full HD", "Google TV"] },
  { marca: "KALLEY", categoria: "TABLET", nombre: "Tablet KALLEY 10” T10 128GB WiFi Gris", precio: 750000, specs: ["10 Pulgadas", "128GB"] },
  { marca: "KALLEY", categoria: "SMARTWATCH", nombre: "Reloj KALLEY K-SWN4 36mm Negro Azul", precio: 235900, specs: ["36mm", "Notificaciones"] },

  // LENOVO
  { marca: "LENOVO", categoria: "PORTATIL", nombre: "Notebook Lenovo V14 G5 IRL Ci3 8GB 256GB 14\"", precio: 3212900, specs: ["Intel Core i3", "8GB RAM", "SSD 256GB"] },
  { marca: "LENOVO", categoria: "PORTATIL", nombre: "Port IP Slim 3 15AMN8 R5 8GB 512GB 15.6\"", precio: 3100000, specs: ["AMD Ryzen 5", "Slim Design"] },
  { marca: "LENOVO", categoria: "TABLET", nombre: "Tablet Lenovo M11 4 128GB", precio: 930900, specs: ["Incluye Lápiz", "Dolby Atmos"] },

  // MOTOROLA
  { marca: "MOTOROLA", categoria: "AUDIFONOS", nombre: "Motorola Moto Buds + Negros", precio: 549900, specs: ["Hi-Res Audio", "ANC"] },
  { marca: "MOTOROLA", categoria: "SMARTWATCH", nombre: "Smartwatch Motorola Moto Watch Fit", precio: 527900, specs: ["Deportivo", "GPS App"] },
  { marca: "MOTOROLA", categoria: "LOCALIZADOR", nombre: "Motorola Moto TAG Blueberry", precio: 150000, specs: ["Rastreo Preciso", "Larga Batería"] },

  // OPPO
  { marca: "OPPO", categoria: "SMARTWATCH", nombre: "SmartWatch X OPPO Negro", precio: 999900, specs: ["Wear OS", "Batería 100h"] },
  { marca: "OPPO", categoria: "TABLET", nombre: "Tab OPD2419 10.5\" 128G BLTTH5.3 AZL OPPO", precio: 1150900, specs: ["10.5 Pulgadas", "128GB"] },

  // PANASONIC
  { marca: "PANASONIC", categoria: "TELEVISOR", nombre: "TV PANASONIC 55\" 55NX700 LED 4K UHD Google TV", precio: 2950000, specs: ["55 Pulgadas", "4K UHD"] },
  { marca: "PANASONIC", categoria: "MINICOMPONENTE", nombre: "Mini Componente PANASONIC TMAX15 300W", precio: 950000, specs: ["300W RMS", "Bluetooth"] },

  // SAMSUNG
  { marca: "SAMSUNG", categoria: "TELEVISOR", nombre: "Tv Sams 65\" DU7000 Crystal UHD4K SmartTv", precio: 3808900, specs: ["65 Pulgadas", "Crystal 4K"] },
  { marca: "SAMSUNG", categoria: "SMARTWATCH", nombre: "Galaxy Watch 8 Classic 47mm NGR", precio: 2299900, specs: ["Bisel Giratorio", "Zafiro"] },
  { marca: "SAMSUNG", categoria: "TABLET", nombre: "Galaxy Tab S10 FE 128GB Gris", precio: 2013950, specs: ["S-Pen Inluido", "Resistente IP68"] },
  { marca: "SAMSUNG", categoria: "SMARTBAND", nombre: "Banda Samsung Galaxy Fit 3 Negro", precio: 280000, specs: ["Fitness Tracker", "AMOLED"] },
  { marca: "SAMSUNG", categoria: "BARRA SONIDO", nombre: "Barra de Sonido Samsung HW-B400F/ZL", precio: 599900, specs: ["Bajos Potentes"] },

  // SEGWAY
  { marca: "SEGWAY", categoria: "PATINETA", nombre: "PATINETA E2PLUSII 500W 25KM DGT NGR SGWY", precio: 2250000, specs: ["500W Potencia", "Tablero Digital"] },

  // SONY
  { marca: "SONY", categoria: "CONSOLA", nombre: "CS PS5 SLM_DG 825G + VJ ASTRBT + VJ GT7 SONY", precio: 3499900, specs: ["Consola Slim", "825GB SSD"] },

  // TCL
  { marca: "TCL", categoria: "TELEVISOR", nombre: "TV 55P655 55\" 4KUHD LED SMART GOOGLE TCL", precio: 2450000, specs: ["55 Pulgadas", "Google TV"] },
  { marca: "TCL", categoria: "BARRA SONIDO", nombre: "Barra Sonido TCL S45H", precio: 650000, specs: ["Sonido Crystal", "Compacta"] },

  // XIAOMI
  { marca: "XIAOMI", categoria: "PATINETA", nombre: "XIAOMI ELECTRIC SCOOTER 4 EU", precio: 1970900, specs: ["Autonomía 30km", "Neumáticos 10\""] },
  { marca: "XIAOMI", categoria: "ASPIRADORA", nombre: "ASPRD RBOT VACUUMS20+ 55W WIFI BLN XIAO", precio: 1399900, specs: ["Láser LDS", "App Control"] },
  { marca: "XIAOMI", categoria: "FREIDORA", nombre: "AIR FRYER ESSENTIAL 6L 1550W XIAOMI", precio: 450000, specs: ["6 Litros", "Digital"] },
  { marca: "XIAOMI", categoria: "SMARTWATCH", nombre: "Xiaomi Watch 5 47mm Negro", precio: 850000, specs: ["47mm", "AMOLED Pro"] },
  { marca: "XIAOMI", categoria: "SMARTBAND", nombre: "SMART BAND 9 1.62\" BT 5.4 AZUL XIAO", precio: 250000, specs: ["Frecuencia Cardiaca", "150 Modos"] },

  // ZTE
  { marca: "ZTE", categoria: "SMARTWATCH", nombre: "SMRTWTCH LIVE3 46MM BT5.3 290MAH NGR ZTE", precio: 350000, specs: ["46mm", "Llamadas BT"] },

  // COMBOS VIP
  { 
    marca: "CXD PREMIUM", 
    categoria: "COMBO VIP", 
    nombre: "Combo VIP: Samsung 65\" 4K + Barra HW-B400F + S-Pen", 
    precio: 4600000, 
    specs: ["Entretenimiento Total", "Instalación Gratis"] 
  },
  { 
    marca: "CXD PRO", 
    categoria: "COMBO VIP", 
    nombre: "Pack Productividad: Lenovo V14 + Mouse + Morral + Tablet", 
    precio: 4200000, 
    specs: ["Trabajo y Estudio", "Kit Completo"] 
  }
].sort((a, b) => b.precio - a.precio);
