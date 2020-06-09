import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#071e3d',
        secondary: '#1f4287',
        accent: '#278ea5',
        contrast: '#21e6c1'
      }
    }
  }
});
