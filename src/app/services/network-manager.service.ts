import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Device } from '../components/yolide/devices/device';
import { TextPanel } from '../components/yolide/devices/text-panel';

export interface NetworkCollection {
  [network: string]: Network;
}

export interface YazurType {
  type: number;
  subtype: number;
  value: number | string;
}

@Injectable({
  providedIn: 'root'
})

export class NetworkManagerService {

  networks: BehaviorSubject<NetworkCollection> = new BehaviorSubject( {} );

  constructor() { }

  // Returns existing network or creates one
  openNetwork( name: string ): Network {
    if ( !(name in this.networks.value) ) { this.networks.next({ ...this.networks.value, [name]: new Network( name )}); }
    return this.networks.value[ name ];
  }

  getNetworks(): BehaviorSubject<NetworkCollection> {
    return this.networks;
  }

}

export class Network {

  name: string;
  values: BehaviorSubject<{ [key: string]: YazurType }> = new BehaviorSubject( {} );
  devices: BehaviorSubject<any[]> = new BehaviorSubject( [] );

  constructor( name: string ) {
    this.name = name;
  }

  pushValue( value: { [key: string]: YazurType } ): void {
    this.values.next( { ...this.values.value, ...value } );
  }

  addDevice( device: any ): BehaviorSubject<{ [key: string]: YazurType }> {
    this.devices.next( [ ...this.devices.value, device ] );
    device.globals.map( globalKey => {
      return { [globalKey]: { type: 3, subtype: 1, value: 0 } };
    } ).forEach( globalObject => {
      this.pushValue( globalObject );
    } );
    return this.values;
  }

}
