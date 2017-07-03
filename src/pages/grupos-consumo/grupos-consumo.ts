import { Component, ViewChild, ElementRef } from '@angular/core';

import { Http, Response } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ConferenceData } from '../../providers/conference-data';

import { Platform } from 'ionic-angular';


@Component({
  selector: 'page-grupos-consumo',
  templateUrl: 'grupos-consumo.html'
})
export class GruposConsumoPage {

  constructor(public confData: ConferenceData, public platform: Platform, public http: Http) {
  }

  ionViewDidLoad() {
  }
}
