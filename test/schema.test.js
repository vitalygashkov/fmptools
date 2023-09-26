import { test, expect } from 'vitest';
import { parseTables } from '../lib/schema';

const schema = require('./mocks/schema.json');

const tablesCount = 1; // ET_USERDATA
const columnCount = 7; // UNAME, JOBNAME, PERNR, SWERK, BUKRS, ORGEH, STORT

test('schema tables parsing', () => {
  const tables = parseTables(schema['ZFM_USERDATA']);
  expect(Object.keys(tables).length).toBe(tablesCount);
  expect(tables['ET_USERDATA'].length).toBe(columnCount);
});
