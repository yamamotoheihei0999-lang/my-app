const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const srcDir = path.resolve(__dirname, '../public/images')
const srcFile = path.join(srcDir, 'photo-1.jpg')

if (!fs.existsSync(srcFile)) {
  console.error('Source image not found:', srcFile)
  process.exit(1)
}

const sizes = [1600, 1024, 768]

async function build() {
  try {
    await Promise.all(
      sizes.map(async (w) => {
        const base = `photo-1-${w}`
        const outJpeg = path.join(srcDir, `${base}.jpg`)
        const outWebp = path.join(srcDir, `${base}.webp`)

        await sharp(srcFile).resize({ width: w }).jpeg({ quality: 80 }).toFile(outJpeg)
        console.log('Written', outJpeg)

        await sharp(srcFile).resize({ width: w }).webp({ quality: 80 }).toFile(outWebp)
        console.log('Written', outWebp)
      }),
    )

    // Also create a webp fallback for the original size
    const outWebpOrig = path.join(srcDir, 'photo-1.webp')
    await sharp(srcFile).webp({ quality: 80 }).toFile(outWebpOrig)
    console.log('Written', outWebpOrig)

    console.log('Image build finished')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

build()
