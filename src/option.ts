abstract class OptionImplementor<T> {
  constructor(private value: T | null) {}

  private get(): T | null {
    return this.value;
  }

  public is_some(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return this instanceof OptionSome;
  }

  public is_some_and(predicate: (value: T) => boolean): boolean {
    return this.is_some() && predicate(this.get() as T);
  }

  public is_none(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return this instanceof OptionNone;
  }

  public expect(msg: string): T {
    if (this.is_none()) throw new Error(msg);
    return this.get() as T;
  }

  public unwrap(): T {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (this.is_none()) throw new Error(`${None}`);
    return this.get() as T;
  }

  public unwrap_or(defaultValue: T): T {
    if (this.is_none()) return defaultValue;
    return this.get() as T;
  }

  public and(option: OptionSome<T> | OptionNone): OptionSome<T> | OptionNone {
    if (this.is_none()) return this;
    if (option.is_none()) return option;
    return option;
  }

  public or(option: OptionSome<T> | OptionNone): OptionSome<T> | OptionNone {
    if (this.is_some()) return this;
    if (option.is_some()) return option;
    return option;
  }

  public contains(value: T): boolean {
    if (this.is_none()) return false;
    return this.get() === value;
  }
}

class OptionSome<T> extends OptionImplementor<T> {}
class OptionNone extends OptionImplementor<unknown> {}

export const Some = <T>(value: T): OptionSome<T> => new OptionSome(value);
export const None = new OptionNone(null);
