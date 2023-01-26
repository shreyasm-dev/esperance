abstract class ResultImplementor<T, E> {
  constructor(private value: T | E) {}

  private get(): T | E {
    return this.value;
  }

  public isOk(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return this instanceof ResultOk;
  }

  public isOkAnd(predicate: (value: T) => boolean): boolean {
    return this.isOk() && predicate(this.get() as T);
  }

  public isErr(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return this instanceof ResultErr;
  }

  public isErrAnd(predicate: (value: E) => boolean): boolean {
    return this.isErr() && predicate(this.get() as E);
  }

  public expect(msg: string): T {
    if (this.isErr()) throw new Error(msg);
    return this.get() as T;
  }

  public expectErr(msg: string): E {
    if (this.isOk()) throw new Error(msg);
    return this.get() as E;
  }

  public unwrap(): T {
    if (this.isErr()) throw new Error(`${this.get()}`);
    return this.get() as T;
  }

  public unwrapErr(): E {
    if (this.isOk()) throw new Error(`${this.get()}`);
    return this.get() as E;
  }

  public unwrapOr(defaultValue: T): T {
    if (this.isErr()) return defaultValue;
    return this.get() as T;
  }

  public and(result: ResultOk<T> | ResultErr<E>): ResultOk<T> | ResultErr<E> {
    if (this.isErr()) return this;
    if (result.isErr()) return result;
    return result;
  }
  
  public or(result: ResultOk<T> | ResultErr<E>): ResultOk<T> | ResultErr<E> {
    if (this.isOk()) return this;
    if (result.isOk()) return result;
    return result;
  }

  public contains(value: T): boolean {
    return this.isOk() && this.get() === value;
  }

  public containsErr(value: E): boolean {
    return this.isErr() && this.get() === value;
  }
}

class ResultOk<T> extends ResultImplementor<T, unknown> {}
class ResultErr<E> extends ResultImplementor<unknown, E> {}

export const Ok: <T>(value: T) => ResultOk<T> = (value) => new ResultOk(value);
export const Err: <E>(value: E) => ResultErr<E> = (value) => new ResultErr(value);
