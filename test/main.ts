import { expect } from 'chai';
import { Ok, Err, Some, None } from '../src/main';

describe('Result', () => {
  it('Ok::isOk', () => {
    const result = Ok(1);
    expect(result.isOk()).to.be.true;
    expect(result.isErr()).to.be.false;
  });

  it('Err::isErr', () => {
    const result = Err(1);
    expect(result.isOk()).to.be.false;
    expect(result.isErr()).to.be.true;
  });

  it('Ok::isOkAnd', () => {
    const result = Ok(1);
    expect(result.isOkAnd((value) => value === 1)).to.be.true;
    expect(result.isOkAnd((value) => value === 2)).to.be.false;
  });

  it('Err::isErrAnd', () => {
    const result = Err(1);
    expect(result.isErrAnd((value) => value === 1)).to.be.true;
    expect(result.isErrAnd((value) => value === 2)).to.be.false;
  });

  it('Ok::expect', () => {
    const result = Ok(1);
    expect(result.expect('error')).to.be.equal(1);
  });

  it('Err::expectErr', () => {
    const result = Err(1);
    expect(() => result.expect('error')).to.throw('error');
  });

  it('Ok::unwrap', () => {
    const result = Ok(1);
    expect(result.unwrap()).to.be.equal(1);
  });

  it('Err::unwrap', () => {
    const result = Err(1);
    expect(() => result.unwrap()).to.throw('1');
  });

  it('Ok::unwrapOr', () => {
    const result = Ok(1);
    expect(result.unwrapOr(2)).to.be.equal(1);
  });

  it('Err::unwrapOr', () => {
    const result = Err(1);
    expect(result.unwrapOr(2)).to.be.equal(2);
  });

  it('Ok::and', () => {
    const result = Ok(1);
    expect(result.and(Ok(2)).unwrap()).to.be.equal(Ok(2).unwrap());
  });

  it('Err::and', () => {
    const result = Err(1);
    expect(result.and(Ok(2)).unwrapErr()).to.be.equal(Err(1).unwrapErr());
  });

  it('Ok::or', () => {
    const result = Ok(1);
    expect(result.or(Err(2)).unwrap()).to.be.equal(Ok(1).unwrap());
  });

  it('Err::or', () => {
    const result = Err(1);
    expect(result.or(Err(2)).unwrapErr()).to.be.equal(Err(2).unwrapErr());
  });

  it('Ok::contains', () => {
    const result = Ok(1);
    expect(result.contains(1)).to.be.true;
    expect(result.contains(2)).to.be.false;
  });

  it('Err::containsErr', () => {
    const result = Err(1);
    expect(result.containsErr(1)).to.be.true;
    expect(result.containsErr(2)).to.be.false;
  });
});

describe('Option', () => {
  it('Some::isSome', () => {
    const option = Some(1);
    expect(option.isSome()).to.be.true;
    expect(option.isNone()).to.be.false;
  });

  it('None::isNone', () => {
    const option = None;
    expect(option.isSome()).to.be.false;
    expect(option.isNone()).to.be.true;
  });

  it('Some::isSomeAnd', () => {
    const option = Some(1);
    expect(option.isSomeAnd((value) => value === 1)).to.be.true;
    expect(option.isSomeAnd((value) => value === 2)).to.be.false;
  });

  it('Some::expect', () => {
    const option = Some(1);
    expect(option.expect('error')).to.be.equal(1);
  });

  it('None::expect', () => {
    const option = None;
    expect(() => option.expect('error')).to.throw('error');
  });

  it('Some::unwrap', () => {
    const option = Some(1);
    expect(option.unwrap()).to.be.equal(1);
  });

  it('None::unwrap', () => {
    const option = None;
    expect(() => option.unwrap()).to.throw(`${None}`);
  });

  it('Some::unwrapOr', () => {
    const option = Some(1);
    expect(option.unwrapOr(2)).to.be.equal(1);
  });

  it('None::unwrapOr', () => {
    const option = None;
    expect(option.unwrapOr(2)).to.be.equal(2);
  });

  it('Some::and', () => {
    const option = Some(1);
    expect(option.and(Some(2)).unwrap()).to.be.equal(Some(2).unwrap());
  });

  it('None::and', () => {
    const option = None;
    expect(option.and(Some(2))).to.be.equal(None);
  });

  it('Some::or', () => {
    const option = Some(1);
    expect(option.or(Some(2)).unwrap()).to.be.equal(Some(1).unwrap());
  });

  it('None::or', () => {
    const option = None;
    expect(option.or(Some(2)).unwrap()).to.be.equal(Some(2).unwrap());
  });

  it('Some::contains', () => {
    const option = Some(1);
    expect(option.contains(1)).to.be.true;
    expect(option.contains(2)).to.be.false;
  });

  it('None::contains', () => {
    const option = None;
    expect(option.contains(1)).to.be.false;
    expect(option.contains(2)).to.be.false;
  });
});
