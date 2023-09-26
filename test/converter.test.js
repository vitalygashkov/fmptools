import { test, expect } from 'vitest';
import { convertRequestData } from '../lib/converter';

const schema = require('./mocks/schema.json');
const scalar = require('./mocks/scalar.json');
const tabular = require('./mocks/tabular.json');

test('convert request scalar data', () => {
  const result = convertRequestData(scalar, schema, 'ZFM_USERDATA');
  expect(result).toBeDefined();
  expect(result['IV_USER_SNAME']).toBe('Ivan');
  expect(result['IV_USER_PNAME']).toBe('Seller');
  expect(result['IV_USER_NAME']).toBe('007');
  expect(result['IV_PERNR']).toBe('3000');
  expect(result['IV_ACTIVETIME']).toBe('11:11:48');
  expect(result['IV_ACTIVEDATE']).toBe('2023-09-12');
});

test('convert request tabular data', () => {
  const result = convertRequestData(tabular, schema, 'ZFM_CREATE_TASK');
  const { IT_DATA } = result;
  expect(IT_DATA.length).toBe(2);
  const row1 = IT_DATA.at(0);
  const row2 = IT_DATA.at(1);
  expect(Array.isArray(row1)).toBeTruthy();
  expect(Array.isArray(row2)).toBeTruthy();
  expect(row1.length).toBe(5);
  expect(row2.length).toBe(5);
});
