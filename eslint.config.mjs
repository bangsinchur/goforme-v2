import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn", // 사용하지 않는 변수가 있을 때 경고로 표시해요
      "@typescript-eslint/no-explicit-any": "off", //  any 타입을 명시적으로 정의할 수 있도록 허용해요
    },
  },
]);

export default eslintConfig;
