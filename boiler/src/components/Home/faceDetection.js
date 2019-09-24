

const fs = require('file-system');

export const detectFaces = async(results) => {
  // Make a call to the Vision API to detect the faces
  console.log('result', results);
  const faces = results.faceAnnotations;
  const numFaces = faces.length;
  console.log(`Found ${numFaces} face${numFaces === 1 ? '' : 's'}.`);
  return faces;
}


export const highlightFaces = async (inputFile, faces, outputFile, Canvas) => {
//   const {promisify} = require('util');
//   const readFile = promisify(fs.readFile);
//   const image = await readFile(inputFile);

//   const Image = Canvas.loadImage;
//   // Open the original image into a canvas
//   const img = new Image();
//   img.src = inputFile;
//   console.log('img', img)
  const {loadImage} = Canvas || {}
  loadImage(inputFile).then((img) => {
    const canvas = new Canvas.createCanvas(img.width, img.height);
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, img.width, img.height);
   // Now draw boxes around all the faces
  context.strokeStyle = 'rgba(0,255,0,0.8)';
  context.lineWidth = '5';

  faces.forEach(face => {
    context.beginPath();
    let origX = 0;
    let origY = 0;
    face.boundingPoly.vertices.forEach((bounds, i) => {
      if (i === 0) {
        origX = bounds.x;
        origY = bounds.y;
      }
      context.lineTo(bounds.x, bounds.y);
    });
    context.lineTo(origX, origY);
    context.stroke();
  });
  const stream = canvas.createPNGStream()
  console.log('sksjkds', stream)
    // console.log('<img src="' + canvas.toDataURL() + '" />')
  })
//   context.drawImage(img, 0, 0, img.width, img.height);

  
// const out = fs.createWriteStream(__dirname + '/test.png')
// const stream = canvas.createPNGStream()
// console.log('stream',canvas)
// stream.pipe(out)
// out.on('finish', () =>  console.log('The PNG file was created.'))
//   // Write the result to a file
//   console.log(`Writing to file ${outputFile}`);
// //   const writeStream = fs.createWriteStream(outputFile);
//   const pngStream = canvas.pngStream();

//   await new Promise((resolve, reject) => {
//     pngStream
//       .on('data', )
//       .on('error', reject)
//       .on('end', resolve);
//   });
}


export const main = async(result, input) =>  {
  const Canvas = require('canvas');
  const outputFile = 'out.png';
  const faces = await detectFaces(result);
  console.log('Highlighting...');
  await highlightFaces(input, faces, outputFile, Canvas);
  console.log('Finished!');
}

export default {main, detectFaces, highlightFaces};