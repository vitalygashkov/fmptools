import { ScalarItemType } from "./SchemaType";

export type SchemaResponseItemType = ScalarItemType;

export type SchemaResponseType = Record<string, SchemaResponseItemType[]>;
