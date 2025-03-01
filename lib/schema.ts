import {ScalarItemType, SchemaItemType} from '../types/SchemaType';
import {Primitive, PrimitiveRecord, RequestDataType, SchemaRawDataType} from '../types/SchemaRawDataType';
import {SchemaResponseType} from '../types/SchemaResponseType';

const tablesDto = <T>(parsedTables: SchemaResponseType, rawData: SchemaRawDataType[]): T => {
  if (!Array.isArray(rawData)) return rawData;

  const result: RequestDataType = {} as RequestDataType;
  const keys = Object.keys(parsedTables);

  for (let i = 0; i < keys.length; i++) {
    const tableKey = keys[i];
    const dataByKey: Primitive[][] = rawData?.find((d) => d.name === tableKey)?.data || [];

    result[tableKey] = dataByKey.map((row) => {
      const rowObj: PrimitiveRecord = {} as PrimitiveRecord;

      for (let colIndex = 0; colIndex < parsedTables[tableKey].length; colIndex++) {
        if (parsedTables[tableKey][colIndex]) {
          rowObj[parsedTables[tableKey][colIndex].name] = row[colIndex];
        }
      }

      return rowObj;
    });
  }

  return result as T;
};

const parseInput = (resourceSchema: SchemaItemType) => {
  const { scalar = [], tabular = [] } = resourceSchema.input ?? {};
  const result: Record<string, string | ScalarItemType[]> = {};

  for (const { name, type = '' } of scalar) result[name] = type;
  for (const { name, columns = [] } of tabular) result[name] = columns;

  return result;
};

const ID_COLUMN_NAME = 'hhive_id';

const parseOutput = (resourceSchema: SchemaItemType) => {
  const config = resourceSchema.output ?? [];
  const result: SchemaResponseType = {};
  const fields = Array.isArray(config) ? config : [config];
  const isCached = !!resourceSchema.lifetime;
  for (const {name, columns = []} of fields) {
    const hasId = columns.find((column) => column.name === ID_COLUMN_NAME);
    if (isCached && !hasId) columns.unshift({ name: ID_COLUMN_NAME });
    if (name) {
      result[name] = columns;
    }
  }
  return result;
};

export { parseInput, parseOutput, tablesDto };
