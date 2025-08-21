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
  headers: Record<string, string>;
  body: string;
};
