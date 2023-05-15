import { describe, it, expect } from 'vitest';
import { isEmail, statusFactory } from '..';

describe('render common api', () => {
  it('render status', () => {
    const status = {
      1: 'yes',
      2: 'no',
    } as const;

    const render = statusFactory(status);
    expect(render(1)).toStrictEqual('yes');
    expect(render(2)).toStrictEqual('no');
    expect(render('yes')).toStrictEqual(1);
    expect(render('no')).toStrictEqual(2);
  });

  it('emial check', () => {
    expect(isEmail('123')).toBeFalsy();
    expect(isEmail('test@gmail.com')).toBeTruthy();
  });
});
