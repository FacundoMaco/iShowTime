import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Zoneless change detection for better performance
    provideZonelessChangeDetection(),

    // Router configuration
    provideRouter(routes),

    // Client hydration for SSR (if needed)
    provideClientHydration(withEventReplay())
  ]
};
