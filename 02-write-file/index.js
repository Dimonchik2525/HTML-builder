const fs = require('fs');
const path = require('path')
let writeStream = fs.createWriteStream(path.resolve(__dirname, 'text.txt'))
process.stdout.write('file was created \n')
process.stdin.on('data', (data) => {
   let userInput = data.toString().trim()
   if (userInput.toLowerCase() == 'exit') {
      process.stdout.write('thanks!!!')
      process.exit(0)
   }
   writeStream.write(`${userInput}\n`, (err, data) => {
      if (err) throw err;

   })
})
process.on('SIGINT', (code) => {
   process.stdout.write('thanks!!!')
   process.exit(0)
})
