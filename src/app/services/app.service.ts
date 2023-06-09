import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<any>;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private resourceUrl = "http://localhost:8091/ng-certification/api/"

  constructor(private http: HttpClient) { }

  public getWeather(zipcode: number): Observable<EntityResponseType> {
    return this.http.get<any>(`${this.resourceUrl}weather?zipcode=${zipcode}`, { observe: 'response' });
  }
  
}
