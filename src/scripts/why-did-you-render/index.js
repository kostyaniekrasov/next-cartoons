import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const injectionSource = path.join(__dirname, 'injection.ts');

/**
 * @param {import('webpack').Configuration} config
 * @param {WebpackConfigContext} context
 */
export default (config, context) => {
  if (context.dev && !context.isServer) {
    const originalEntry = config.entry;

    config.entry = async () => {
      const entries =
        typeof originalEntry === 'function'
          ? await originalEntry()
          : originalEntry || {};

      if (
        entries['main-app'] &&
        !entries['main-app'].includes(injectionSource)
      ) {
        entries['main-app'].unshift(injectionSource);
      }

      return entries;
    };
  }
};
