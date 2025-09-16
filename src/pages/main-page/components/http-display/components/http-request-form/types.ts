import { InterfaceType } from '../../../../../../common/types/api-interface-types';

export enum HTTPRequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
}

export enum HttpRequestFormTab {
  HEADERS = 'headers',
  BODY = 'body',
}

export interface HTTPInputs {
  interfaceType: InterfaceType.HTTP;
  url: string;
  method: HTTPRequestMethod;
  headers: { name: string; value: string }[];
  body: string;
}
