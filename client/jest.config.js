module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,vue}",
    "!src/main.ts",
    "!src/shims-vue.d.ts",
    "!src/shims-vuex.d.ts",
    "!src/types.ts",
  ],
  transformIgnorePatterns: ["node_modules/(?!axios)"],
  coverageProvider: "v8",
};
