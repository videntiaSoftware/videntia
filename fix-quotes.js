const fs = require('fs');
const path = require('path');

// Lista de archivos que necesitan ser arreglados
const filesToFix = [
  'app/blog/22-arcanos-mayores-significado-completo/page.tsx',
  'app/blog/como-leer-cartas-tarot-principiantes/page.tsx',
  'app/guias/tiradas-tarot-completas/page.tsx',
  'app/tarot-del-si-o-no/page.tsx',
  'app/tarot-gitano-gratis/page.tsx',
  'app/tirada-3-cartas-gratis/page.tsx'
];

function fixQuotes(content) {
  // Reemplazar comillas dobles dentro de JSX texto con entidades HTML
  // Buscar patrones como: >texto"texto< o >texto "texto "texto<
  content = content.replace(/>(.*?)"(.*?)</g, (match, before, after) => {
    return `>${before}&quot;${after}<`;
  });
  
  // Arreglar casos donde hay múltiples comillas en la misma línea
  content = content.replace(/>(.*?)"(.*?)"(.*?)</g, (match, before, middle, after) => {
    return `>${before}&quot;${middle}&quot;${after}<`;
  });
  
  // Arreglar casos específicos de comillas dentro de texto
  content = content.replace(/(\w)"(\w)/g, '$1&quot;$2');
  
  return content;
}

function fixFile(filePath) {
  try {
    console.log(`🔧 Arreglando: ${filePath}`);
    
    const fullPath = path.join(__dirname, filePath);
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Aplicar fix de quotes
    const fixedContent = fixQuotes(content);
    
    // Escribir el archivo arreglado
    fs.writeFileSync(fullPath, fixedContent, 'utf8');
    
    console.log(`✅ Arreglado: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error arreglando ${filePath}:`, error.message);
  }
}

// Arreglar todos los archivos
console.log('🚀 Iniciando fix de quotes...\n');

filesToFix.forEach(filePath => {
  fixFile(filePath);
});

console.log('\n🎉 Fix de quotes completado!');
