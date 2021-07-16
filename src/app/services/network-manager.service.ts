import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Device } from '../devices/device';
import { TextPanel } from '../devices/text-panel';

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

  networks: NetworkCollection = {};

  constructor() { }

  // Returns existing network or creates one
  openNetwork( name: string ): Network {
    if ( !(name in this.networks) ) { this.networks[ name ] = new Network( name ); }
    return this.networks[ name ];
  }

}

export class Network {

  name: string;
  values: BehaviorSubject<{ [key: string]: YazurType }> = new BehaviorSubject( {} );

  constructor( name: string, logging = false ) {
    this.name = name;
    if ( logging ) {
      this.values.subscribe( ( valueChange ) => {
        console.log( `NETWORK CHANGE ${ this.name }\n`, valueChange );
      } );
    }
  }

  pushValue( value: { [key: string]: YazurType } ): void {
    this.values.next( { ...this.values.value, ...value } );
  }

  addDevice( device: any ): BehaviorSubject<{ [key: string]: YazurType }> {
    device.globals.map( globalKey => {
      return { [globalKey]: { type: 3, subtype: 1, value: 0 } };
    } ).forEach( globalObject => {
      this.pushValue( globalObject );
    } );
    return this.values;
  }

}
