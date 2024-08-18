import { appTools, defineConfig } from '@modern-js/app-tools';
import { bffPlugin } from '@modern-js/plugin-bff';
import { koaPlugin } from '@modern-js/plugin-koa';
import { polyfillPlugin } from '@modern-js/plugin-polyfill';
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss';
import { SemiRspackPlugin } from '@douyinfe/semi-rspack-plugin';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  bff: {
    enableHandleWeb: process.env.NODE_ENV === 'production',
  },
  server: {
    port: 8888,
  },
  runtime: {
    router: true,
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack',
    }),
    bffPlugin(),
    koaPlugin(),
    polyfillPlugin(),
    tailwindcssPlugin(),
  ],
  html: {
    title: 'Hackerese',
  },
  tools: {
    rspack(config, context) {
      context.appendPlugins([
        new SemiRspackPlugin({
          cssLayer: true,
        }),
      ]);
    },
  },
});
