export type Primitive = number | string | boolean;
export type PrimitiveRecord = Record<string, Primitive>;
export type RequestDataType = Record<string, Primitive | PrimitiveRecord | PrimitiveRecord[]>;

export type SchemaRawDataType = {
  data: Primitive[][],
  name: string;
}
