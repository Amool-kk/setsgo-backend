import globals from "globals";
import pluginJs from "@eslint/js";
import babelParser from "@babel/eslint-parser";

export default [
  {
    languageOptions: {
      sourceType: "module",
      globals: globals.node,
    },
    parserOptions: {
      parser: babelParser,
      requireConfigFile: false,
      ecmaVersion: 2018,
      sourceType: 'module'
    }
  },
  pluginJs.configs.recommended,
];
