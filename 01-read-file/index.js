const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'text.txt')
const readableStream = fs.createReadStream(filePath, 'utf-8')

readableStream.on('data', (chunck) => {
   process.stdout.write(chunck)
})

