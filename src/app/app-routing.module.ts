import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './componets/main/main.component';
import { ForecastComponent } from './componets/forecast/forecast.component';
import { ForecastResolver } from './services/forecast.resolver';

const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'forecast/:zipcode',
    resolve: {
      forecast: ForecastResolver,
    },
    component: ForecastComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }