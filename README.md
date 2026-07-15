# img-shrink.js

convert a bunch of images to low-quality jpegs. useful for reducing load time on your webbed site.

uses [Sharp](https://sharp.pixelplumbing.com/) to convert images, targeting [mozjpeg](https://github.com/mozilla/mozjpeg/blob/master/README.md) quality.

## installing

- install node.js and npm from https://nodejs.org/.
- download this code (on github, look for "Code" -> Download ZIP").
- extract to a folder somewhere (anywhere is fine).
- open a terminal in that folder and run this command to download required node_modules:
  ```
  npm install
  ```

## usage

put images in the "in" folder.

open a terminal here (same folder containing package.json) and run this command:

```
npm run shrink
```

the shrunken images will be written to the "out" folder.

## notes

this doesn't actually "resize" the images, instead it produces reduced jpegs to the desired file size. the default file size is 400 kB but you can edit the "thresholdBytes" variable at the top of img-shrink.js to change this.

if you are using these as thumbnails on your website, make sure the `<img>` tag specifies a width or height, otherwise the image will appear full width (but at its reduced jpeg resolution).

## uninstalling

- at any point you can safely delete node_modules. you can get them back with `npm install`.
- to fully remove img-shrink, just delete the folder you extracted it to.
- check nodejs.org for instructions on removing nodejs, if desired.