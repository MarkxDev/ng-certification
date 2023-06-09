import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<any>;
export type EntityArrayResponseType = HttpResponse<any[]>;

const ICON_URL = "https://www.angulartraining.com/images/weather/";

export enum ContitionIcon {
  CLOUDS = 'clouds.png',	
  RAIN = 'rain.png',	
  SNOW = 'snow.png',	
  SUN = 'sun.png',
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private resourceUrl = "http://localhost:8091/ng-certification/api/"

  constructor(private http: HttpClient) { }

  public getWeather(zipcode: number): Observable<EntityResponseType> {
    return this.http.get<any>(`${this.resourceUrl}weather?zipcode=${zipcode}`, { observe: 'response' });
  }

  public getForecast(zipcode: number): Observable<EntityArrayResponseType> {
    return this.http.get<any>(`${this.resourceUrl}forecast?zipcode=${zipcode}`, { observe: 'response' });
  }

  public conditionToImgURL(condition: string): string {
    let imageJpg = ContitionIcon.SUN;
    switch(condition){
      case 'Sunny': 
        imageJpg = ContitionIcon.SUN;
        break;
      case 'Clouds':
        imageJpg = ContitionIcon.CLOUDS;
        break
      case 'Rain':
        imageJpg = ContitionIcon.RAIN;
        break
      case 'Snown':
        imageJpg = ContitionIcon.SNOW;
        break
      default:
        break
    }
    return ICON_URL+imageJpg;
  }
  
}
