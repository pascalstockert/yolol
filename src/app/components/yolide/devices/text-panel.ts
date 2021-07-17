import { Network } from '../../../services/network-manager.service';
import { Device } from './device';

export class TextPanel extends Device {

  panelValue = '';

  constructor(
    network: Network,
    name: string,
    globals = [ ':panelvalue' ]
  ) {
    super( network, name, globals );
  }

  updateOnGlobalChange( globals ): void {
    this.panelValue = globals[ ':panelvalue' ];
  }

}
