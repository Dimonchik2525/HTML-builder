const path = require('path');
const fs = require('fs').promises;


async function addClasses() {
   let bundlePath = path.resolve(__dirname, 'project-dist', 'bundle.css');
   let stylesPath = path.resolve(__dirname, 'styles');
   let styles = await fs.readdir(stylesPath, { withFileTypes: true })
   let outputPath = path.resolve(__dirname, 'project-dist');
   const result = []
   for (let file of styles) {
      let extension = path.extname(file.name, path.extname(file.name)).slice(1)
      if (file.isFile() && extension == 'css') {
         let content = await fs.readFile(path.resolve(stylesPath, file.name), 'utf-8')
         result.push(content)
         // console.log(content);
         //  console.log(content.toString());
      }
   }
   await fs.writeFile(bundlePath, result.join('\n'))
}
addClasses()
