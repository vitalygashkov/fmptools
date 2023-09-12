import { test, expect } from 'vitest';
import { parseTables } from '../lib/parser';

const schema = require('./schema.json');

test('schema tables parsing', () => {
  const tables = parseTables(schema, 'ZFM_USERDATA');
  const tablesCount = 1; // ET_USERDATA
  const columnCount = 7; // UNAME, JOBNAME, PERNR, SWERK, BUKRS, ORGEH, STORT
  expect(Object.keys(tables).length).toBe(tablesCount);
  expect(tables['ET_USERDATA'].length).toBe(columnCount);
});
