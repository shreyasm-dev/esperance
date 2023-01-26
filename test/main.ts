import { expect } from 'chai';
import { Ok, Err, Some, None } from '../src/main';

describe('Result', () => {
  it('Ok::is_ok', () => {
    const result = Ok(1);
    expect(result.is_ok()).to.be.true;
    expect(result.is_err()).to.be.false;
  });

  it('Err::is_err', () => {
    const result = Err(1);
    expect(result.is_ok()).to.be.false;
    expect(result.is_err()).to.be.true;
  });

  it('Ok::is_ok_and', () => {
    const result = Ok(1);
    expect(result.is_ok_and((value) => value === 1)).to.be.true;
    expect(result.is_ok_and((value) => value === 2)).to.be.false;
  });

  it('Err::is_err_and', () => {
    const result = Err(1);
    expect(result.is_err_and((value) => value === 1)).to.be.true;
    expect(result.is_err_and((value) => value === 2)).to.be.false;
  });

  it('Ok::expect', () => {
    const result = Ok(1);
    expect(result.expect('error')).to.be.equal(1);
  });

  it('Err::expect_err', () => {
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

  it('Ok::unwrap_or', () => {
    const result = Ok(1);
    expect(result.unwrap_or(2)).to.be.equal(1);
  });

  it('Err::unwrap_or', () => {
    const result = Err(1);
    expect(result.unwrap_or(2)).to.be.equal(2);
  });

  it('Ok::and', () => {
    const result = Ok(1);
    expect(result.and(Ok(2)).unwrap()).to.be.equal(Ok(2).unwrap());
  });

  it('Err::and', () => {
    const result = Err(1);
    expect(result.and(Ok(2)).unwrap_err()).to.be.equal(Err(1).unwrap_err());
  });

  it('Ok::or', () => {
    const result = Ok(1);
    expect(result.or(Err(2)).unwrap()).to.be.equal(Ok(1).unwrap());
  });

  it('Err::or', () => {
    const result = Err(1);
    expect(result.or(Err(2)).unwrap_err()).to.be.equal(Err(2).unwrap_err());
  });

  it('Ok::contains', () => {
    const result = Ok(1);
    expect(result.contains(1)).to.be.true;
    expect(result.contains(2)).to.be.false;
  });

  it('Err::contains_err', () => {
    const result = Err(1);
    expect(result.contains_err(1)).to.be.true;
    expect(result.contains_err(2)).to.be.false;
  });
});

describe('Option', () => {
  it('Some::is_some', () => {
    const option = Some(1);
    expect(option.is_some()).to.be.true;
    expect(option.is_none()).to.be.false;
  });

  it('None::is_none', () => {
    const option = None;
    expect(option.is_some()).to.be.false;
    expect(option.is_none()).to.be.true;
  });

  it('Some::is_some_and', () => {
    const option = Some(1);
    expect(option.is_some_and((value) => value === 1)).to.be.true;
    expect(option.is_some_and((value) => value === 2)).to.be.false;
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

  it('Some::unwrap_or', () => {
    const option = Some(1);
    expect(option.unwrap_or(2)).to.be.equal(1);
  });

  it('None::unwrap_or', () => {
    const option = None;
    expect(option.unwrap_or(2)).to.be.equal(2);
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
