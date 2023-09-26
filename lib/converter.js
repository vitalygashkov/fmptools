import { parseTables, tablesDto } from './schema';

const convertRequestData = (data, schema, resource) => {
  const fieldSchemas = parseTables(schema[resource], 'input');
  const result = structuredClone(data);
  for (const field of Object.keys(data)) {
    const fieldSchema = fieldSchemas[field];
    const fieldValue = data[field];
    const isTabular = Array.isArray(fieldSchema);
    if (isTabular) {
      const fieldValueConverted = [];
      for (const entity of fieldValue) {
        fieldValueConverted.push(fieldSchema.map((columnSchema) => entity[columnSchema.name]));
      }
      result[field] = fieldValueConverted;
    } else {
      result[field] = fieldValue;
    }
  }
  return result;
};

const convertResponseData = (data, schema, resource) => {
  const tables = parseTables(schema[resource], 'output');
  return tablesDto(tables, data);
};

export { convertResponseData, convertRequestData };
