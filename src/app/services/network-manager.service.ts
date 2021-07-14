import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NetworkCollection {
  [network: string]: Network;
}

@Injectable({
  providedIn: 'root'
})
export class NetworkManagerService {

  networks: NetworkCollection = {};

  constructor() { }

  // Returns existing network or creates one
  openNetwork( name: string ): Network {
    if ( !(name in this.networks) ) { this.networks[ name ] = new Network(); }
    return this.networks[ name ];
  }

}

export class Network {

  values: BehaviorSubject<{ [key: string]: { type: number, subtype: number, value: number | string } }>;

  constructor() {
    this.values = new BehaviorSubject( {} );
  }

  pushValue( value: { [key: string]: { type: number, subtype: number, value: number | string } } ): void {
    this.values.next( { ...this.values.value, ...value } );
  }

}
