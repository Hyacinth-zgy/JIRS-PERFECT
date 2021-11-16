import styled from "@emotion/styled";
import { Spin, Typography } from "antd";

// Row 为自定义样式组件，可接收传入的props作为参数
export const Row = styled.div<{
  gap?: number | boolean,
  between?: boolean,
  marginBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.between ? 'space-between' : undefined)};
  margin-bottom: ${props => props.marginBottom + 'rem'};
  > * {
    margin-top: 0!important;
    margin-bottom: 0!important;
    margin-right:  ${(props) =>
    typeof props.gap === "number" ? props.gap + "rem" : props.gap ? "2rem" : undefined};
  }
`

export const FullPageLoading = () => {
  return <FullPage>
    <Spin size={'large'}></Spin>
  </FullPage>
}

const FullPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`


export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
  return <FullPage>
    <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
  </FullPage>
}