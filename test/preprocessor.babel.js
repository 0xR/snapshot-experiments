import babelJest from 'babel-jest';
import path from 'path';
import postcss from 'postcss';
import LocalByDefault from 'postcss-modules-local-by-default';
import ExtractImports from 'postcss-modules-extract-imports';
import Scope from 'postcss-modules-scope';
import ExtractExports from 'postcss-modules-extract-exports';
import genericNames from 'generic-names';
import { cssModuleNames } from '../webpack.config.babel.js';

const rootDir = path.resolve(__dirname, '..');

const postCssProcessor = postcss([
  LocalByDefault,
  ExtractImports,
  new Scope({
    generateScopedName: genericNames(cssModuleNames, rootDir),
  }),
  ExtractExports,
]);

export function process(src, filename) { // eslint-disable-line import/prefer-default-export
  if (filename.match(/\.css$/)) {
    const result = postCssProcessor.process(src, { from: filename });
    return `module.exports = ${JSON.stringify(result.root.tokens)}`;
  } else if (filename.match(/\.png$/)) {
    const relativeFilename = path.relative(rootDir, filename);
    return `module.exports = '${relativeFilename}';`;
  }
  return babelJest.process(src, filename);
}
