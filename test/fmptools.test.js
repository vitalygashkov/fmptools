import { test, expect } from 'vitest';
import { parseTables } from '../lib/parser';
import { createInterceptor } from '../lib/interceptor';

const schema = require('./schema.json');
const response = require('./response.json');

const tablesCount = 1; // ET_USERDATA
const usersCount = 1;
const columnCount = 7; // UNAME, JOBNAME, PERNR, SWERK, BUKRS, ORGEH, STORT

test('response interceptor', () => {
  const responseInterceptor = createInterceptor(schema);
  const result = responseInterceptor(response);
  const user = result.data['ET_USERDATA'].at(0);
  expect(Object.keys(result.data).length).toBe(tablesCount);
  expect(result.data['ET_USERDATA'].length).toBe(usersCount);
  expect(Object.keys(user).length).toBe(columnCount);
  expect(user['UNAME']).toBe('Ivan');
});

test('schema tables parsing', () => {
  const tables = parseTables(schema, 'ZFM_USERDATA');
  expect(Object.keys(tables).length).toBe(tablesCount);
  expect(tables['ET_USERDATA'].length).toBe(columnCount);
});
