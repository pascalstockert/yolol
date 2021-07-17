import { Component, OnInit } from '@angular/core';
import { NetworkManagerService } from '../../services/network-manager.service';
import { SettingsService } from '../../services/settings.service';
import { TextPanel } from './devices/text-panel';

@Component({
  selector: 'app-yolide',
  templateUrl: './yolide.component.html',
  styleUrls: ['./yolide.component.scss']
})
export class YolideComponent implements OnInit {

  darkMode: boolean;
  network = this.networkManagerService.openNetwork( 'net1' );
  networkDeviceCount = 0;

  constructor( private networkManagerService: NetworkManagerService,
               private settingsService: SettingsService ) {
    this.settingsService.darkMode.subscribe( isDarkmode => {
      this.darkMode = isDarkmode;
    } );
  }

  ngOnInit(): void {
  }

  addTextPanel(): TextPanel {
    this.networkDeviceCount += 1;
    return new TextPanel( this.network, `TextPanel${ this.networkDeviceCount }`, [ ':panelvalue' ] );
  }

}
