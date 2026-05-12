import { PoliedroData } from '../types';

export const ContractText = ({ data, poliedroData }: {
  data: {
    nombre: string;
    cc: string;
    equipo: string;
    marca: string;
    asesor: string;
  }, 
  poliedroData: PoliedroData | null
}) => {
  const valorTotal = poliedroData?.valorTotal || poliedroData?.saldoADiferir || 'Seleccione una opción';
  const valorIVA = poliedroData?.valorIVA || '0';
  const pagoInicial = poliedroData?.pagoInicial || '0';
  const saldoEquipo = poliedroData?.saldoADiferir || 'Seleccione una opción';
  const meses = poliedroData?.plazoSimulado || '6';
  const cuota = poliedroData?.cuotaSimulada || '12';

  return (
    <div className="space-y-4 text-justify font-sans text-xs leading-relaxed">
      <p className="text-center font-bold text-lg mb-6 underline">CONTRATO DE FINANCIACIÓN DE EQUIPO DE TECNOLOGÍA O TERMINAL MÓVIL</p>
      
      <p>Señor/Señora <strong>{data.nombre}</strong>, Realizaremos la grabación del contrato para efectos de calidad y prestación de los servicios.</p>
      
      <p>El prestador de servicios es Comcel en Adelante Claro.</p>
      
      <p>Señor/Señora <strong>{data.nombre}</strong>, informar los siguientes datos tal cual como aparecen en su documento de identidad:</p>
      <ul className="list-disc ml-8">
        <li>Nombre y Apellidos: <strong>{data.nombre}</strong></li>
        <li>Número de cédula: <strong>{data.cc}</strong></li>
      </ul>

      <p>Señor/Señora <strong>{data.nombre}</strong>, autoriza a CLARO para obtener de cualquier fuente toda la información relevante para conocer su desempeño como deudor, y que la misma sea utilizada en caso de reporte y actualización de información desde y ante entidades crediticias o centrales que Administran datos. Acepta: <strong>SÍ</strong></p>

      <p>Señor/Señora <strong>{data.nombre}</strong>, autoriza a CLARO para realizar el tratamiento de sus datos personales, con fines de prestación del servicio, relación contractual comerciales, publicitarios y trasmisión de datos a terceros, en los términos detallados en la política de tratamiento disponible para consulta en www.claro.com.co, Así mismo autoriza a CLARO el tratamiento de su dato sensible de voz para prevenir fraudes en la adquisición de productos y servicios y validar su identidad en próximos contactos telefónicos. Usted puede consultar, actualizar y rectificar sus datos, solicitar o revocar esta autorización, conocer el uso dado a sus datos y contactar a la Superintendencia de Industria y Comercio. Acepta: <strong>SÍ</strong></p>

      <p>"Señor/ra <strong>{data.nombre}</strong>, Le confirmo que usted acaba de adquirir el equipo de Tecnología ó equipo terminal móvil con los siguientes datos el cual ira con cargo a su factura de servicios fijos y/o móviles.</p>

      <div className="border p-4 bg-gray-50 rounded">
        <p>Nombre Del Producto: <strong>{data.equipo}</strong></p>
        <p>Fabricante: <strong>{data.marca}</strong></p>
        <p>Referencia: XXXX IMEI (si aplica) XXXX</p>
        <p>Características o funcionalidades del Equipo: Estándar de fabricante</p>
      </div>

      <div className="border p-4 bg-gray-50 rounded">
        <p>Valor Total del Equipo: <strong>{valorTotal}</strong> (IVA Incluido)</p>
        <p>IVA del Equipo: <strong>{valorIVA}</strong></p>
        <p>Pago Inicial: <strong>{pagoInicial}</strong></p>
        <p>Saldo del Equipo: <strong>{saldoEquipo}</strong></p>
        <p>Número de cuotas: <strong>{meses}</strong></p>
        <p>Valor de la Cuota: <strong>{cuota}</strong></p>
        <p>Tasa de interés EA: 28.17%</p>
        <p>Tasa de Interés Moratoria: 28.17%</p>
        <p>Tasa de interés Máxima Legal: 28.17%</p>
        <p>Tasa mensual: 2.09%</p>
      </div>

      <p>Podrá pagar anticipadamente parcial o total el saldo de su crédito con la liquidación de intereses al día del pago, sin que haya lugar al pago de cláusulas penales o sanciones económicas, ni exigiremos el pago de interés no causados.</p>

      <p>El comprador acepta y reconoce que CLARO tiene reserva de dominio del o los equipo (s) arriba descrito hasta que el comprador haya pagado el 100% del valor.</p>

      <p className="bg-yellow-50 p-2">El comprador acepta expresamente con la suscripción de este contrato, que, en caso de mora de cualquiera de las cuotas aquí pactadas, se inhabilitará(n) el/los equipo(s) terminales móviles y/o de tecnología propiedad de CLARO, previo aviso por cualquier medio idóneo. Así mismo se acelerará el pago de las cuotas faltantes, aplica cobro de intereses moratorios a la máxima tasa permitida y será el responsable del pago de los gastos de cobranza. Estos gastos serán proporcionales a la gestión de cobranza realizada y se determinarán de acuerdo con las tarifas y procedimientos establecidos por CLARO, los cuales pueden ser consultados en: www.claro.com.co/portal/co/pdf/eq-financiado.pdf. Estos costos estarán sujetos a las demás condiciones de los valores financiados conforme al presente contrato, y se enmarcarán dentro de los límites establecidos por la ley.</p>

      <p>Señor <strong>{data.nombre}</strong> le informamos que el costo del envió del equipo a su dirección de domicilio tendrá un cobro de $21.500 con IVA Incluido y este valor será cargado en su siguiente factura.</p>

      <p>Tenga presente que CLARO realizará la entrega del equipo en la dirección indicada por usted y podrá ser entregada a cualquier ciudadano mayor de edad que se encuentre en el predio, o podría realizar la entrega hasta donde el reglamento de oficinas y conjuntos lo permita. Si se presenta algún inconveniente, le informaremos a través de un mensaje de texto.</p>

      <p>Tenga en cuenta que puede agendar la entrega del producto de acuerdo a sus necesidades previa validación de cobertura. En caso contrario la entrega se realizará a más tardar en un lapso de 5 días hábiles. En caso de presentarse novedades logísticas en el proceso de entrega, usted será contactado para programar el reagendamiento.</p>

      <p>De igual manera le informo que en el transcurso del día recibirá un mensaje vía WhatsApp a su número registrado confirmando la adquisición del producto de tecnología, tenga en cuenta que ud deberá dar respuesta como confirmación de compra vía mensaje WhatsApp, en caso de que Claro no reciba ninguna respuesta esta venta quedara cancelada.</p>

      <p>El período de la garantía empieza a contarse desde la fecha de entrega del equipo. Recuerde que la efectividad de la garantía está condicionada a que el equipo haya recibido un uso y mantenimiento adecuado, de conformidad con los manuales que son entregados con el equipo, por lo que el comprador acepta que debe informarse. Para hacer efectiva la garantía por cualquier motivo, comuníquese a los teléfonos y/o datos de contacto indicados en el certificado de garantía y/o en la página de Internet: www.claro.com.co y/o en los centros de servicio allí indicados.</p>

      <p>Usted puede retractarse de la compra dentro de los (5) días hábiles siguientes a la entrega, para el efecto debe devolver el producto, empaque y accesorios en las mismas condiciones recibidas.</p>

      <p className="mt-8 font-semibold">Recuerde que mi nombre es <strong>{data.asesor}</strong>, Bienvenido a Claro. Estamos comprometidos con el mejor servicio.</p>
    </div>
  );
}
