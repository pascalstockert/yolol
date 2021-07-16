import { Network } from '../services/network-manager.service';
import { Device } from './device';

export class TextPanel extends Device {

  panelValue = '';

  constructor(
    network: Network,
    globals = [ ':panelvalue' ]
  ) {
    super( network, globals );
  }

  updateOnGlobalChange( globals ): void {
    this.panelValue = globals[ ':panelvalue' ];
    console.log(this.panelValue);
  }

}
