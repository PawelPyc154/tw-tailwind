/* eslint-disable react/button-has-type */
import { Spinner } from 'components/common/spinner'
import tw from 'tw-tailwind'

const colors = {
  white: tw`bg-white hover:bg-gray-100 text-black`,
  gray: tw`bg-gray-100 hover:bg-gray-200 text-black`,
  emerald: tw`bg-emerald-600 hover:bg-emerald-700 text-white`,
}
const loadingColors: typeof colors = {
  white: tw`text-white`,
  gray: tw`text-gray-100`,
  emerald: tw`text-emerald-600`,
}

type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'ref'> & {
  color?: keyof typeof colors
  isLoading?: boolean
}

export const Button = ({ children, className, type = 'button', color = 'emerald', isLoading, ...props }: ButtonProps) => {
  return (
    <ButtonStyled type={type} {...props} color={color} isLoading={isLoading} className={className}>
      {children}
      {isLoading && <Spinner size="sm" />}
    </ButtonStyled>
  )
}

const ButtonStyled = tw.button<{ color: keyof typeof colors; isLoading?: boolean }>(({ isLoading, color }) => [
  `disabled:opacity-30 disabled:pointer-events-none text-white font-medium rounded-md px-4 h-10 flex items-center relative select-none`,
  colors[color],
  isLoading && ['pointer-events-none', loadingColors[color]],
])
