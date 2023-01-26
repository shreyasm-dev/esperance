abstract class ResultImplementor<T, E> {
  constructor(private value: T | E) {}

  private get(): T | E {
    return this.value;
  }

  public is_ok(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return this instanceof ResultOk;
  }

  public is_ok_and(predicate: (value: T) => boolean): boolean {
    return this.is_ok() && predicate(this.get() as T);
  }

  public is_err(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return this instanceof ResultErr;
  }

  public is_err_and(predicate: (value: E) => boolean): boolean {
    return this.is_err() && predicate(this.get() as E);
  }

  public expect(msg: string): T {
    if (this.is_err()) throw new Error(msg);
    return this.get() as T;
  }

  public expect_err(msg: string): E {
    if (this.is_ok()) throw new Error(msg);
    return this.get() as E;
  }

  public unwrap(): T {
    if (this.is_err()) throw new Error(`${this.get()}`);
    return this.get() as T;
  }

  public unwrap_err(): E {
    if (this.is_ok()) throw new Error(`${this.get()}`);
    return this.get() as E;
  }

  public unwrap_or(defaultValue: T): T {
    if (this.is_err()) return defaultValue;
    return this.get() as T;
  }

  public and(result: ResultOk<T> | ResultErr<E>): ResultOk<T> | ResultErr<E> {
    if (this.is_err()) return this;
    if (result.is_err()) return result;
    return result;
  }
  
  public or(result: ResultOk<T> | ResultErr<E>): ResultOk<T> | ResultErr<E> {
    if (this.is_ok()) return this;
    if (result.is_ok()) return result;
    return result;
  }

  public contains(value: T): boolean {
    return this.is_ok() && this.get() === value;
  }

  public contains_err(value: E): boolean {
    return this.is_err() && this.get() === value;
  }
}

class ResultOk<T> extends ResultImplementor<T, unknown> {}
class ResultErr<E> extends ResultImplementor<unknown, E> {}

export const Ok: <T>(value: T) => ResultOk<T> = (value) => new ResultOk(value);
export const Err: <E>(value: E) => ResultErr<E> = (value) => new ResultErr(value);
