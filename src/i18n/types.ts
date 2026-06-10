import common from './resources/it/common.json';
import experiences from './resources/it/experiences.json';
import welcome from './resources/it/welcome.json';
import technical from './resources/it/technical.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      experiences: typeof experiences;
      welcome: typeof welcome;
      technical: typeof technical;
    };
  }
}
