## fmptools

[![npm version](https://img.shields.io/npm/v/fmptools)](https://www.npmjs.com/package/fmptools)
[![npm downloads/month](https://img.shields.io/npm/dm/fmptools)](https://www.npmjs.com/package/fmptools)
[![npm downloads](https://img.shields.io/npm/dt/fmptools)](https://www.npmjs.com/package/fmptools)
[![license](https://img.shields.io/npm/l/fmptools)](https://github.com/vitnore/fmptools/blob/main/LICENSE)

Foresight Mobile Platform tools

### Installation

```bash
$ npm i fmptools
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

const resource = 'ZFM_USERDATA';
const response = axiosInstance.get(`https://example.com/api/v1/rpc/${resource}/`);
const result = response.data;
```

Parse response data manually:

```javascript
import axios from 'axios';
import { parseResponse } from 'fmptools';

const { data: schema } = await axios.get('https://example.com/api/v1/schema');

const resource = 'ZFM_USERDATA';
const response = await axios.get(`https://example.com/api/v1/rpc/${resource}/`);
const result = parseResponse(response.data, schema, resource);
```
