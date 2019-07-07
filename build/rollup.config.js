import vue from 'rollup-plugin-vue'; 
import buble from 'rollup-plugin-buble'; 
export default {
  input: 'build/wrapper.js', 
  output: {
    name: 'UserRegistration',
    exports: 'named'
  },
  plugins: [
    vue({
        css: true, 
        compileTemplate: true,
    }),
    buble() 
  ],
};