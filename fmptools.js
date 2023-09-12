import { parseResponse } from './lib/parser';

const responseInterceptor = (response) => {
  const url = response.request.responseURL;
  const isRpcResource = url.includes('/rpc/');
  if (isRpcResource) {
    const resource = url.split('/').at(-2);
    response.data = parseResponse(response.data, schema, resource);
  }
  return response;
};

export { responseInterceptor, parseResponse };
