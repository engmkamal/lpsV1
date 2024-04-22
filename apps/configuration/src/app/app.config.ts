import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GlobalErrorHandler } from '../global-error-handler';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { globalHttpErrorHandlerInterceptor } from './global-http-error-handler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(withInterceptors([globalHttpErrorHandlerInterceptor])),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
};
