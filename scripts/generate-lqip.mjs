/**
 * Generate LQIP (Low Quality Image Placeholder) data at build time
 * This script creates blur data URLs for images to improve perceived performance
 * 
 * Configuration: Use .lqiprc.json to define images for LQIP generation
 * Supports dynamic processing of multiple images with customizable settings
 */

import { getPlaiceholder } from 'plaiceholder';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Load configuration from .lqiprc.json
 */
function loadConfig() {
  try {
    const configPath = join(__dirname, '../.lqiprc.json');
    const configFile = readFileSync(configPath, 'utf-8');
    return JSON.parse(configFile);
  } catch (error) {
    console.error('❌ Failed to load .lqiprc.json configuration:', error.message);
    process.exit(1);
  }
}

/**
 * Generate LQIP data and thumbnail for a single image
 */
async function processImage(imageConfig, generatedDir) {
  const { key, source, width, height, blurSize, thumbnailSize, thumbnailQuality } = imageConfig;
  const sourcePath = join(__dirname, '../', source);
  const thumbnailName = `${key}-lqip.webp`;

  console.log(`\n  Processing: ${key}`);

  try {
    // Generate blur data
    const { base64, img, svg } = await getPlaiceholder(sourcePath, {
      size: blurSize,
    });

    // Generate thumbnail
    await sharp(sourcePath)
      .resize(thumbnailSize, thumbnailSize, { fit: 'cover' })
      .webp({ quality: thumbnailQuality })
      .toFile(join(generatedDir, thumbnailName));

    const imageData = {
      blurDataURL: base64,
      imgAttributes: img,
      svg: svg,
      width: width,
      height: height,
      lowResImage: `/images/generated/${thumbnailName}`,
    };

    console.log(`    ✓ Blur data generated`);
    console.log(`    ✓ Thumbnail created: /images/generated/${thumbnailName}`);

    return { [key]: imageData };
  } catch (error) {
    console.error(`    ✗ Failed to process ${key}:`, error.message);
    throw error;
  }
}

/**
 * Main LQIP generation function
 */
async function generateLQIP() {
  try {
    console.log('🖼️  Generating LQIP for images...\n');

    const config = loadConfig();
    const { images, output } = config;

    // Validate configuration
    if (!images || !Array.isArray(images) || images.length === 0) {
      console.warn('⚠️  No images configured in .lqiprc.json');
      return;
    }

    // Create output directories
    const generatedDir = join(__dirname, '../', output.generatedImagesDir);
    const dataFilePath = join(__dirname, '../', output.dataFile);
    const dataDir = dirname(dataFilePath);

    mkdirSync(generatedDir, { recursive: true });
    mkdirSync(dataDir, { recursive: true });

    // Process all images
    const allLQIPData = {};

    for (const imageConfig of images) {
      const imageData = await processImage(imageConfig, generatedDir);
      Object.assign(allLQIPData, imageData);
    }

    // Write combined LQIP data file
    writeFileSync(dataFilePath, JSON.stringify(allLQIPData, null, 2));

    console.log(`\n✅ LQIP generation completed successfully!`);
    console.log(`   Data file: ${output.dataFile}`);
    console.log(`   Generated assets: ${output.generatedImagesDir}`);
  } catch (error) {
    console.error('\n❌ LQIP generation failed:', error.message);
    process.exit(1);
  }
}

generateLQIP();
