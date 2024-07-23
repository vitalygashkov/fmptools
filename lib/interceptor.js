import { convertRequestData, convertResponseData } from './converter';

const createResponseInterceptor = (schema) => {
  return (response) => {
    const url = response.request?.url || response.request?.responseURL || response.url;
    const isRpcResource = url.includes('/rpc/');
    if (isRpcResource) {
      const resource = url.split('/').at(-2);
      response.data = convertResponseData(response.data, schema, resource);
    }
    return response;
  };
};

const createRequestInterceptor = (schema) => {
  return (request) => {
    const { url, data } = request;
    const isRpcResource = url.includes('/rpc/');
    if (isRpcResource) {
      const resource = url.split('/').at(-2);
      request.data = convertRequestData(data, schema, resource);
    }
    return request;
  };
};

export { createResponseInterceptor, createRequestInterceptor };
