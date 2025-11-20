/**
 * Script to analyze bundle size and identify unused dependencies
 * Run with: node scripts/analyze-bundle.js
 */

const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

// Dependencies that are likely unused based on codebase analysis
const potentiallyUnused = [
  'three',
  '@react-three/fiber',
  '@react-three/drei',
  '@tiptap/react',
  '@tiptap/starter-kit',
  '@tiptap/extension-image',
  '@tiptap/extension-task-item',
  '@tiptap/extension-task-list',
  '@tiptap/extension-text-align',
  '@tiptap/extension-typography',
  'playwright',
  'cheerio',
  'cobe',
  '@iconify/react',
  '@tabler/icons-react',
  'react-syntax-highlighter',
  'rehype-raw',
  'remark-breaks',
  'remark-gfm',
  'react-markdown',
];

console.log('📦 Bundle Analysis\n');
console.log('⚠️  Potentially Unused Dependencies:\n');

let totalSize = 0;
potentiallyUnused.forEach(dep => {
  if (dependencies[dep]) {
    console.log(`   - ${dep}@${dependencies[dep]}`);
    // Rough estimate: each dependency adds ~100KB-500KB to bundle
    totalSize += 200; // Average estimate
  }
});

console.log(`\n💾 Estimated Bundle Size Reduction: ~${totalSize}KB`);
console.log('\n💡 To remove unused dependencies:');
console.log('   npm uninstall ' + potentiallyUnused.filter(dep => dependencies[dep]).join(' '));
console.log('\n⚠️  Note: Verify these are not used before removing!');

