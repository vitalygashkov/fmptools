import { test, expect } from 'vitest';
import {parseInput, parseOutput, tablesDto} from '../lib/schema';

const schema = require('./mocks/schema.json');
const response = require('./mocks/response.json');
const schemaUserSettings = require('./mocks/schemaUserSettings.json');

const tablesCount = 1; // ET_USERDATA
const columnCount = 7; // UNAME, JOBNAME, PERNR, SWERK, BUKRS, ORGEH, STORT

test('schema parseOutput', () => {
  const tables = parseOutput(schema['ZFM_USERDATA']);
  expect(Object.keys(tables).length).toBe(tablesCount);
  expect(tables['ET_USERDATA'].length).toBe(columnCount);
});

test('schema tablesDto', () => {
  const tables = parseOutput(schema['ZFM_USERDATA']);
  const dto: Record<string, Record<string, string>[]> = tablesDto(tables, response.data);

  expect(dto).toBeDefined();
  expect(dto.ET_USERDATA.length).toBe(1);
  expect(dto.ET_USERDATA[0]['JOBNAME']).toBe('Seller');
})

test('schema parseInput', () => {
  const input = parseInput(schemaUserSettings['USER_SETTINGS']);

  expect(input).toBeDefined();
  expect(Object.keys(input).length).toBe(1);
  expect(input['@in_User']).toBeDefined();
})

