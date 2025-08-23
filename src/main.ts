import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; //TODO Aquí defines cosas como el router, http, i18n, animations, etc.
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
