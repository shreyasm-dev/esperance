abstract class OptionImplementor<T> {
  constructor(private value: T | null) {}

  private get(): T | null {
    return this.value;
  }

  public isSome(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return this instanceof OptionSome;
  }

  public isSomeAnd(predicate: (value: T) => boolean): boolean {
    return this.isSome() && predicate(this.get() as T);
  }

  public isNone(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return this instanceof OptionNone;
  }

  public expect(msg: string): T {
    if (this.isNone()) throw new Error(msg);
    return this.get() as T;
  }

  public unwrap(): T {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (this.isNone()) throw new Error(`${None}`);
    return this.get() as T;
  }

  public unwrapOr(defaultValue: T): T {
    if (this.isNone()) return defaultValue;
    return this.get() as T;
  }

  public and(option: OptionSome<T> | OptionNone): OptionSome<T> | OptionNone {
    if (this.isNone()) return this;
    if (option.isNone()) return option;
    return option;
  }

  public or(option: OptionSome<T> | OptionNone): OptionSome<T> | OptionNone {
    if (this.isSome()) return this;
    if (option.isSome()) return option;
    return option;
  }

  public contains(value: T): boolean {
    if (this.isNone()) return false;
    return this.get() === value;
  }
}

class OptionSome<T> extends OptionImplementor<T> {}
class OptionNone extends OptionImplementor<unknown> {}

export const Some = <T>(value: T): OptionSome<T> => new OptionSome(value);
export const None = new OptionNone(null);
