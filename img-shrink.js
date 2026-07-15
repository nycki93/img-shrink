const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp'); 

/** SETTINGS **/

// Directory where input images are read from.
const dirIn = 'in';

// Directory where output images are written to.
const dirOut = 'out';

// Maximum size for an output file, in bytes. Default is 400 kB.
const thresholdBytes = 400 * 1024;

// A series of quality levels, out of 100. Jpeg output will be reduced in 
// quality according to this plan, until it reaches the target file size.
const quality = [100, 99, 97, 95, 90, 80, 75, 70, 60, 50, 40];

/** END SETTINGS */

async function makedir(dir) {
    try {
        await fs.stat(dir);
    } catch (err) {
        if (err.code !== 'ENOENT') throw err;
        await fs.mkdir(dir);
    }
}

async function main() {
    await makedir(dirIn);
    await makedir(dirOut);
    for (const base of await fs.readdir(dirIn)) {
        if (base === '.gitkeep') continue;
        const fileIn = `${dirIn}/${base}`;
        const { name } = path.parse(fileIn);
        const { size } = await fs.stat(fileIn);
        if (size <= thresholdBytes) {
            const fileOut = `${dirOut}/${base}`;
            console.log(`${fileIn} -> ${fileOut} (no changes)`);
            fs.copyFile(fileIn, fileOut);
            continue;
        }
        const fileOut = `${dirOut}/${name}.jpg`;
        for (let i = 0; i < quality.length; i += 1) {
            const newStats = await (sharp(fileIn)
                .withMetadata()
                .jpeg({ mozjpeg: true, quality: quality[i] })
                .toFile(fileOut)
            );
            if (i == quality.length || newStats.size <= thresholdBytes) {
                console.log(`${fileIn} -> ${fileOut} (quality: ${quality[i]})`);
                break;
            }
        }
    }
}

main();
