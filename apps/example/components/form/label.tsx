import { ReactNode } from 'react'
import tw from 'tw-tailwind'

interface LabelProps {
  children: ReactNode
}
export const Label = ({ children }: LabelProps) => (
  <Container className="text-sm font-medium" htmlFor="todo">
    {children}
  </Container>
)

const Container = tw.label`text-sm font-medium`
