import { Component, ViewChild, ElementRef } from '@angular/core';

import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ConferenceData } from '../../providers/conference-data';

import { Platform, NavController } from 'ionic-angular';

import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';

// import jQuery from 'jquery';


declare var google: any;
declare var GPXParser: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

    private houses: any[];
  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public confData: ConferenceData, public platform: Platform, public http: Http, public navCtrl: NavController,) {
  }

    /*loadGPXFileIntoGoogleMap(map: any, filename: any){

        this.http.get(filename)
            .map((res:Response) => res.text())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
            .subscribe(data => {
                let prs = new DOMParser();
                data = prs.parseFromString(data,"application/xml");
                var parser = new GPXParser(data, map);
                parser.setTrackColour("#6C920F");
                parser.setTrackWidth(5);
                parser.setMinTrackPointDelta(0.001);
                parser.centerAndZoom(data);
                parser.addTrackpointsToMap();
                parser.addRoutepointsToMap();
                parser.addWaypointsToMap();
            });

    }*/

    goToHouseDetail(house: any) {
        this.navCtrl.push(SpeakerDetailPage, {
            speaker: house,
            name: house.name
        });
    }

  ionViewDidLoad() {
      this.confData.getMap().subscribe((mapData: any) => {
        let mapEle = this.mapElement.nativeElement;

        let map = new google.maps.Map(mapEle, {
          center: mapData.find((d: any) => d.center),
          zoom: 16
        });

          this.confData.getHouses().subscribe((houses: any[]) => {
              this.houses = houses;
              let infoWindow = new google.maps.InfoWindow({});
              let bounds = new google.maps.LatLngBounds();
              houses.forEach((house: any) => {

                     let marker = new google.maps.Marker({
                       position: house,
                       map: map,
                       title: house.name,
                         icon: {
                            url: house.tipo,
                            scaledSize: new google.maps.Size(35, 50)
                          }
                     });
                    bounds.extend(marker.position);

                     marker.addListener('click', () => {

                         var content = document.createElement('div');
                         content.innerHTML = (`<div class="info-box-wrap">
                             <img src="${house.picture}" />
                         <div class="info-box-text-wrap">
                         <h6 class="address">${house.name}</h6>
                         <p class="price">${house.titulo}</p>
                         </div>`);
                         var button = content.appendChild(document.createElement('input'));
                         button.type = 'button';
                         button.id = 'showMoreButton';
                         button.value = 'Ver detalle';
                         button.addEventListener('click', this.goToHouseDetail.bind(this, house));
                         infoWindow.setContent(content);
                         infoWindow.open(map, marker);
                     });
                });
              map.fitBounds(bounds);
          });

        //this.loadGPXFileIntoGoogleMap(map, "assets/ruta.xml");

      });

  }
}
