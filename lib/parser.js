export const tablesDto = (parsedTables, rawData) => {
  if (typeof rawData === 'string') {
    return {};
  }

  const data = {};
  const tableNames = Object.keys(parsedTables);
  for (let i = 0; i < tableNames.length; i++) {
    const tableName = tableNames[i];
    const tableRows = rawData?.find((d) => d.name === tableName)?.data || [];
    data[tableName] = tableRows.map((row) => {
      const rowObj = {};
      for (let colIndex = 0; colIndex < parsedTables[tableName].length; colIndex++)
        if (parsedTables[tableName][colIndex])
          rowObj[parsedTables[tableName][colIndex].name] = row[colIndex];
      return rowObj;
    });
  }

  return data;
};

export const parseTables = (schema, resource) => {
  const resourceSchema = schema[resource];
  const { output = [], lifetime = '' } = resourceSchema;

  const responseSchema = {};
  for (let i = 0; i < output.length; i++) {
    const { name, columns = [] } = output[i];
    const isCached = lifetime.length > 0;
    responseSchema[name] = isCached ? [{ name: 'hhive_id' }, ...columns] : columns;
  }

  return responseSchema;
};

export const parseResponse = (data, schema, resource) => {
  const tables = parseTables(schema, resource);
  return tablesDto(tables, data);
};
