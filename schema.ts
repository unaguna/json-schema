export type Schema =
  | ObjectSchema
  | ArraySchema
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | NullSchema;

export type Type =
  | "object"
  | "array"
  | "string"
  | "integer"
  | "number"
  | "boolean"
  | "null";

export type Properties = { [key: string]: Schema };

export type StringSchema = {
  type: Type | Type[];
};

export type NumberSchema = {
  type: Type | Type[];
  minimum?: number;
  exclusiveMinimum?: number | boolean;
};

export type ObjectSchema = {
  type: Type | Type[];
  properties?: Properties;
};

export type ArraySchema = {
  type: Type | Type[];
};

export type BooleanSchema = {
  type: Type | Type[];
};

export type NullSchema = {
  type: Type | Type[];
};

export function isNumberSchema(schema: Schema): schema is NumberSchema {
  return isSchemaOf("number", schema) || isSchemaOf("integer", schema);
}

export function isObjectSchema(schema: Schema): schema is ObjectSchema {
  return isSchemaOf("object", schema);
}

function isSchemaOf(type: Type, schema: Schema): boolean {
  return schema.type === type ||
    (Array.isArray(schema.type) && schema.type.indexOf(type) >= 0);
}
