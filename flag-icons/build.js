// (c) https://github.com/mikunpham/react-icon-boilerplate/build.js
// This code is licensed under MIT license (see LICENSE.txt for details)

const fs = require('fs/promises');
const rimraf = require('rimraf');
const svgr = require('@svgr/core').transform;
const camelcase = require('camelcase');
const babel = require('@babel/core');
const { minify } = require('terser');
const generateIconAggregators = require("./icons-aggregator");

const outputPath = './dist';
const inputPaths = ['./icons/flags', './icons/other'];

async function transformSVGtoJSX(inputPath, file, componentName, format) {
  const content = await fs.readFile(`${inputPath}/${file}`, 'utf-8');
  const svgReactContent = await svgr(
    content,
    {
      icon: false,
      replaceAttrValues: { '#00497A': "{props.color || '#00497A'}" },
      svgProps: {
        width: 24,
        height: 24,
      },
    },
    { componentName }
  );
  const { code } = await babel.transformAsync(svgReactContent, {
    presets: [['@babel/preset-react', { useBuiltIns: true }]],
  });

  if (format === 'esm') {
    const { code: minifiedCode } = await minify(code);
    return minifiedCode;
  }

  const replaceESM = code
    .replace(
      'import * as React from "react";',
      'const React = require("react");'
    )
    .replace('export default', 'module.exports =');
  const { code: minifiedCode } = await minify(replaceESM);
  return minifiedCode;
}

function indexFileContent(svgFileNames, aggregatorNames, format, includeExtension = true) {
  let content = '';
  const extension = includeExtension ? '.js' : '';

  const appendToContent = (componentName) => {
    const directoryString = `'./${componentName}${extension}'`;
    content +=
      format === 'esm'
        ? `export { default as ${componentName} } from ${directoryString};\n`
        : `module.exports.${componentName} = require(${directoryString});\n`;
  }

  svgFileNames.map((fileName) => {
    const prefix = camelcase(fileName.replace(/.svg/, ''), { pascalCase: true });
    const componentName = `${prefix}Icon`;
    appendToContent(componentName);
  });

  aggregatorNames.forEach(componentName => {
    appendToContent(componentName);
  });

  return content;
}

async function buildIcons(format = 'esm') {
  const outDir = outputPath;
  await fs.mkdir(outDir, { recursive: true });

  let allFiles = [];

  for(let  i = 0; i < inputPaths.length; i++) {
    const inputPath = inputPaths[i];
    const files = await fs.readdir(inputPath, 'utf-8');
    await Promise.all(
      files.flatMap(async (fileName) => {
        const componentName = `${camelcase(fileName.replace(/.svg/, ''), {
          pascalCase: true,
        })}Icon`;
        const content = await transformSVGtoJSX(inputPath, fileName, componentName, format);
        const types = `import * as React from 'react';\ndeclare function ${componentName}(props: React.SVGProps<SVGSVGElement>): JSX.Element;\nexport default ${componentName};\n`;
  
        // console.log(`- Creating file: ${componentName}.js`);
        await fs.writeFile(`${outDir}/${componentName}.js`, content, 'utf-8');
        await fs.writeFile(`${outDir}/${componentName}.d.ts`, types, 'utf-8');
      })
    );

    allFiles = [...allFiles, ...files];
  }

  const aggregatorNames = await generateIconAggregators(outDir);

  console.log('- Creating file: index.js');
  await fs.writeFile(
    `${outDir}/index.js`,
    indexFileContent(allFiles, aggregatorNames, format),
    'utf-8'
  );
  await fs.writeFile(
    `${outDir}/index.d.ts`,
    indexFileContent(allFiles, aggregatorNames, 'esm', false),
    'utf-8'
  );
}

(function main() {
  console.log('🏗 Building icon package...');
  new Promise((resolve) => {
    rimraf(`${outputPath}/*`, resolve);
  })
    .then(() => Promise.all([buildIcons('esm')]))
    .then(() => console.log('✅ Finished building package.'));
})();