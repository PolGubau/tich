import type { Config } from "jest";

const config: Config = {
  preset: "jest-expo",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/template",
    "Libraries/Renderer",
    "RNTester/e2e",
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|react-native-vector-icons)/)",
  ],
  fakeTimers: {
    enableGlobally: true,
  },
  verbose: true,
};

export default config;