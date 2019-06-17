import babel from "rollup-plugin-babel"

export default {
  input: "index.js",
  output: {
    dir: "dist",
    format: "cjs",
    sourceMap: true,
  },
  external: ["recompose"],
  plugins: [babel()],
}
