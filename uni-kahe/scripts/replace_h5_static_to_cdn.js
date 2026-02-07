const fs = require("fs");
const path = require("path");
const directoryPath = "./dist/build/h5/";
const replaceText = "/static/"; // 要替换的内容
const replaceWith = "https://jms.85gui7.com/kahe-202510/"; // 要替换成的内容

// 递归遍历指定目录下的所有文件和子目录
function traverseDirectory(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // 如果是目录，则递归遍历
      traverseDirectory(filePath);
    } else {
      // 如果是文件，则进行替换操作
      replaceInFile(filePath);
    }
  });
}

// 在文件中替换指定内容
function replaceInFile(filePath) {
  let fileContent = fs.readFileSync(filePath, "utf8");
  // 替换字符串
  fileContent = fileContent.replace(new RegExp(replaceText, "g"), replaceWith);
  // 重新写入文件
  fs.writeFileSync(filePath, fileContent, "utf8");
}

// 删除指定目录下的所有文件和子目录
function deleteFiles(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // 如果是目录，则递归删除
      deleteFiles(filePath);
    } else {
      // 如果是文件，则删除
      fs.unlinkSync(filePath);
    }
  });
  // 删除当前目录
  fs.rmdirSync(dir);
}

// 开始遍历并替换指定目录下的所有文件
traverseDirectory(directoryPath);

// 删除指定目录下的/static/文件夹及其内容
const staticFolderPath = path.join(directoryPath, "static");
deleteFiles(staticFolderPath);
