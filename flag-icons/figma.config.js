const svgo = require('@figma-export/transform-svg-with-svgo')

require("dotenv").config();

const fileId = process.env.FILE_ID;
const outputters = [
  require("@figma-export/output-components-as-svg")({ output: "./icons" }),
];

/** @type {import('svgo').PluginConfig[]} */
const optimizerPlugins = [
    { removeDimensions: true, name: "removeDimensions" }, //switch from dimenstions to viewbox
  ];

/** @type {import('@figma-export/types').FigmaExportRC} */
module.exports = {
  commands: [
    [
      "components",
      {
        fileId,
        onlyFromPages: ["flags"],
        transformers: [svgo({ multipass: true, plugins: optimizerPlugins })],
        outputters,
      },
    ]
  ],
};
