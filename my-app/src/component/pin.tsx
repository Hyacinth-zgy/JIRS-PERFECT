import { Rate } from 'antd';

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: Boolean,
  onCheckedChange?: (checked: Boolean) => void
}

export const Pin = ({ checked, onCheckedChange, ...restProps }: PinProps) => {
  return <Rate count={1} value={checked ? 1 : 0} onChange={num => onCheckedChange?.(!!num)} {...restProps} />
}