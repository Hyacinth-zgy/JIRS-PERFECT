import { error } from "console";
import React from "react";

// react-error-boundary 错误边界库

type FallbackRender = (props: { error: Error | null }) => React.ReactElement
// export class ErrorBoundary extends React.Component<{ children: ReactNode, fallbackRender: FallbackRender }, any>{
// }

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallbackRender: FallbackRender }>, { error: Error | null }>{
  state = { error: null }
  // 当子组件抛出异常，这里会被调用，并且接受到
  static getDerivedStateFromError(error: Error | null) {
    // 返回的state会更新定义的state error
    return { error }
  }


  render() {

    const { error } = this.state;
    console.log(error)
    const { fallbackRender, children } = this.props;
    // 主要逻辑在于当出现错误后渲染错误的UI
    if (error) {
      return fallbackRender({ error })
    }
    // 没有错误正常显示子组件
    return children
  }
}

