import { parseInput, parseOutput, tablesDto } from "./schema";
import { SchemaType } from "../types/SchemaType";
import {
  Primitive,
  PrimitiveRecord,
  SchemaRawDataType,
} from "../types/SchemaRawDataType";
import { SchemaResponseType } from "../types/SchemaResponseType";

type DataStructure<T = PrimitiveRecord> = Record<string, T[]>;

const convertRequestData = <T>(
  data: DataStructure,
  schema: SchemaType,
  resource: string,
): T => {
  const fieldSchemas = parseInput(schema[resource]);
  const result = {} as unknown as Record<
    string,
    PrimitiveRecord[] | Primitive[][]
  >;
  const keys = Object.keys(data);

  for (const key of keys) {
    const fieldSchema = fieldSchemas[key];
    const fieldValue = data[key];
    const isTabular = Array.isArray(fieldSchema);
    if (isTabular) {
      const fieldValueConverted: Primitive[][] = [];
      for (const entity of fieldValue) {
        fieldValueConverted.push(fieldSchema.map((columnSchema) => entity[columnSchema.name]));
      }
      result[key] = fieldValueConverted;
    } else {
      result[key] = fieldValue;
    }
  }
  return result as T;
};

const convertResponseData = <T>(
  data: SchemaRawDataType[],
  schema: SchemaType,
  resource: string,
): T => {
  const tables: SchemaResponseType = parseOutput(schema[resource]);

  return tablesDto(tables, data);
};

export { convertResponseData, convertRequestData };
