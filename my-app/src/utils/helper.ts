import { useEffect, useState } from "react";

export const isVoid = (value: unknown) => {
  return value === undefined || value === null || value === "";
};

export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isVoid(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

// debounde函数原理
// export const debounce = function (callback) {
//   let timeId;
//   return () => {
//     if (timeId) {
//       clearTimeout(timeId);
//     } else {
//       timeId = setTimeout(() => {
//         callback();
//       }, 2000);
//     }
//   };
// };

// 使用自定义hook来实现debounce 当parm变化时，返回一个最终的params
export const useDebounce = <V>(param: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(param);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(param), delay);
    // 返回一个函数会在上一个useEffect处理完成后在运行
    return () => clearTimeout(timeout);
  }, [param, delay]);
  return debounceValue;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
