/* eslint-disable react/button-has-type */
import React from 'react'
import tw from 'tw-tailwind'

const colors = {
  white: tw`bg-white hover:bg-gray-100`,
  gray: tw`bg-gray-100 hover:bg-gray-200`,
  emerald: tw`bg-emerald-600 hover:bg-emerald-700 text-white`,
  red: tw`bg-red-600 hover:bg-red-700 text-white`,
}
const sizes = {
  base: tw`h-10 w-10`,
  md: tw`h-9 w-9`,
}

type IconButtonProps = Pick<JSX.IntrinsicElements['button'], 'children' | 'type' | 'onClick'> & {
  color?: keyof typeof colors
  size?: keyof typeof sizes
  className?: string
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, type = 'button', size = 'base', color = 'white', ...props }, ref) => (
    <Button ref={ref} type={type} color={color} size={size} className={className} {...props}>
      {children}
    </Button>
  ),
)
IconButton.displayName = 'IconButton'

interface ButtonProps {
  color: keyof typeof colors
  size: keyof typeof sizes
}
const Button = tw.button<ButtonProps>`
rounded-md transition-colors flex items-center justify-center flex-shrink-0 
${({ color }) => colors[color]}
${({ size }) => sizes[size]}
`
