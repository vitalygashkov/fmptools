import { test, expect } from 'vitest';
import { createRequestInterceptor, createResponseInterceptor } from '../lib/interceptor';

const schema = require('./mocks/schema.json');
const response = require('./mocks/response.json');
const request = require('./mocks/request.json');

const tablesCount = 1; // ET_USERDATA
const usersCount = 1;
const columnCount = 7; // UNAME, JOBNAME, PERNR, SWERK, BUKRS, ORGEH, STORT

test('request interceptor', () => {
  const requestInterceptor = createRequestInterceptor(schema);
  const result = requestInterceptor(request);
  const { IT_DATA } = result?.data;
  expect(IT_DATA.length).toBe(2);
  const row1 = IT_DATA.at(0);
  const row2 = IT_DATA.at(1);
  expect(Array.isArray(row1)).toBeTruthy();
  expect(Array.isArray(row2)).toBeTruthy();
  expect(row1.length).toBe(5);
  expect(row2.length).toBe(5);
});

test('response interceptor', () => {
  const responseInterceptor = createResponseInterceptor(schema);
  const result = responseInterceptor(response);
  const { ET_USERDATA } = result?.data;
  const user = ET_USERDATA.at(0);
  expect(Object.keys(result.data).length).toBe(tablesCount);
  expect(ET_USERDATA.length).toBe(usersCount);
  expect(Object.keys(user).length).toBe(columnCount);
  expect(user['UNAME']).toBe('Ivan');
});
