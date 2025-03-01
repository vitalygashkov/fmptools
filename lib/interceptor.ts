import { convertRequestData, convertResponseData } from './converter';
import { SchemaType } from '../types/SchemaType';
import { Request, Response } from '../types/InterceptorTypes';

const createResponseInterceptor = (schema: SchemaType) => {
  return (response: Response) => {
    const url =
      response.request?.url || response.request?.responseURL || response.url;
    const isRpcResource = url.includes('/rpc/');
    if (isRpcResource) {
      const resource = url.split('/').at(-2) ?? '';
      response.data = convertResponseData(response.data, schema, resource);
    }
    return response;
  };
};

const createRequestInterceptor = (schema: SchemaType) => {
  return (request: Request) => {
    const { url, data } = request;
    const isRpcResource = url.includes('/rpc/');
    if (isRpcResource) {
      const resource = url.split('/').at(-2) ?? '';
      request.data = convertRequestData(data, schema, resource);
    }
    return request;
  };
};

export { createResponseInterceptor, createRequestInterceptor };
