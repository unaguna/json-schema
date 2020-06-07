import { Schema, isNumberSchema, NumberSchema } from "../schema.ts";
import { ValidationResult } from "../validate.ts";

export default function validateNumber(
  element: number,
  schema: Schema,
  path: Array<string | number>,
): ValidationResult {
  // check type
  if (isNumberSchema(schema)) {
    return validateMain(element, schema, path);
  } else {
    // Fails when schema.type contains neither "number" nor "integer".
    return {
      isValid: false,
      invalidProperty: path,
      invalidType: "TYPE_MISMATCH",
    };
  }
}

function validateMain(
  element: number,
  schema: NumberSchema,
  path: Array<string | number>,
): ValidationResult {
  // 最小値判定
  if (!validateMinimum(element, schema)) {
    return {
      isValid: false,
      invalidProperty: path,
      invalidType: "NUMBER_OUT_OF_RANGE",
    };
  }

  // element is valid when passes checklist.
  return {
    isValid: true,
  };
}

/**
 * 最小値以上の値かどうか判定する。
 * 
 * @param element 判定対象
 * @param schema 判定に使用するスキーマ
 * @return 正しければ true、不正なら false。
 */
function validateMinimum(element: number, schema: NumberSchema): boolean {
  // schema.mimimum に指定があるなら判定する
  if (schema.minimum !== undefined) {
    // schema.exclusiveMinimum が true なら「以上」ではなく「超」を要する。
    const exclude = typeof schema.exclusiveMinimum === "boolean"
      ? schema.exclusiveMinimum
      : false;

    // 不正なら判定終了
    if (element < schema.minimum || exclude && element <= schema.minimum) {
      return false;
    }
  }

  // schema.exclusiveMinimum が数値なら判定する
  if (typeof schema.exclusiveMinimum === "number") {
    // 不正なら判定終了
    if (element <= schema.exclusiveMinimum) {
      return false;
    }
  }

  // ここまで不正がないなら、正しい。
  return true;
}
