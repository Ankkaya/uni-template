import path from 'node:path'
import process from 'node:process'
import { defineConfig, loadEnv } from "vite";
import Uni from '@uni-helper/plugin-uni'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import Optimization from '@uni-ku/bundle-optimizer'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ViteRestart from 'vite-plugin-restart'
// https://vitejs.dev/config/

export default ({ command, mode }) => {
  const { UNI_PLATFORM } = process.env

  const env = loadEnv(mode, path.resolve(process.cwd(), 'env'))
  const {
    VITE_APP_PORT,
    VITE_SERVER_BASEURL,
    VITE_DELETE_CONSOLE,
    VITE_SHOW_SOURCEMAP,
    VITE_APP_PUBLIC_BASE,
    VITE_APP_PROXY_ENABLE,
    VITE_APP_PROXY_PREFIX,
  } = env

  return defineConfig({
    envDir: './env',
    base: VITE_APP_PUBLIC_BASE,
    plugins: [UniPages({
      exclude: ['**/components/**.*'],
      dts: 'src/types/uni-pages.d.ts'
    }), UniManifest(), UnoCSS(), AutoImport({
      imports: ['vue', 'uni-app'],
      dts: 'src/types/auto-imports.d.ts',
      dirs: ['src/hooks'],
      vueTemplate: true,
    }), Optimization({
      enable: {
        'optimization': true,
        'async-component': true,
        'async-import': true,
      },
      dts: {
        base: 'src/types'
      },
      logger: false
    }), ViteRestart({
      restart: ['vite.config.ts']
    }), Uni()],
    define: {
      __UNI_PLATFORM__: JSON.stringify(UNI_PLATFORM),
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api', 'import'],
        }
      }
    },
    esbuild: {
      drop: VITE_DELETE_CONSOLE === 'true' ? ['console', 'debugger'] : ['debugger'],
    },
    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src'),
        '@img': path.join(process.cwd(), './src/static/images')
      }
    },
    server: {
      host: '0.0.0.0',
      port: Number.parseInt(VITE_APP_PORT, 10),
      proxy: JSON.parse(VITE_APP_PROXY_ENABLE) ? {
        [VITE_APP_PROXY_PREFIX]: {
          target: VITE_SERVER_BASEURL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${VITE_APP_PROXY_PREFIX}`), '')
        }
      } : undefined
    }
  })
}