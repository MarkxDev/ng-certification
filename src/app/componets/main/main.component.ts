import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';

const LOCAL_STORAGE_KEY = "zipcodes";
const ICON_URL = "https://www.angulartraining.com/images/weather/";

export enum ContitionIcon {
  CLOUDS = 'clouds.png',	
  RAIN = 'rain.png',	
  SNOW = 'snow.png',	
  SUN = 'sun.png',
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  name = 'Angular';

  zipcodeForm: FormGroup;

  items: any[] = [];

  constructor(private appService: AppService, private fb: FormBuilder ) {}

  ngOnInit() {
    this.buildForm();

    const storaged = localStorage.getItem(LOCAL_STORAGE_KEY);
    const storeArr = storaged?.split(",");
    storeArr?.forEach(element => {
      this.appService.getWeather(Number(element)).subscribe(
        (data) => {
          this.onSuccessResponse(data);
        }
      );
    });

  }

  onSubmit() {
    if (this.zipcodeForm.valid) {
      console.log("Submitting form: ", this.zipcodeForm.value);
     
      this.appService.getWeather(Number(this.zipcodeForm.value.zipcode)).subscribe(
        (data) => {

          this.onSuccessResponse(data);

          const storaged = localStorage.getItem(LOCAL_STORAGE_KEY);
          const toStore = storaged ? `${storaged},${this.zipcodeForm.value.zipcode}` : `${this.zipcodeForm.value.zipcode}` ;
          localStorage.setItem(LOCAL_STORAGE_KEY, toStore);
          console.log("toStore: ", toStore);

          this.zipcodeForm.reset();
        }
      );

    } else {
      console.error("Form is invalid!");
    }
  }

  closeItem(item: any) {

    const index = this.items.indexOf(item, 0);
    if (index > -1) {
      this.items.splice(index, 1);

      const storaged = localStorage.getItem(LOCAL_STORAGE_KEY);
      let storeArr = storaged?.split(",");
      storeArr?.splice(index, 1);

      console.log('storeArr: ', storeArr);
      console.log('String(storeArr??[]): ', String(storeArr??[]));
      if(storeArr && storeArr.length > 0){
        localStorage.setItem(LOCAL_STORAGE_KEY, String(storeArr));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }

    }


  }

  onSuccessResponse(data: any) {
    const condition = data.body.condition;
    let imageJpg = ContitionIcon.SUN;

    switch(condition){
      case 'Sunny': 
        imageJpg = ContitionIcon.SUN;
        break;
      case 'Clouds':
        imageJpg = ContitionIcon.CLOUDS;
        break
      default:
        break
    }

    const itemView = { ...data.body, imageURL: ICON_URL+imageJpg }
    this.items.push(itemView);
  }

  private buildForm() {
    this.zipcodeForm = this.fb.group({
      zipcode: ["", Validators.required]
    });
  }

}

