import { Component, ViewChild, ElementRef } from '@angular/core';

import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ConferenceData } from '../../providers/conference-data';

import { Platform } from 'ionic-angular';

// import jQuery from 'jquery';


declare var google: any;
declare var GPXParser: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public confData: ConferenceData, public platform: Platform, public http: Http) {
  }

    loadGPXFileIntoGoogleMap(map: any, filename: any){

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

    }

  ionViewDidLoad() {
      this.confData.getMap().subscribe((mapData: any) => {
        let mapEle = this.mapElement.nativeElement;

        let map = new google.maps.Map(mapEle, {
          center: mapData.find((d: any) => d.center),
          zoom: 16
        });

        this.loadGPXFileIntoGoogleMap(map, "assets/ruta.xml");
//
//        mapData.forEach((markerData: any) => {
//          let infoWindow = new google.maps.InfoWindow({
//            content: `<h5>${markerData.name}</h5>`
//          });
//
//          let marker = new google.maps.Marker({
//            position: markerData,
//            map: map,
//            title: markerData.name
//          });
//
//          marker.addListener('click', () => {
//            infoWindow.open(map, marker);
//          });
//        });
//
//        google.maps.event.addListenerOnce(map, 'idle', () => {
//          mapEle.classList.add('show-map');
//        });


      });

  }
}
