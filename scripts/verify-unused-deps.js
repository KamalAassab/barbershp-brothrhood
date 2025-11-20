/**
 * Script to verify unused dependencies before removal
 * This checks actual imports in the codebase (excluding node_modules)
 */

const fs = require('fs');
const path = require('path');

const dependenciesToCheck = [
  { name: 'three', patterns: ['from ["\']three', 'require\(["\']three', 'import.*three'] },
  { name: '@react-three/fiber', patterns: ['@react-three/fiber'] },
  { name: '@react-three/drei', patterns: ['@react-three/drei'] },
  { name: '@tiptap/react', patterns: ['@tiptap/react', '@tiptap/starter-kit'] },
  { name: '@tiptap/starter-kit', patterns: ['@tiptap/starter-kit'] },
  { name: '@tiptap/extension-image', patterns: ['@tiptap/extension-image'] },
  { name: '@tiptap/extension-task-item', patterns: ['@tiptap/extension-task-item'] },
  { name: '@tiptap/extension-task-list', patterns: ['@tiptap/extension-task-list'] },
  { name: '@tiptap/extension-text-align', patterns: ['@tiptap/extension-text-align'] },
  { name: '@tiptap/extension-typography', patterns: ['@tiptap/extension-typography'] },
  { name: 'playwright', patterns: ['playwright'] },
  { name: 'cheerio', patterns: ['cheerio'] },
  { name: 'cobe', patterns: ['cobe'] },
  { name: '@iconify/react', patterns: ['@iconify/react'] },
  { name: '@tabler/icons-react', patterns: ['@tabler/icons'] },
  { name: 'react-syntax-highlighter', patterns: ['react-syntax-highlighter'] },
  { name: 'rehype-raw', patterns: ['rehype-raw'] },
  { name: 'remark-breaks', patterns: ['remark-breaks'] },
  { name: 'remark-gfm', patterns: ['remark-gfm'] },
  { name: 'react-markdown', patterns: ['react-markdown'] },
];

function getAllSourceFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    // Skip node_modules, .next, and other build directories
    if (file === 'node_modules' || file === '.next' || file === 'dist' || file === 'build' || file.startsWith('.')) {
      return;
    }
    
    if (stat.isDirectory()) {
      getAllSourceFiles(filePath, fileList);
    } else if (/\.(ts|tsx|js|jsx)$/.test(file) && !file.includes('.test.') && !file.includes('.spec.')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function checkFileForDependency(filePath, patterns) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return patterns.some(pattern => {
      const regex = new RegExp(pattern, 'i');
      return regex.test(content);
    });
  } catch (error) {
    return false;
  }
}

console.log('🔍 Verifying unused dependencies...\n');

// Get all source files
const sourceFiles = getAllSourceFiles('app');
sourceFiles.push(...getAllSourceFiles('lib'));
sourceFiles.push(...getAllSourceFiles('scripts'));

console.log(`📁 Scanning ${sourceFiles.length} source files...\n`);

const unusedDeps = [];
const usedDeps = [];

dependenciesToCheck.forEach(dep => {
  const isUsed = sourceFiles.some(file => checkFileForDependency(file, dep.patterns));
  
  if (isUsed) {
    usedDeps.push(dep.name);
    console.log(`✅ ${dep.name} - USED (keeping)`);
  } else {
    unusedDeps.push(dep.name);
    console.log(`❌ ${dep.name} - UNUSED (can be removed)`);
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Unused: ${unusedDeps.length}`);
console.log(`   Used: ${usedDeps.length}`);

if (unusedDeps.length > 0) {
  console.log(`\n🗑️  Dependencies to remove:\n   ${unusedDeps.join('\n   ')}`);
  console.log(`\n💡 Run: npm uninstall ${unusedDeps.join(' ')}`);
} else {
  console.log(`\n✅ All dependencies appear to be in use.`);
}
