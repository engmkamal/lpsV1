import { ResolveFn } from '@angular/router';

export const preinfoResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};

