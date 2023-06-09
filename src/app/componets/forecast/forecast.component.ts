import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  forecast: any[] = [];

  constructor(protected activatedRoute: ActivatedRoute, private service: AppService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ forecast }) => {
      this.forecast = forecast;
    });
  }

  getConditionImgURL(item) {
    return this.service.conditionToImgURL(item.condition);
  }

  goBack() {
    window.history.back();
  }

}
