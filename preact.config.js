export default (config, env, helpers) => {
  // set ./src as base folders.
  config.resolve.modules.push(env.src);
};
