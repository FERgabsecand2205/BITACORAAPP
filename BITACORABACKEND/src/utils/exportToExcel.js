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
    //worksheet.getCell('E4').value = bitacora.tipoAeronave;
    //worksheet.getCell('F4').value = bitacora.tipoAeronave;
    worksheet.getCell('I4').value = bitacora.matricula;
    //worksheet.getCell('J4').value = bitacora.matricula;
    worksheet.getCell('M4').value = bitacora.organismo;
    //worksheet.getCell('N4').value = bitacora.organismo;
    worksheet.getCell('P4').value = bitacora.folio;

    // 3. Escribir información de vuelo
    worksheet.getCell('C7').value = bitacora.lugarSalida;
    worksheet.getCell('E7').value = bitacora.lugarLlegada;
    worksheet.getCell('G7').value = bitacora.tipoVuelo;
    worksheet.getCell('I7').value = bitacora.eventosTorque;
    worksheet.getCell('K7').value = bitacora.cargaAceiteMotores;
    worksheet.getCell('N7').value = bitacora.cargaAceiteAPU;
    worksheet.getCell('E9').value = bitacora.fechaInfoFlight ? new Date(bitacora.fechaInfoFlight).toLocaleDateString() : '';
    worksheet.getCell('E9').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('C9').value = bitacora.categoria;

    // 4. Escribir observaciones
    worksheet.getCell('B10').value = bitacora.observacionesInfoFlight;
    worksheet.getCell('B10').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('B15').value = bitacora.observacionesComments;
    worksheet.getCell('B15').alignment = { vertical: 'middle', horizontal: 'center' };

    // 5. Escribir correcciones
    worksheet.getCell('G9').value = bitacora.correcciones[0].codigoATA;
    worksheet.getCell('I9').value = bitacora.correcciones[0].mmReferencia;
    worksheet.getCell('J9').value = new Date(bitacora.correcciones[0].fechaCorreccion).toLocaleDateString();

    // Escribir observaciones de InfoFlightPt2
    worksheet.getCell('F10').value = bitacora.observacionesInfoFlightPt2;

    // Escribir componentes (máximo 3)
    if (bitacora.componentes && bitacora.componentes.length > 0) {
      // Componente 1
      if (bitacora.componentes[0]) {
        worksheet.getCell('K10').value = bitacora.componentes[0].numeroParte;
        worksheet.getCell('L10').value = bitacora.componentes[0].posicion;
        worksheet.getCell('M10').value = bitacora.componentes[0].numeroSerieOFF;
        worksheet.getCell('O10').value = bitacora.componentes[0].numeroSerieON;
        worksheet.getCell('K11').value = `(NOMENCLATURA DEL COMPONENTE) ${bitacora.componentes[0].nomenclatura}`;
      }

      // Componente 2
      if (bitacora.componentes[1]) {
        worksheet.getCell('K13').value = bitacora.componentes[1].numeroParte;
        worksheet.getCell('L13').value = bitacora.componentes[1].posicion;
        worksheet.getCell('M13').value = bitacora.componentes[1].numeroSerieOFF;
        worksheet.getCell('O13').value = bitacora.componentes[1].numeroSerieON;
        worksheet.getCell('K14').value = `(NOMENCLATURA DEL COMPONENTE) ${bitacora.componentes[1].nomenclatura}`;
      }

      // Componente 3
      if (bitacora.componentes[2]) {
        worksheet.getCell('K16').value = bitacora.componentes[2].numeroParte;
        worksheet.getCell('L16').value = bitacora.componentes[2].posicion;
        worksheet.getCell('M16').value = bitacora.componentes[2].numeroSerieOFF;
        worksheet.getCell('O16').value = bitacora.componentes[2].numeroSerieON;
        worksheet.getCell('K17').value = `(NOMENCLATURA DEL COMPONENTE) ${bitacora.componentes[2].nomenclatura}`;
      }
    }

    // Escribir campos de InfoFlightOrders
    worksheet.getCell('K18').value = bitacora.ordenTrabajo;
    worksheet.getCell('K19').value = bitacora.ordenSuministro;
    worksheet.getCell('K20').value = bitacora.ordenConcentracion;
    worksheet.getCell('K20').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('K21').value = bitacora.solicitudComponente;
    worksheet.getCell('K21').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('K22').value = bitacora.categoriaInfoFlightOrders;

    // Escribir datos de firma de emisión
    if (bitacora.signatureIssuing) {
      // Concatenar grado, nombre y matrícula con saltos de línea
      const signatureText = [
        bitacora.signatureIssuing.grado,
        bitacora.signatureIssuing.nombre,
        bitacora.signatureIssuing.matricula
      ].filter(Boolean).join('\n');
      
      worksheet.getCell('B20').value = signatureText;
      worksheet.getCell('B20').alignment = { vertical: 'middle', wrapText: true };

      // Insertar la imagen de la firma
      if (bitacora.signatureIssuing.firma?.data) {
        try {
          const imageId = workbook.addImage({
            base64: bitacora.signatureIssuing.firma.data,
            extension: 'png',
          });

          // Ajustar el tamaño de la imagen para que se ajuste desde E20 hasta E23
          worksheet.addImage(imageId, {
            tl: { col: 4, row: 19 }, // E20
            br: { col: 5, row: 22 }, // E23
          });

          // Asegurarse de que la celda tenga el tamaño adecuado
          worksheet.getRow(20).height = 60;
          worksheet.getColumn(5).width = 30;
        } catch (error) {
          console.error('Error al insertar la imagen de la firma:', error);
        }
      }
    }

    // Escribir datos de signatureDoer
    if (bitacora.signatureDoer) {
      // Concatenar grado, nombre y matrícula con saltos de línea
      const doerSignatureText = [
        bitacora.signatureDoer.grado,
        bitacora.signatureDoer.nombre,
        bitacora.signatureDoer.matricula
      ].filter(Boolean).join('\n');
      
      worksheet.getCell('F20').value = doerSignatureText;
      worksheet.getCell('F20').alignment = { vertical: 'middle', wrapText: true };

      // Escribir el campo mel en G22
      worksheet.getCell('G22').value = '\n' + (bitacora.signatureDoer.mel || '');
      worksheet.getCell('G22').alignment = { vertical: 'top', horizontal: 'left', wrapText: true };

      // Insertar la imagen de la firma
      if (bitacora.signatureDoer.firma?.data) {
        try {
          const imageId = workbook.addImage({
            base64: bitacora.signatureDoer.firma.data,
            extension: 'png',
          });

          // Ajustar el tamaño de la imagen para que se ajuste desde G20 hasta H21
          worksheet.addImage(imageId, {
            tl: { col: 6, row: 19 }, // G20 (col 6, row 19)
            br: { col: 8, row: 21 }, // H21 (col 8, row 21) (col is exclusive)
          });

          // Ajustar tamaño de filas y columnas para mejor visualización
          worksheet.getRow(20).height = 50;
          worksheet.getRow(21).height = 50;
          worksheet.getColumn(7).width = 20; // G
          worksheet.getColumn(8).width = 20; // H
        } catch (error) {
          console.error('Error al insertar la imagen de la firma:', error);
        }
      }
    }

    // Escribir datos de signatureDelivery
    if (bitacora.signatureDelivery) {
      // Concatenar grado, nombre y matrícula con saltos de línea
      const deliverySignatureText = [
        bitacora.signatureDelivery.grado,
        bitacora.signatureDelivery.nombre,
        bitacora.signatureDelivery.matricula
      ].filter(Boolean).join('\n');
      
      worksheet.getCell('M21').value = deliverySignatureText;
      worksheet.getCell('M21').alignment = { vertical: 'middle', wrapText: true };

      // Insertar la imagen de la firma
      if (bitacora.signatureDelivery.firma?.data) {
        try {
          const imageId = workbook.addImage({
            base64: bitacora.signatureDelivery.firma.data,
            extension: 'png',
          });

          // Ajustar el tamaño de la imagen para que se ajuste desde O21 hasta P23
          worksheet.addImage(imageId, {
            tl: { col: 14, row: 20 }, // O21 (col 14, row 20)
            br: { col: 16, row: 23 }, // P23 (col 16, row 23) (col is exclusive)
          });

          // Ajustar tamaño de filas y columnas para mejor visualización
          worksheet.getRow(21).height = 45;
          worksheet.getRow(22).height = 45;
          worksheet.getRow(23).height = 45;
          worksheet.getColumn(15).width = 15; // O
          worksheet.getColumn(16).width = 15; // P

          // Centrar y ajustar texto en el rango O21:P23
          for (let row = 21; row <= 23; row++) {
            for (let col = 15; col <= 16; col++) {
              worksheet.getCell(row, col).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            }
          }
        } catch (error) {
          console.error('Error al insertar la imagen de la firma:', error);
        }
      }
    }

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