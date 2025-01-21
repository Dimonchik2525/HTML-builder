/*const path = require('path');
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
addClasses()*/
const fs = require('fs');
const path = require('path');

async function buildCSSBundle() {
   const stylesDir = path.join(__dirname, 'styles');
   const outputDir = path.join(__dirname, 'project-dist');
   const bundleFile = path.join(outputDir, 'bundle.css');

   try {
      await fs.promises.mkdir(outputDir, { recursive: true });
      const bundleStream = fs.createWriteStream(bundleFile);
      const items = await fs.promises.readdir(stylesDir, { withFileTypes: true });

      for (const item of items) {
         const itemPath = path.join(stylesDir, item.name);
         if (item.isFile() && path.extname(item.name) === '.css') {
            const cssContent = await fs.promises.readFile(itemPath, 'utf-8');
            bundleStream.write(cssContent + '\n'); // Add newline between files
         }
      }
      bundleStream.end();
   } catch (err) {
      console.error('Error building CSS bundle:', err);
   }
}

buildCSSBundle();
