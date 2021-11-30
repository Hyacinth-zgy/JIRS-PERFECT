import { useState } from "react"

interface State<D> {
  error: Error | null,
  data: D | null,
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  })
  const [retry, setRetry] = useState(() => () => { })
  const setData = (data: D) => {
    setState({
      data,
      stat: 'success',
      error: null
    })
  }
  const setError = (error: Error) => {
    setState({
      data: null,
      error,
      stat: 'error'
    })
  }
  const run = (promise: Promise<D>, runConfig?: {
    retry: () => Promise<D>
  }) => {
    if (!promise || !promise.then) {
      throw new Error('请传入promise 类型的数据')
    }
    if (runConfig?.retry) {
      setRetry(() => () => {
        run(runConfig?.retry(), runConfig)
      })
    }
    setState({
      ...state,
      stat: 'loading'
    })
    return promise.then(data => {
      setData(data);
      return data;
    }).catch(error => {
      setError(error);
      if (config.throwOnError) return Promise.reject(error);
      return error;
    })
  }

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    // 当retry被调用时，重新调用一下run发方法，让state刷新一遍
    retry,
    ...state
  }
}