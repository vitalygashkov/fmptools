interface Request {
  data: any;
  url: string;
}

interface Response {
  data: any;
  request: {
    responseURL: string;
  };
}

/**
 * Create request interceptor to convert request data
 * @param schema - FMP schema
 * @returns interceptor function which can be used in `axios`, for example
 */
export function createRequestInterceptor(
  schema: Record<string, unknown>
): (value: Request) => Request | Promise<Request>;

/**
 * Create response interceptor to convert response data
 * @param schema - FMP schema
 * @returns interceptor function which can be used in `axios`, for example
 */
export function createResponseInterceptor(
  schema: Record<string, unknown>
): (value: Response) => Response | Promise<Response>;

/**
 * Convert request data to FMP format (table entities as arrays)
 * @param data - HTTP request payload
 * @param schema - FMP schema
 * @param resource - FMP resource name (for example: `ZFM_USERDATA`)
 * @returns parsed data
 */
export function convertRequestData<T>(
  data: any,
  schema: Record<string, unknown>,
  resource: string
): T;

/**
 * Convert response data to human readable object
 * @param data - data from HTTP response
 * @param schema - FMP schema
 * @param resource - FMP resource name (for example: `ZFM_USERDATA`)
 * @returns parsed data
 */
export function convertResponseData<T>(
  data: any,
  schema: Record<string, unknown>,
  resource: string
): T;
