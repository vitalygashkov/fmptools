Foresight Mobile Platform tools

### Installation

```bash
$ npm i fmptools
```

### Usage

Modify FMP response via Axios interceptor:

```javascript
import axios from 'axios';
import { responseInterceptor } from 'fmptools';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(responseInterceptor);
```

Parse FMP response manually:

```javascript
import axios from 'axios';
import { parseResponse } from 'fmptools';

const response = await axios.get('https://example.com/api/v1/ZFM_USERDATA/');
const parsedResponse = parseResponse(response.data);
```
