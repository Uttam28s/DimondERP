const mix = require("laravel-mix");

mix
  .setPublicPath(path.normalize("public"))
  .react("src/index.js", "build/js")
  .sass("src/scss/index.scss", "build/css");

mix.webpackConfig({
  devServer: {
    historyApiFallback: true,
  },
});

// mix.browserSync({
//   proxy: "analytic.knovator.in",
//   files: ["public/dist/js/index.js", "public/dist/css/index.css"],
//   reloadOnRestart: false,
//   startPath: "/",
//   notify: false,
//   logPrefix: "analytic_xyz",
//   logLevel: "debug",
//   port: 5001,
//   ui: {
//     port: 8112
//   }
// });
