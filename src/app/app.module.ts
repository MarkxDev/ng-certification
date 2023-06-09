import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './componets/main/main.component';
import { ForecastComponent } from './componets/forecast/forecast.component';
import { ErrorComponent } from './componets/error/error.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule],
  declarations: [ AppComponent, MainComponent, ForecastComponent, ErrorComponent ],
  bootstrap:    [ AppComponent ],
  // providers: [ AppService ]
})
export class AppModule { }
