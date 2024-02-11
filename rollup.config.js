// rollup.config.js

import merge from "deepmerge";
import { createBasicConfig } from "@open-wc/building-rollup";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" assert { type: "json" };
import postCss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonJs from "@rollup/plugin-commonjs";

const baseConfig = createBasicConfig();
const umdConf = {
  format: "umd",
  name: "DomsGraph",
  banner: `// Version 1}`,
};

const { name, homepage, version, dependencies } = pkg;
export default [
  {
    // UMD
    input: "./src/app.ts",
    output: [
      {
        ...umdConf,
        file: `dist/${name}.js`,
        sourcemap: true,
      },
      {
        // minify
        ...umdConf,
        file: `dist/${name}.min.js`,
        plugins: [
          terser({
            output: { comments: "/Version/" },
          }),
        ],
      },
    ],
    plugins: [
      postCss({ plugins: [] }),
      typescript({ target: "es2016" }),
      resolve(),
      commonJs(),
    ],
  },
  {
    // ES module
    input: "./src/app.ts",
    output: [
      {
        format: "es",
        file: `dist/${name}.mjs`,
      },
    ],
    external: Object.keys(dependencies || {}),
    plugins: [postCss({ plugins: [] }), babel()],
  },
];
/* export default {
  input: "./src/app.ts",
  output: [
    {
      ...umdConf,
      sourcemap: true,
      file: "dist/src/app.js",
    },
    {
      // ES module
      input: "src/app.ts",
      output: [
        {
          format: "es",
          file: `dist/${name}.mjs`,
        },
      ],
      external: Object.keys(dependencies || {}),
      plugins: [postCss({ plugins: [] }), babel()],
    },
  ],
  plugins: [typescript({ target: "es2016" })],
};
 */
