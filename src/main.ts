import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { Inicio } from './app/inicio/inicio';

bootstrapApplication(Inicio, {
  providers: [provideRouter(routes)]
});