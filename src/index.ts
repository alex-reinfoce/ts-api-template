/**
 * 根据数据状态，渲染业务语义的工厂函数
 * @param initStatus 状态对象： number => 字符描述
 * @returns 字符描述 | status
 * @example
 * ```typescript
 *  const statusObject = {
 *    1: 'yes',
 *    2: 'no'
 *  } as const // 必须作为只读对象处理
 *
 *  const render = statusAdapter(statusObject);
 *
 *  render(1) // ‘yes’
 *  render(2) // ‘no’
 *  render('yes') // 1
 *  render('no') // 2
 *
 *  render('hello') // 'hello' 不存在的键值对，原样返回并反馈 warning 提示
 * ```
 */
export const statusAdapter = <T extends object>(initStatus: T) => {
  return (status: keyof T | T[keyof T]) => {
    const sourceKey = status as keyof T;
    const target = initStatus[sourceKey];

    if (target) {
      return target;
    } else {
      const reverseSourceKey = status as T[keyof T];

      for (const key in initStatus) {
        if (initStatus[key] === reverseSourceKey) {
          return +key;
        }
      }

      console.warn(`match ${status} failed`);

      return status;
    }
  };
};

/**
 * 是否为有效邮箱
 * @param email 邮箱
 * @returns Boolean
 */
export const isEmail = (email: string) => {
  const reg = new RegExp(
    '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'
  );

  return reg.test(email);
};
