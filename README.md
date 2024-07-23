<h1 align="center">
  <a href="https://www.npmjs.com/package/fmptools"><img alt="npm-badge" src="https://img.shields.io/npm/v/fmptools.svg?colorB=ff733e" height="20"></a>
  <a href="https://www.npmjs.com/package/fmptools"><img alt="npm-downloads-badge" src="https://img.shields.io/npm/dm/fmptools.svg?colorB=53aabb" height="20"></a>
  <a href="https://www.npmjs.com/package/fmptools"><img alt="npm-downloads-badge" src="https://img.shields.io/npm/dt/fmptools.svg" height="20"></a>
  <a href="https://github.com/vitalygashkov/fmptools/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/fmptools" alt="license-badge" height="20"></a>
</h1>
<h4 align="center">fmptools is a set of <a href="https://www.fsight.ru/en/mobile-platform/" title="Foresight Mobile Platform">FMP</a> utilities for transforming RPC requests</h4>

### Install

```sh
npm i fmptools
```

### Usage

Use Axios interceptors to convert response and/or request data automatically for all FMP requests:

```javascript
import axios from 'axios';
import { createRequestInterceptor, createResponseInterceptor } from 'fmptools';

const http = axios.create();

const init = async () => {
  const { data: schema } = await http.get('https://example.com/api/v1/schema');

  const requestInterceptor = createRequestInterceptor(schema);
  http.interceptors.request.use(requestInterceptor);

  const responseInterceptor = createResponseInterceptor(schema);
  http.interceptors.response.use(responseInterceptor);
};

const makeRequest = async () => {
  const url = 'https://example.com/api/v1/rpc/ZFM_USERDATA/';
  const { data: responseData } = await http.post(url);
  return responseData;
};
```

Or convert response/request data manually:

```javascript
import axios from 'axios';
import { convertRequestData, convertResponseData } from 'fmptools';

const makeRequest = async () => {
  const { data: schema } = await axios.get('https://example.com/api/v1/schema');

  const resource = 'ZFM_CREATE_TASK';
  const requestData = {
    IT_DATA: [
      {
        TITLE: 'Task #1',
        USERID: 1,
        DATE: '2023-09-26',
        TIME: '06:48:17',
        EMAIL: 'example1@mail.com',
      },
    ],
  };
  /* Table entities will be converted to rows as arrays
   * IT_DATA: [['Task #1', 1, '2023-09-26', '06:48:17', 'example1@mail.com']]
   */
  const requestDataConverted = convertRequestData(requestData, schema, resource);
  const url = `https://example.com/api/v1/rpc/${resource}/`;
  const options = { data: requestDataConverted };
  const { data } = await axios.post(url, options);
  const responseData = convertResponseData(data, schema, resource);
  return responseData;
};
```
