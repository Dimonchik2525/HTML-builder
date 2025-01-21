/*const path = require('path');
const fs = require('fs').promises;

async function readDirectory() {
   const dirPath = path.resolve(__dirname, 'secret-folder');

   try {
      const files = await fs.readdir(dirPath, { withFileTypes: true });
      const result = [];
      for (const file of files) {
         if (file.isFile()) {
            const filePath = path.join(dirPath, file.name);
            const stats = await fs.stat(filePath);
            const fileName = path.basename(file.name, path.extname(file.name));
            const fileExtension = path.extname(file.name).slice(1);
            const fileSize = stats.size;

            result.push(`${fileName}-${fileExtension}-${fileSize}`);
         }
      }
      console.log(result.join('\n'));
   } catch (err) {
      console.error(err);
   }
}

readDirectory();*/
