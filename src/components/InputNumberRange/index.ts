import { App, Plugin } from 'vue';
import InputNumberRange from './InputNumberRange';

InputNumberRange.install = function(app: App) {
  app.component(InputNumberRange.name, InputNumberRange);
  return app;
};

export * from './InputNumberRange';

export default InputNumberRange as typeof InputNumberRange & Plugin;
