export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  automock: false,
  moduleDirectories: ["node_modules", "src"],
};
