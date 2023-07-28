import { describe, it, expect } from 'vitest';
import { isEmail, statusAdapter } from '..';

describe('test statusAdapter', () => {
  it('render status', () => {
    const status = {
      1: 'yes',
      2: 'no',
    } as const;

    const render = statusAdapter(status);
    expect(render(1)).toStrictEqual('yes');
    expect(render(2)).toStrictEqual('no');
    expect(render('yes')).toStrictEqual(1);
    expect(render('no')).toStrictEqual(2);
  });

  it('render status with warning', () => {
    let consoleWarnCalled = false;
    const originalConsoleWarn = console.warn;

    console.warn = () => {
      consoleWarnCalled = true;
    };

    // 创建初始状态
    const initStatus = {
      A: 1,
      B: 2,
      C: 3,
    };

    // 创建statusAdapter实例
    const getStatus = statusAdapter(initStatus);

    // @ts-ignore
    getStatus('E');
    expect(consoleWarnCalled).toBe(true);

    console.warn = originalConsoleWarn;
  });
});

describe('test isEmail', () => {
  it('emial check', () => {
    expect(isEmail('123')).toBeFalsy();
    expect(isEmail('test@gmail.com')).toBeTruthy();
  });
});
