import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, mergeMap, of } from 'rxjs';
import { AppService } from './app.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForecastResolver implements Resolve<any> {

  constructor(protected service: AppService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    const zipCode = route.params['zipcode'];

    if (zipCode) {
      return this.service.getForecast(zipCode).pipe(
        mergeMap((res: HttpResponse<any[]>) => {
          if (res.body) {
            return of(res.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }

    return EMPTY;
  }

}
