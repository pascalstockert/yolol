import { Component, OnInit } from '@angular/core';
import { NetworkManagerService } from '../../../services/network-manager.service';
import { SettingsService } from '../../../services/settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-device-explorer',
  templateUrl: './device-explorer.component.html',
  styleUrls: ['./device-explorer.component.scss']
})
export class DeviceExplorerComponent implements OnInit {

  darkMode: boolean;

  networkNames: string[] = [];
  networkDevices: any = {};
  networkSubscription: Subscription = new Subscription();

  constructor( private networkManagerService: NetworkManagerService,
               private settingsService: SettingsService ) {
    this.settingsService.darkMode.subscribe( isDarkmode => {
      this.darkMode = isDarkmode;
    } );
    this.networkManagerService.getNetworks().subscribe( networks => {
      this.networkNames = Object.keys( networks );
      this.networkNames.forEach( networkName => {
        networks[ networkName ].devices.subscribe( devices => {
          const devicesObject = {};
          devices.forEach( device => {
            devicesObject[ device.name ] = device;
          } );
          this.networkDevices[ networkName ] = devicesObject;
        } );
      } );
    } );
  }

  ngOnInit(): void {
  }

}
