import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      sourceType: "module",
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
];
