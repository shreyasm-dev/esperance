abstract class OptionImplementor<T> {
  constructor(private value: T) {}

  private get(): T {
    return this.value;
  }

  public is_some(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return this instanceof OptionSome;
  }

  public is_some_and(predicate: (value: T) => boolean): boolean {
    return this.is_some() && predicate(this.get());
  }

  public is_none(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return this instanceof OptionNone;
  }

  public is_none_and(predicate: (value: T) => boolean): boolean {
    return this.is_none() && predicate(this.get());
  }

  public expect(msg: string): T {
    if (this.is_none()) throw new Error(msg);
    return this.get();
  }

  public expect_none(msg: string): T {
    if (this.is_some()) throw new Error(msg);
    return this.get();
  }

  public unwrap(): T {
    if (this.is_none()) throw new Error(`${this.get()}`);
    return this.get();
  }

  public unwrap_none(): T {
    if (this.is_some()) throw new Error(`${this.get()}`);
    return this.get();
  }

  public unwrap_or(defaultValue: T): T {
    if (this.is_none()) return defaultValue;
    return this.get();
  }

  public and<U>(option: Option<U, T>): Option<U, T> {
    if (this.is_none()) return this;
    if (option.is_none()) return option;
    return option;
  }

  public or<U>(option: Option<T, U>): Option<T, U> {
    if (this.is_some()) return this;
    if (option.is_some()) return option;
    return option;
  }

  public contains(value: T): boolean {
    return this.is_some() && this.get() === value;
  }

  public contains_and(predicate: (value: T) => boolean): boolean {
    return this.is_some() && predicate(this.get());
  }
}

class OptionSome<T> extends OptionImplementor<T> {}
class OptionNone<T> extends OptionImplementor<T> {}

export const Some = <T>(value: T): Option<T, never> => new OptionSome(value);
export const None = (): Option<never, null> => new OptionNone(null);

export type Option<T, U> = OptionSome<T> | OptionNone<U>;
