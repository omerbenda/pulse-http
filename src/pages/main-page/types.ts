import { HTTPRequestMethod } from './components/http-request-form/types';

export type RequestHistoryItem = {
  url: string;
  method: HTTPRequestMethod;
  headers: { name: string; value: string }[];
  body?: string;
};
