import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "./helper";
/**
 * useSearchParams 是 react-router-dom中读取URL上参数的hook
 * 
 * useUrlQueryParam 返回页面中指定键的参数值
 */

export const useUrlQueryParam = <K extends string>(keys: Array<K>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [useMemo(() => {
    return keys.reduce((pre, key: K) => {
      return { ...pre, [key]: searchParams.get(key) || '' }
    }, {} as { [key in K]: string })
  }, [searchParams]), (params: Partial<{ [key in K]: unknown }>) => {
    const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
    return setSearchParams(o)
  }] as const;
}
/**
 * as const 返回最原始的一个对象
 */
const a = ['jact', 12, { gender: 'male' }] as const