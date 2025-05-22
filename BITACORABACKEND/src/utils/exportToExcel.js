const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

async function exportBitacoraToExcel(bitacora) {
  try {
    // 1. Cargar la plantilla
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path.join(__dirname, '../data/BITACORA.xlsx'));
    const worksheet = workbook.worksheets[0]; // Primera hoja

    // 2. Escribir los valores básicos
    worksheet.getCell('D4').value = bitacora.tipoAeronave;
    worksheet.getCell('E4').value = bitacora.tipoAeronave;
    worksheet.getCell('F4').value = bitacora.tipoAeronave;
    worksheet.getCell('I4').value = bitacora.matricula;
    worksheet.getCell('J4').value = bitacora.matricula;
    worksheet.getCell('M4').value = bitacora.organismo;
    worksheet.getCell('N4').value = bitacora.organismo;
    worksheet.getCell('P4').value = bitacora.folio;

    // 3. Escribir información de vuelo
    worksheet.getCell('B7').value = bitacora.lugarSalida;
    worksheet.getCell('E7').value = bitacora.lugarLlegada;
    worksheet.getCell('G7').value = bitacora.tipoVuelo;
    worksheet.getCell('I7').value = bitacora.eventosTorque;
    worksheet.getCell('K7').value = bitacora.cargaAceiteMotores;
    worksheet.getCell('N7').value = bitacora.cargaAceiteAPU;
    worksheet.getCell('E9').value = bitacora.fecha ? new Date(bitacora.fecha).toLocaleDateString() : '';
    worksheet.getCell('C9').value = bitacora.categoria;

    // 4. Escribir observaciones
    worksheet.getCell('B10').value = bitacora.observaciones;

    // 5. Escribir correcciones
    if (bitacora.correcciones && bitacora.correcciones.length > 0) {
      bitacora.correcciones.forEach((correccion, index) => {
        const row = 9 + index; // Empezar desde la fila 9
        worksheet.getCell(`G${row}`).value = correccion.texto;
        worksheet.getCell(`J${row}`).value = correccion.fecha ? new Date(correccion.fecha).toLocaleDateString() : '';
        worksheet.getCell(`I${row}`).value = correccion.usuario;
      });
    }
/*
    // 6. Escribir componentes
    if (bitacora.componentes && bitacora.componentes.length > 0) {
      bitacora.componentes.forEach((componente, index) => {
        const row = 20 + index; // Empezar desde la fila 20
        worksheet.getCell(`B${row}`).value = componente.nombre;
        worksheet.getCell(`D${row}`).value = componente.cantidad;
        worksheet.getCell(`F${row}`).value = componente.unidad;
      });
    }

    // 7. Escribir órdenes
    worksheet.getCell('B30').value = bitacora.ordenTrabajo;
    worksheet.getCell('D30').value = bitacora.ordenSuministro;
    worksheet.getCell('F30').value = bitacora.ordenConcentracion;
    worksheet.getCell('H30').value = bitacora.solicitudComponente;

    // 8. Escribir firmas
    if (bitacora.signatureIssuing) {
      worksheet.getCell('B35').value = bitacora.signatureIssuing.grado;
      worksheet.getCell('D35').value = bitacora.signatureIssuing.nombre;
      worksheet.getCell('F35').value = bitacora.signatureIssuing.matricula;
      worksheet.getCell('H35').value = bitacora.signatureIssuing.fecha ? new Date(bitacora.signatureIssuing.fecha).toLocaleDateString() : '';
    }

    if (bitacora.signatureDoer) {
      worksheet.getCell('B37').value = bitacora.signatureDoer.grado;
      worksheet.getCell('D37').value = bitacora.signatureDoer.nombre;
      worksheet.getCell('F37').value = bitacora.signatureDoer.matricula;
      worksheet.getCell('H37').value = bitacora.signatureDoer.mel;
      worksheet.getCell('J37').value = bitacora.signatureDoer.fecha ? new Date(bitacora.signatureDoer.fecha).toLocaleDateString() : '';
    }

    if (bitacora.signatureDelivery) {
      worksheet.getCell('B39').value = bitacora.signatureDelivery.grado;
      worksheet.getCell('D39').value = bitacora.signatureDelivery.nombre;
      worksheet.getCell('F39').value = bitacora.signatureDelivery.matricula;
      worksheet.getCell('H39').value = bitacora.signatureDelivery.fecha ? new Date(bitacora.signatureDelivery.fecha).toLocaleDateString() : '';
    }
*/
    // 9. Guardar el archivo con el folio como parte del nombre
    const outputPath = path.join(__dirname, '../data', `BITACORA-${bitacora.folio}.xlsx`);
    await workbook.xlsx.writeFile(outputPath);
    console.log('Archivo Excel generado correctamente:', outputPath);
    return outputPath;
  } catch (error) {
    console.error('Error al exportar a Excel:', error);
    throw error;
  }
}

module.exports = exportBitacoraToExcel;