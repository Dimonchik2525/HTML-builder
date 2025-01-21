const path = require('path');
const fs = require('fs').promises;

async function buildProject() {
   let mainDir = path.resolve(__dirname, 'assets')
   let copyDir = path.resolve(__dirname, 'project-dist', 'assets')
   copyAssets(mainDir, copyDir)
   addClasses()
   copyComponent()
}

async function addClasses() {
   let bundlePath = path.resolve(__dirname, 'project-dist', 'style.css');
   let stylesPath = path.resolve(__dirname, 'styles');
   let styles = await fs.readdir(stylesPath, { withFileTypes: true })
   const result = []
   for (let file of styles) {
      let extension = path.extname(file.name, path.extname(file.name)).slice(1)
      if (file.isFile() && extension == 'css') {
         let content = await fs.readFile(path.resolve(stylesPath, file.name), 'utf-8')
         result.push(content)
      }
   }
   await fs.writeFile(bundlePath, result.join('\n'))
}
async function copyAssets(srcDir, destDir) {
   try {
      let mainFiles = await fs.readdir(srcDir, { withFileTypes: true })
      await fs.mkdir(destDir, { recursive: true })
      for (let file of mainFiles) {
         const srcPath = path.resolve(srcDir, file.name);
         const destPath = path.resolve(destDir, file.name);
         if (file.isDirectory()) {
            await copyAssets(srcPath, destPath)
         }
         else if (file.isFile()) {
            let content = await fs.readFile(srcPath)
            await fs.writeFile(destPath, content)
         }
      }
   }
   catch (err) {
      console.log(err);
   }
}
async function copyComponent() {
   let mainDir = path.resolve(__dirname, 'components')
   let copyDir = path.resolve(__dirname, 'project-dist', 'index.html')
   let templateFilePath = path.resolve(__dirname, 'template.html')
   try {
      let templateContent = await fs.readFile(templateFilePath, 'utf-8');
      let tags = await fs.readdir(mainDir, { withFileTypes: true })
      for (let tag of tags) {
         let extension = path.extname(tag.name, path.extname(tag.name)).slice(1)
         if (tag.isFile() && extension == 'html') {
            const placeholderName = `{{${path.basename(tag.name, '.html')}}}`;
            let content = await fs.readFile(path.resolve(mainDir, tag.name), 'utf-8')
            templateContent = templateContent.replace(new RegExp(placeholderName, 'g'), content);
         }
      }
      await fs.writeFile(copyDir, templateContent)
   }
   catch (err) {
      console.log(err)
   }
}
buildProject()
