import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './componets/main/main.component';
import { ForecastComponent } from './componets/forecast/forecast.component';
import { ForecastResolver } from './services/forecast.resolver';
import { ErrorComponent } from './componets/error/error.component';

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
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {
      pageTitle: 'error.title',
      errorMessage: 'error.http.404',
    },
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }