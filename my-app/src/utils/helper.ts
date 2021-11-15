import { useEffect, useState } from "react";

export const isVoid = (value: unknown) => {
  return value === undefined || value === null || value === "";
};


// [key: string]: unknown } 就表示需要的类型是一个键值对的对象，
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
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
// 使用泛型 V ,这时候返回的debounceValue 也会被推断为 V 类型的，这里会根据传入param的类型来推断
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
    // TODO依赖项里添加callback会造成问无限循环，这个和useCallback和useMemo有关
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};


// 实现useArr
export const useArrar = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  const add = (item: T) => {
    setValue([...value, item])
  }
  const removeIndex = (index: number) => {
    const copy = [...value];
    copy.splice(index, 1);
    setValue(copy)
  }
  const clear = () => {
    setValue([])
  }
  return {
    add,
    removeIndex,
    clear,
    value,
    setValue
  }
}