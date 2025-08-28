export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export function ok<T>(value: T): Result<T> {
  return { ok: true, value } as const;
}

export function err<E = Error>(error: E): Result<never, E> {
  return { ok: false, error } as const;
}

export async function tryAsync<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    const value = await fn();

    return ok(value);
  } catch (e: any) {
    const error = e instanceof Error ? e : new Error(String(e));

    return err(error);
  }
}
