interface Response {
  data: any;
  request: {
    responseURL: string;
  };
}

/**
 * Create response interceptor to modify response data
 * @param schema - FMP schema
 * @returns interceptor function which can be used in `axios`, for example
 */
export function createInterceptor(
  schema: Record<string, unknown>
): (value: Response) => Response | Promise<Response>;

/**
 * Parse response data to human readable object
 * @param data - data from HTTP response
 * @param schema - FMP schema
 * @param resource - FMP resource name (for example: `ZFM_USERDATA`)
 * @returns parsed data
 */
export function parseResponse<T>(data: any, schema: Record<string, unknown>, resource: string): T;
