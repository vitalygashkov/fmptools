<h1 align="center">
  <a href="https://www.npmjs.com/package/fmptools"><img alt="npm-badge" src="https://img.shields.io/npm/v/fmptools.svg?colorB=ff733e" height="20"></a>
  <a href="https://www.npmjs.com/package/fmptools"><img alt="npm-downloads-badge" src="https://img.shields.io/npm/dm/fmptools.svg?colorB=53aabb" height="20"></a>
  <a href="https://www.npmjs.com/package/fmptools"><img alt="npm-downloads-badge" src="https://img.shields.io/npm/dt/fmptools.svg" height="20"></a>
  <a href="https://github.com/vitalygashkov/fmptools/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/fmptools" alt="license-badge" height="20"></a>
</h1>
<h4 align="center">
	fmptools is a set of <a href="https://www.fsight.ru/en/mobile-platform/" title="Foresight Mobile Platform">FMP</a> utilities for use on the web
</h4>

### Install

```sh
npm i fmptools
```

### Usage

Modify response data via Axios interceptor:

```javascript
import axios from 'axios';
import { createInterceptor } from 'fmptools';

const { data: schema } = await axios.get('https://example.com/api/v1/schema');

const interceptor = createInterceptor(schema);
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(interceptor);

const { data: result } = await axiosInstance.get(`https://example.com/api/v1/rpc/ZFM_USERDATA/`);
```

Parse response data manually:

```javascript
import axios from 'axios';
import { parseResponse } from 'fmptools';

const { data: schema } = await axios.get('https://example.com/api/v1/schema');

const resource = 'ZFM_USERDATA';
const { data } = await axios.get(`https://example.com/api/v1/rpc/${resource}/`);
const result = parseResponse(data, schema, resource);
```
