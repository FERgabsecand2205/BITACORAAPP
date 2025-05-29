const exportBitacoraToExcel = require('./exportToExcel');
const fs = require('fs');
const path = require('path');

async function main() {
  // Leer el array del JSON
  const bitacoras = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/bitacoras.json'), 'utf8'));
  // Usar el objeto de las líneas 1230-1306 (penúltimo objeto)
  const testObj = Array.isArray(bitacoras) ? bitacoras[bitacoras.length - 1] : bitacoras;

  if (!testObj) {
    console.error('No se encontró la bitácora esperada.');
    return;
  }

  try {
    const outputPath = await exportBitacoraToExcel(testObj);
    console.log('Archivo generado:', outputPath);
  } catch (err) {
    console.error('Error al exportar la bitácora:', err);
  }
}

main(); 