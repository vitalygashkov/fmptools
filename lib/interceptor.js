import { parseResponse } from './parser';

const createInterceptor = (schema) => {
  return (response) => {
    const url = response.request.responseURL;
    const isRpcResource = url.includes('/rpc/');
    if (isRpcResource) {
      const resource = url.split('/').at(-2);
      response.data = parseResponse(response.data, schema, resource);
    }
    return response;
  };
};

export { createInterceptor };
