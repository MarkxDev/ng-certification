import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';

const LOCAL_STORAGE_KEY = "zipcodes";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  name = 'Angular';

  zipcodeForm: FormGroup;

  items: any[] = [];

  constructor(private appService: AppService, private fb: FormBuilder, protected router: Router ) {}

  ngOnInit() {
    this.buildForm();

    const storaged = localStorage.getItem(LOCAL_STORAGE_KEY);
    const storeArr = storaged?.split(",");
    storeArr?.forEach(element => {
      this.appService.getWeather(Number(element)).subscribe(
        (data) => {
          this.onSuccessResponse(data);
        },
        (error) => { this.onErrorResponse(error) }
      );
    });

  }

  onSubmit() {
    if (this.zipcodeForm.valid) {
     
      this.appService.getWeather(Number(this.zipcodeForm.value.zipcode)).subscribe(
        (data) => {

          this.onSuccessResponse(data);

          const storaged = localStorage.getItem(LOCAL_STORAGE_KEY);
          const toStore = storaged ? `${storaged},${this.zipcodeForm.value.zipcode}` : `${this.zipcodeForm.value.zipcode}` ;
          localStorage.setItem(LOCAL_STORAGE_KEY, toStore);

          this.zipcodeForm.reset();
        },
        (error) => { this.onErrorResponse(error) }
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

      if(storeArr && storeArr.length > 0){
        localStorage.setItem(LOCAL_STORAGE_KEY, String(storeArr));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }

    }


  }

  onSuccessResponse(data: any) {
    const condition = data.body.condition;
    const itemView = { ...data.body, imageURL: this.appService.conditionToImgURL(condition) }
    this.items.push(itemView);
  }

  onErrorResponse(error: any) {
    console.error('ERROR: ', error)
    this.router.navigate(['404']);
  }
  
  private buildForm() {
    this.zipcodeForm = this.fb.group({
      zipcode: ["", Validators.required]
    });
  }

}

