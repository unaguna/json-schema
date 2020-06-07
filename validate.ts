import { Schema } from "./schema.ts";

import validateNumber from "./validate/validate_number.ts";
import validateObject from "./validate/validate_object.ts";

/**
 * reason of invalid
 * 
 * - `"TYPE_ERROR"` - validate 対象の型が Json で認められていない型であるか、スキーマの `type` プロパティが不正な文字列である。
 * - `"TYPE_MISMATCH"` - validate 対象の型がスキーマの `type` と一致していない。
 * 
 */
export type InvalidType = "TYPE_ERROR" | "TYPE_MISMATCH";

/**
 * validation の結果
 */
export interface ValidationResult {
  isValid: boolean;

  /** 
   * 不正なプロパティのパス
   * 
   * validation で不正とされたプロパティのパス。
   * たとえばオブジェクト `{"p0": { "p1": 1 } }` を validate して
   * `p1` の値が不正と判定された場合、この値は `["p0", "p1"]` となる。
   * 
   * `[]` は validate 対象の特定のプロパティの不正ではなく、
   * validate 対象そのものが不正であることを意味する。
   * 
   * validation で不正が検出されない場合は `undefined` となる。
   */
  invalidProperty?: Array<string | number>;

  /** 
   * reason of invalid
   * 
   * 不正と判定された理由。
   * 
   * validation で不正が検出されない場合は `undefined` となる。
   * 
   * @see InvalidType
   */
  invalidType?: InvalidType;
}

/**
 * スキーマを使用してバリデーションを行う。
 * 
 * @param value バリデーション対象の値
 * @param schema バリデーションで使用するスキーマオブジェクト
 * @param path バリデーション対象プロパティのパス。たとえばオブジェクト `{"p0": { "p1": 1 } }` をバリデーションしている最中に `p1` のバリデーションを行うために呼び出される場合は `["p0", "p1"]` となる。
 */
export default function validate(
  value: any,
  schema: Schema,
  path: Array<string | number> = [],
): ValidationResult {
  const validationResult = (function () {
    const elementType = (value === null)
      ? "null"
      : Array.isArray(value)
      ? "array"
      : typeof value;

    switch (elementType) {
      case "number":
        return validateNumber(value, schema, path);
      case "object":
        return validateObject(value, schema, path);
      default:
        return validateUnknown();
    }
  })();

  return validationResult;
}

function validateUnknown(): ValidationResult {
  return {
    isValid: false,
    invalidType: "TYPE_ERROR",
  };
}
