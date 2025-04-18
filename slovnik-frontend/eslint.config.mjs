import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    ...compat.extends("next/core-web-vitals")[0],
  },
];

export default config;