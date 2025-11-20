const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function compressImage(inputPath, outputPath, options = {}) {
  const { quality = 80, format = 'auto' } = options;
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    let pipeline = image;
    
    // Determine format
    let outputFormat = format;
    if (format === 'auto') {
      const ext = path.extname(inputPath).toLowerCase();
      if (ext === '.png') {
        outputFormat = 'png';
      } else if (ext === '.jpg' || ext === '.jpeg') {
        outputFormat = 'jpeg';
      }
    }
    
    // Apply compression based on format
    if (outputFormat === 'jpeg') {
      pipeline = pipeline.jpeg({ 
        quality,
        progressive: true,
        mozjpeg: true
      });
    } else if (outputFormat === 'png') {
      pipeline = pipeline.png({ 
        quality,
        compressionLevel: 9,
        adaptiveFiltering: true
      });
    } else if (outputFormat === 'webp') {
      pipeline = pipeline.webp({ quality });
    }
    
    // Write to temporary file first, then replace original
    const tempPath = outputPath + '.tmp';
    await pipeline.toFile(tempPath);
    fs.renameSync(tempPath, outputPath);
    return true;
  } catch (error) {
    console.error(`Error compressing ${inputPath}:`, error.message);
    return false;
  }
}

async function compressImages() {
  const publicDir = path.join(__dirname, '..', 'public');
  const galleryDir = path.join(publicDir, 'gallery');
  
  console.log('🖼️  Starting image compression...\n');

  // Compress gallery JPG images
  if (fs.existsSync(galleryDir)) {
    console.log('📸 Compressing gallery images...');
    const files = fs.readdirSync(galleryDir).filter(f => 
      /\.(jpg|jpeg)$/i.test(f)
    );
    
    let compressed = 0;
    for (const file of files) {
      const inputPath = path.join(galleryDir, file);
      const outputPath = path.join(galleryDir, file);
      
      // Create backup
      const backupPath = path.join(galleryDir, `${file}.backup`);
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(inputPath, backupPath);
      }
      
      const success = await compressImage(inputPath, outputPath, { 
        quality: 80,
        format: 'jpeg'
      });
      
      if (success) {
        compressed++;
        const stats = fs.statSync(outputPath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        console.log(`   ✅ ${file}: ${sizeKB} KB`);
      }
    }
    console.log(`✅ Compressed ${compressed}/${files.length} gallery images\n`);
  }

  // Compress PNG images in public directory
  console.log('🖼️  Compressing PNG images...');
  const pngFiles = fs.readdirSync(publicDir).filter(f => 
    /\.png$/i.test(f) && !f.includes('.backup')
  );
  
  let compressedPng = 0;
  for (const file of pngFiles) {
    const inputPath = path.join(publicDir, file);
    const outputPath = path.join(publicDir, file);
    
    // Create backup
    const backupPath = path.join(publicDir, `${file}.backup`);
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
    }
    
    const success = await compressImage(inputPath, outputPath, { 
      quality: 80,
      format: 'png'
    });
    
    if (success) {
      compressedPng++;
      const stats = fs.statSync(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`   ✅ ${file}: ${sizeKB} KB`);
    }
  }
  console.log(`✅ Compressed ${compressedPng}/${pngFiles.length} PNG images\n`);

  console.log('✨ Image compression complete!');
  console.log('\n💡 Note: Original files backed up with .backup extension');
  console.log('   You can delete .backup files after verifying the compressed images look good.\n');
}

compressImages().catch(console.error);
