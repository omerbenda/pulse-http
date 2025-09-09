import { HTTPInputs } from './components/http-display/components/http-request-form/types';
import { WSInputs } from './components/ws-display/types';

export enum InterfaceType {
  HTTP = 'HTTP',
  WS = 'WS',
}

export type InterfaceInputs = HTTPInputs | WSInputs;
