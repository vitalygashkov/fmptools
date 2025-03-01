type SourceType = {
  name: string;
  type: string;
  format?: string;
};

export type ScalarItemType = {
  id?: number;
  name: string;
  type?: string;
  source?: SourceType;
};

type TabularItemType = {
  id: number;
  name: string;
  columns: ScalarItemType[];
};

type SchemaItemOutputType = {
  id: number;
  name: 'output_table';
  columns?: ScalarItemType[];
};

export type SchemaType = { [key: string]: SchemaItemType };

export type SchemaItemType = {
  id: number;
  name: string;
  type: 'tabular' | 'web';
  input?: {
    scalar: ScalarItemType[];
    tabular: TabularItemType[];
  };
  output?: SchemaItemOutputType[];
  lifetime?: number;
}
