const fs = require("fs");
const zlib = require("zlib");

//1
{
  const readStream = fs.createReadStream("big.txt");
  readStream.on("data", (chunk) => {
    //console.log(chunk);
  });
}
//2
{
  const readStream = fs.createReadStream("big.txt");
  const writeStream = fs.createWriteStream("copyBig.txt");

  readStream.on("data", (chunk) => {
    writeStream.write(chunk);
  });
}
//3
{
  const readStream = fs.createReadStream("big.txt");
  const writeStream = fs.createWriteStream("copyBigCompressed.txt.gz");
  const gzip = zlib.createGzip();
  readStream.pipe(gzip).pipe(writeStream);
}
