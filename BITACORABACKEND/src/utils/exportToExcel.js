const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

async function exportBitacoraToExcel() {
  // 1. Leer el JSON
  const bitacoras = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/bitacoras.json'), 'utf8'));
  const bitacora = bitacoras[0]; // Usamos la primera como ejemplo

  // 2. Cargar la plantilla
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(path.join(__dirname, '../data/BITACORA.xlsx'));
  const worksheet = workbook.worksheets[0]; // Primera hoja

  // 3. Escribir los valores
  worksheet.getCell('D4').value = bitacora.tipoAeronave;
  worksheet.getCell('E4').value = bitacora.tipoAeronave;
  worksheet.getCell('F4').value = bitacora.tipoAeronave;
  worksheet.getCell('I4').value = bitacora.matricula;
  worksheet.getCell('J4').value = bitacora.matricula;
  worksheet.getCell('M4').value = bitacora.organismo;
  worksheet.getCell('N4').value = bitacora.organismo;
  worksheet.getCell('P4').value = bitacora.folio;

  // 4. Guardar el archivo
  await workbook.xlsx.writeFile(path.join(__dirname, '../data/BITACORA-out.xlsx'));
  console.log('Archivo Excel generado correctamente');
}

exportBitacoraToExcel();