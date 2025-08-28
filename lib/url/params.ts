export function parseArrayParam(param: string | null | undefined): string[] {
  if (!param) return [];

  return param
    .split(",")
    .map((v) => decodeURIComponent(v))
    .filter(Boolean);
}

export function toArrayParam(values: string[]): string | null {
  if (!values?.length) return null;

  return values.map((v) => encodeURIComponent(v)).join(",");
}
