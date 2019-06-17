module.exports = {
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testRegex: "tests/.*\\.test\\.js$",
}
