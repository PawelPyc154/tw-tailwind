import { forwardRef, ReactNode } from 'react'
import tw from 'tw-tailwind'
import { Label } from './label'
import clsx from 'clsx'

const colors = { white: tw`bg-white `, gray: tw`bg-gray-200` }

type InputProps = JSX.IntrinsicElements['input'] & {
  label?: string
  icon?: ReactNode
  className?: string
  color?: keyof typeof colors
}
export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, className, icon, color = 'white', ...props }, ref) => (
  <Container className={className}>
    {label && <Label>{label}</Label>}
    <Wrapper>
      <InputStyled className={clsx([colors[color], !!icon && `pl-10 `])} {...props} ref={ref} />
      <IconWrapper>{icon}</IconWrapper>
    </Wrapper>
  </Container>
))

Input.displayName = 'Input'

const InputStyled = tw.input`bg-white rounded-md px-3 shadow-sm h-10 flex border border-gray-300 items-center w-full pb-px`
const Container = tw.div`text-sm w-full`
const Wrapper = tw.div`relative`
const IconWrapper = tw.div`absolute text-xl h-10 px-3 flex justify-center items-center top-0 left-0`

