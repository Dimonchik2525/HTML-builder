const path = require('path');
const fs = require('fs').promises;

async function copyDir() {
   let mainDir = path.resolve(__dirname, 'files')
   let copyDir = path.resolve(__dirname, 'files-copy')
   try {
      let mainFiles = await fs.readdir(mainDir)
      await fs.mkdir(copyDir, { recursive: true })
      for (let file of mainFiles) {
         let content = await fs.readFile(path.resolve(mainDir, file))
         await fs.writeFile(path.resolve(copyDir, file), content)
      }
   }
   catch (err) {
      console.log(err);
   }
}
copyDir()
