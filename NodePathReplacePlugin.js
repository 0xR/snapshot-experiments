/**
 * Modified NodeStuffPlugin to replace __filename and __dirname with absolute path
 * @see https://github.com/zinserjan/mocha-webpack/issues/39
 * @see https://github.com/webpack/webpack/blob/ca8b693c2c17bd06778476381fae23b3b21c0475/lib/NodeStuffPlugin.js
 */
function NodePathReplacePlugin() {}
module.exports = NodePathReplacePlugin;
NodePathReplacePlugin.prototype.apply = function NodePathReplacePluginApply(compiler) {
  function setModuleConstant(expressionName, fn) {
    compiler.parser.plugin(`expression ${expressionName}`, function addVariable() {
      this.state.current.addVariable(expressionName, JSON.stringify(fn(this.state.module)));
      return true;
    });
  }

  setModuleConstant('__filename', (module) => module.resource);

  setModuleConstant('__dirname', (module) => module.context);
};
