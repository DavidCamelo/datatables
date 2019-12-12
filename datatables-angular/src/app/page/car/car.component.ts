import { Component, OnInit } from '@angular/core';

import { CarModel } from 'src/app/model/car.model';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

  carUrl: string;

  carType: CarModel;

  car: CarModel;

  constructor() {}

  ngOnInit() {
    this.carUrl = '/car';
    this.carType = new CarModel();
  }

  selectCarRow( car: CarModel ) {
    this.car = car;
  }
}

