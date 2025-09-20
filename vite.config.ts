import path from 'node:path'
import process from 'node:process'
import { defineConfig, loadEnv } from "vite";
import Uni from '@uni-helper/plugin-uni'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
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
    }), UniManifest(), Uni()],
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
      }
    }
  })
}
// export default defineConfig({
//   plugins: [UniPages(), UniManifest(), Uni()],
//   css: {
//     preprocessorOptions: {
//       scss: {
//         api: 'modern-compiler',
//         silenceDeprecations: ['legacy-js-api', 'import'],
//       }
//     }
//   },
//   esbuild: {
//     drop: VITE_DELETE_CONSOLE === 'true' ? ['console', 'debugger'] : ['debugger'],
//   }
// });
