export enum HTTPRequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
}

export type HTTPRequestInputs = {
  url: string;
  method: HTTPRequestMethod;
  headers: { name: string; value: string }[];
  body: string;
};

export enum HttpRequestFormTab {
  HEADERS = 'headers',
  BODY = 'body',
}
