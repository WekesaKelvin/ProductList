import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { productReducer, productFeatureKey } from './pages/store/product.reducer';
import { ProductEffects } from './pages/store/product.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ [productFeatureKey]: productReducer }),
    provideEffects([ProductEffects])
  ]
};
