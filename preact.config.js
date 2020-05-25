import appConfig from "./config";

export default (config, env, helpers) => {
  // set ./src as base folders.
  config.resolve.modules.push(env.src);
  config.resolve.modules.push("./src");

  // proxy for netlify lambda functions
  // config.devServer.proxy = [
  //   {
  //     path: "/.netlify/functions/**",
  //     target: "http://localhost:9000",
  //   },
  // ];
};
