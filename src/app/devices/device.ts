import { Network } from '../services/network-manager.service';
import { map } from 'rxjs/operators';

export abstract class Device {

  globals: string[];

  protected constructor( network: Network, globals: string[] ) {
    this.globals = globals;
    network.addDevice( this )
      .pipe(
        map( ( globalEntries ) => {
          const filteredEntries = {};
          Object.keys( globalEntries )
            .filter( ( globalKey ) => {
              return this.globals.includes( globalKey );
            } ).forEach( ( key ) => {
              filteredEntries[ key ] = globalEntries[ key ];
            } );
          return filteredEntries;
        } )
      ).subscribe( ( changedGlobals ) => {
        this.updateOnGlobalChange( changedGlobals );
      } );
  }

  abstract updateOnGlobalChange( globals ): void;

}
