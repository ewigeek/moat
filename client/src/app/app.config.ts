import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  AutoRefreshTokenService,
  includeBearerTokenInterceptor,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  provideKeycloak,
  UserActivityService,
  withAutoRefreshToken,
} from 'keycloak-angular';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [{ urlPattern: new RegExp(`^${environment.apiUrl}`) }],
    },
    provideKeycloak({
      config: {
        url: 'http://keycloak:8080',
        realm: 'moat',
        clientId: 'moat-client',
      },
      initOptions: {
        onLoad: 'login-required',
        flow: 'standard',
      },
      features: [
        withAutoRefreshToken({
          onInactivityTimeout: 'logout',
          sessionTimeout: 60000,
        }),
      ],
      providers: [AutoRefreshTokenService, UserActivityService],
    }),
  ],
};
