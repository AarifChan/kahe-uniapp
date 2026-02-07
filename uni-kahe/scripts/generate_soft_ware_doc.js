const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');

// 需要扫描的文件扩展名
const CODE_EXTENSIONS = ['.ts', '.vue', '.js', '.json'];

// 需要排除的目录
const EXCLUDE_DIRS = ['node_modules', 'dist', '.git', '.vscode', '.idea'];

/**
 * 递归获取所有源代码文件
 */
function getAllCodeFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // 跳过排除的目录
      if (!EXCLUDE_DIRS.includes(file)) {
        getAllCodeFiles(filePath, fileList);
      }
    } else {
      const ext = path.extname(file);
      if (CODE_EXTENSIONS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

/**
 * 读取文件内容
 */
function readFileContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`读取文件失败: ${filePath}`, error);
    return null;
  }
}

/**
 * 随机打乱数组
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 估算代码行数对应的页数（假设每页约40行代码，考虑行号、标题等）
 */
function estimatePages(lines) {
  // 每页约40行代码，加上标题和间距
  return Math.ceil(lines / 40);
}

/**
 * 计算实际需要的行数来达到目标页数
 */
function calculateLinesForPages(pages) {
  return pages * 40;
}

/**
 * 生成Word文档
 */
async function generateWordDocument(files, targetPages = 150) {
  const shuffledFiles = shuffleArray(files);
  const fileList = [];
  
  // 构建文件列表
  shuffledFiles.forEach((file, index) => {
    const relativePath = path.relative(process.cwd(), file);
    fileList.push({ index: index + 1, path: relativePath, fullPath: file });
  });

  // 构建目录段落
  const tocParagraphs = [
    new Paragraph({
      text: "目录",
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    }),
  ];
  
  fileList.forEach((fileInfo) => {
    tocParagraphs.push(
      new Paragraph({
        text: `${fileInfo.index}. ${fileInfo.path}`,
        spacing: { after: 100 },
      })
    );
  });

  // 构建所有段落
  const allParagraphs = [
    new Paragraph({
      text: "软件源代码文档",
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      text: `生成时间: ${new Date().toLocaleString('zh-CN')}`,
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
    }),
    ...tocParagraphs,
    new Paragraph({
      text: "",
      pageBreakBefore: true,
    }),
  ];

  // 添加源代码内容
  let totalLinesAdded = 0;
  const targetLines = calculateLinesForPages(targetPages);
  
  for (let i = 0; i < fileList.length; i++) {
    const fileInfo = fileList[i];
    
    if (totalLinesAdded >= targetLines) {
      break;
    }

    const content = readFileContent(fileInfo.fullPath);

    if (!content) {
      continue;
    }

    const lines = content.split('\n');
    const remainingLines = targetLines - totalLinesAdded;
    
    // 如果加上这个文件会超过目标行数，只取部分内容
    let contentToAdd = content;
    let linesToAdd = lines.length;
    if (totalLinesAdded + lines.length > targetLines) {
      linesToAdd = remainingLines;
      contentToAdd = lines.slice(0, remainingLines).join('\n');
    }

    // 添加文件标题
    allParagraphs.push(
      new Paragraph({
        text: `${fileInfo.index}. ${fileInfo.path}`,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      })
    );

    // 添加代码内容
    const codeLines = contentToAdd.split('\n');
    
    codeLines.forEach((line, lineIndex) => {
      const lineNumber = lineIndex + 1;
      allParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${String(lineNumber).padStart(4, ' ')}  ${line || ' '}`,
              font: { name: 'Courier New', size: 20 }, // 10pt = 20 half-points
            }),
          ],
          spacing: { after: 80 },
        })
      );
    });

    totalLinesAdded += linesToAdd;
    const currentPages = estimatePages(totalLinesAdded);

    // 在文件之间添加分页符（除了最后一个）
    if (i < fileList.length - 1 && totalLinesAdded < targetLines) {
      allParagraphs.push(
        new Paragraph({
          text: "",
          pageBreakBefore: true,
        })
      );
    }
    
    if (i % 10 === 0) {
      console.log(`已处理 ${i + 1}/${fileList.length} 个文件，约 ${currentPages} 页...`);
    }
  }
  
  const finalPages = estimatePages(totalLinesAdded);
  console.log(`已添加约 ${finalPages} 页内容（${totalLinesAdded} 行代码）`);

  // 创建文档
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: allParagraphs,
      },
    ],
  });

  return doc;
}

/**
 * 主函数
 */
async function main() {
  const srcDir = path.join(process.cwd(), 'src');
  
  console.log('正在扫描源代码文件...');
  const allFiles = getAllCodeFiles(srcDir);
  console.log(`找到 ${allFiles.length} 个源代码文件`);

  if (allFiles.length === 0) {
    console.error('未找到源代码文件！');
    process.exit(1);
  }

  console.log('正在生成Word文档...');
  const doc = await generateWordDocument(allFiles, 150);

  const outputPath = path.join(process.cwd(), '软件源代码文档.docx');
  console.log('正在保存文档...');
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  
  console.log(`文档已生成: ${outputPath}`);
  console.log('完成！');
}

// 运行主函数
main().catch(console.error);
