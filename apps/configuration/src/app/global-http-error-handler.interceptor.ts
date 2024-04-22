import { HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { catchError, retry, throwError, timer } from 'rxjs';

export const globalHttpErrorHandlerInterceptor: HttpInterceptorFn = (
    req,
    next: HttpHandlerFn
  ) => {
  return next(req).pipe(
    retry({
      count:2,
      delay:(_, retryCount) => timer(retryCount * 1000)
    }),
    catchError((err) => {
      console.error('Error handled by Http Interceptor...', err.message);
      return throwError(()=> {
        console.log('Error rethrown by HTTP Interceptor');
        return err;
      })
    })
  );
};
