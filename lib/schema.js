const tablesDto = (parsedTables, rawData) => {
  if (typeof rawData === 'string') {
    return {};
  }

  if (!Array.isArray(rawData)) {
    return rawData;
  }

  const data = {};
  const tableNames = Object.keys(parsedTables);
  for (let i = 0; i < tableNames.length; i++) {
    const tableName = tableNames[i];
    const tableRows = rawData?.find((d) => d.name === tableName)?.data || [];
    data[tableName] = tableRows.map((row) => {
      const rowObj = {};
      for (let colIndex = 0; colIndex < parsedTables[tableName].length; colIndex++)
        if (parsedTables[tableName][colIndex]) rowObj[parsedTables[tableName][colIndex].name] = row[colIndex];
      return rowObj;
    });
  }

  return data;
};

const parseInput = (resourceSchema) => {
  const { scalar = [], tabular = [] } = resourceSchema.input ?? {};
  const result = {};
  for (const { name, type = '' } of scalar) result[name] = type;
  for (const { name, columns = [] } of tabular) result[name] = columns;
  return result;
};

const parseTables = (resourceSchema, type = 'output') => {
  const config = resourceSchema[type] ?? [];
  const result = {};
  const fields = Array.isArray(config) ? config : [config];
  const isCached = !!resourceSchema.lifetime;
  for (const { name, columns = [], scalar = [], tabular = [] } of fields) {
    if (isCached) columns.unshift({ name: 'hhive_id' });
    if (name) {
      result[name] = columns;
    } else {
      for (const { name, type = '' } of scalar) result[name] = type;
      for (const { name, columns = [] } of tabular) result[name] = columns;
    }
  }
  return result;
};

export { parseInput, parseTables, tablesDto };
