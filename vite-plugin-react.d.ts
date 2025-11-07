declare module '@vitejs/plugin-react' {
  import type { Plugin } from 'vite';
  /** Minimal typing: plugin factory returns a Vite Plugin or array of Plugins */
  function reactPlugin(options?: any): Plugin | Plugin[];
  export default reactPlugin;
}
