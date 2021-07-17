import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Network, NetworkManagerService } from '../../services/network-manager.service';
import { TextPanel } from '../../components/yolide/devices/text-panel';

@Component({
  selector: 'app-standalone-editor',
  templateUrl: './standalone-editor.component.html',
  styleUrls: ['./standalone-editor.component.scss']
})
export class StandaloneEditorComponent implements OnInit {

  network: Network;
  networkValues: any;
  darkMode = false;

  constructor( private settingsService: SettingsService,
               private networkManagerService: NetworkManagerService ) { }

  ngOnInit(): void {
    this.settingsService.darkMode.subscribe( darkMode => {
      this.darkMode = darkMode;
    } );
    this.network = this.networkManagerService.openNetwork( 'net01' );
    this.network.values.subscribe( values => {
      this.networkValues = values;
    } );
  }

  addDevice(): any {
    this.network.addDevice( new TextPanel( this.network, 'chip' ) );
  }

}
