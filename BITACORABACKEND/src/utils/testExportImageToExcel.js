const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

async function main() {
  // Leer el array del JSON
  const bitacoras = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/bitacoras.json'), 'utf8'));
  // Usar el último elemento del array
  const testObj = Array.isArray(bitacoras) ? bitacoras[bitacoras.length - 1] : bitacoras;

  if (!testObj) {
    console.error('No se encontró el objeto de bitácora esperado.');
    return;
  }

  // Crear un nuevo workbook y worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('TestImage');

  // Insertar la firma de emisión (signatureIssuing)
  if (testObj.signatureIssuing?.firma?.data) {
    try {
      const imageId = workbook.addImage({
        base64: testObj.signatureIssuing.firma.data,
        extension: 'png',
      });
      worksheet.addImage(imageId, {
        tl: { col: 0, row: 0 }, // A1
        br: { col: 1, row: 3 }, // B4
        editAs: 'oneCell',
      });
      worksheet.getRow(1).height = 60;
      worksheet.getColumn(1).width = 30;
    } catch (err) {
      console.error('Error al insertar la firma de emisión:', err);
    }
  }

  // Insertar la firma del ejecutor (signatureDoer)
  if (testObj.signatureDoer?.firma?.data) {
    try {
      const imageId = workbook.addImage({
        base64: testObj.signatureDoer.firma.data,
        extension: 'png',
      });
      worksheet.addImage(imageId, {
        tl: { col: 2, row: 0 }, // C1
        br: { col: 3, row: 3 }, // D4
        editAs: 'oneCell',
      });
      worksheet.getRow(1).height = 60;
      worksheet.getColumn(3).width = 30;
    } catch (err) {
      console.error('Error al insertar la firma del ejecutor:', err);
    }
  }

  // Insertar la firma de entrega (signatureDelivery)
  if (testObj.signatureDelivery?.firma?.data) {
    try {
      const imageId = workbook.addImage({
        base64: testObj.signatureDelivery.firma.data,
        extension: 'png',
      });
      worksheet.addImage(imageId, {
        tl: { col: 4, row: 0 }, // E1
        br: { col: 5, row: 3 }, // F4
        editAs: 'oneCell',
      });
      worksheet.getRow(1).height = 60;
      worksheet.getColumn(5).width = 30;
    } catch (err) {
      console.error('Error al insertar la firma de entrega:', err);
    }
  }

  // Guardar el archivo
  const outputPath = path.join(__dirname, '../data/TEST_IMAGE_EXCEL.xlsx');
  await workbook.xlsx.writeFile(outputPath);
  console.log('Archivo de prueba generado:', outputPath);
}

main().catch(console.error); 