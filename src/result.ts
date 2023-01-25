abstract class ResultImplementor<T> {
  constructor(private value: T) {}

  private get(): T {
    return this.value;
  }

  public is_ok(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return this instanceof ResultOk;
  }

  public is_ok_and(predicate: (value: T) => boolean): boolean {
    return this.is_ok() && predicate(this.get());
  }

  public is_err(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return this instanceof ResultErr;
  }

  public is_err_and(predicate: (value: T) => boolean): boolean {
    return this.is_err() && predicate(this.get());
  }

  public expect(msg: string): T {
    if (this.is_err()) throw new Error(msg);
    return this.get();
  }

  public expect_err(msg: string): T {
    if (this.is_ok()) throw new Error(msg);
    return this.get();
  }

  public unwrap(): T {
    if (this.is_err()) throw new Error(`${this.get()}`);
    return this.get();
  }

  public unwrap_err(): T {
    if (this.is_ok()) throw new Error(`${this.get()}`);
    return this.get();
  }

  public unwrap_or(defaultValue: T): T {
    if (this.is_err()) return defaultValue;
    return this.get();
  }

  public and<U>(result: Result<U, T>): Result<U, T> {
    if (this.is_err()) return this;
    if (result.is_err()) return result;
    return result;
  }

  public or<U>(result: Result<T, U>): Result<T, U> {
    if (this.is_ok()) return this;
    if (result.is_ok()) return result;
    return result;
  }

  public contains(value: T): boolean {
    return this.is_ok() && this.get() === value;
  }

  public contains_err(value: T): boolean {
    return this.is_err() && this.get() === value;
  }
}

class ResultOk<T> extends ResultImplementor<T> {}
class ResultErr<T> extends ResultImplementor<T> {}

export const Ok: <T>(value: T) => ResultOk<T> = (value) => new ResultOk(value);
export const Err: <T>(value: T) => ResultErr<T> = (value) => new ResultErr(value);

export type Result<O, E> = ResultOk<O> | ResultErr<E>;
