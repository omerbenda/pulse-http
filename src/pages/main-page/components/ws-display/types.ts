import { InterfaceType } from '../../../../common/types/api-interface-types';

export interface WSInputs {
  interfaceType: InterfaceType.WS;
  url: string;
  protocols: { name: string }[];
}
