import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ConferenceData } from '../../providers/conference-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';

@Component({
  selector: 'page-dispositivos',
  templateUrl: 'dispositivos.html'
})
export class DispositivosPage {
  actionSheet: ActionSheet;
  dispositivos: any[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) { }

  ionViewDidLoad() {
    this.confData.getDispositivos().subscribe((dispositivos: any[]) => {
      this.dispositivos = dispositivos;
    });
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, {
      name: session.name,
      session: session
    });
  }

  goToSpeakerDetail(speakerName: any) {
    this.navCtrl.push(SpeakerDetailPage, {
      speaker: speakerName,
      name: speakerName.name
    });
  }

}
