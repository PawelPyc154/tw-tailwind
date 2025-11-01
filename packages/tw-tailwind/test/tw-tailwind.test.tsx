import '@testing-library/jest-dom'
import { within } from '@testing-library/dom'
import { render } from '@testing-library/react'
import React, { act, useEffect, useRef } from 'react'
import tw from '../src'

interface ClassNameProps {
  className?: string
  'data-testid': string
}

const ClassName = ({ className, ...props }: ClassNameProps) => (
  <input className={className} {...props} />
)

const screen = {
  getByTestId: (id: string) => document.querySelector(`[data-testid="${id}"]`) as HTMLElement,
  debug: () => console.log(document.body.innerHTML),
}

describe('tw', () => {
  it('should render component with className', () => {
    const Component1 = tw.span`bg-red-600`
    const Component2 = tw(Component1)`bg-red-600`
    const Component3 = tw(ClassName)`bg-red-600`
    const Component4 = tw.span(() => [`bg-red-600`])
    const Component5 = tw(Component1)(() => [`bg-red-600`])
    const Component6 = tw(ClassName)(() => [`bg-red-600`])
    const { container } = render(
      <>
        <Component1 data-testid="Component-1" className="text-red-300" />
        <Component2 data-testid="Component-2" className="text-red-300" />
        <Component3 data-testid="Component-3" className="text-red-300" />
        <Component4 data-testid="Component-4" className="text-red-300" />
        <Component5 data-testid="Component-5" className="text-red-300" />
        <Component6 data-testid="Component-6" className="text-red-300" />
      </>,
    )
    expect(within(container).getByTestId('Component-1')).toHaveClass('bg-red-600 text-red-300')
    expect(within(container).getByTestId('Component-2')).toHaveClass('bg-red-600 text-red-300')
    expect(within(container).getByTestId('Component-3')).toHaveClass('bg-red-600 text-red-300')
    expect(within(container).getByTestId('Component-4')).toHaveClass('bg-red-600 text-red-300')
    expect(within(container).getByTestId('Component-5')).toHaveClass('bg-red-600 text-red-300')
    expect(within(container).getByTestId('Component-6')).toHaveClass('bg-red-600 text-red-300')
  })

  it('should render component with props attributes and className', () => {
    interface Props {
      disabled: boolean
    }
    const Component1 = tw.input<Props>`bg-red-600 
    ${({ disabled }) => (disabled ? 'border border-red-500' : '')}`
    const Component2 = tw(Component1)<Props>`bg-red-600 
    ${({ disabled }) => (disabled ? 'border border-red-500' : '')}`
    const Component3 = tw(ClassName)<Props>`bg-red-600 
    ${({ disabled }) => (disabled ? 'border border-red-500' : '')}`
    const Component4 = tw.span<Props>(({ disabled }) => [
      `bg-red-600`,
      disabled ? 'border border-red-500' : '',
    ])
    const Component5 = tw(Component1)<Props>(({ disabled }) => [
      `bg-red-600`,
      disabled ? 'border border-red-500' : '',
    ])
    const Component6 = tw(ClassName)<Props>(({ disabled }) => [
      `bg-red-600`,
      disabled ? 'border border-red-500' : '',
    ])

    const { container } = render(
      <>
        <Component1 disabled data-testid="Component-1" className="text-red-300" />
        <Component2 disabled data-testid="Component-2" className="text-red-300" />
        <Component3 disabled data-testid="Component-3" className="text-red-300" />
        <Component4 disabled data-testid="Component-4" className="text-red-300" />
        <Component5 disabled data-testid="Component-5" className="text-red-300" />
        <Component6 disabled data-testid="Component-6" className="text-red-300" />
      </>,
    )

    expect(within(container).getByTestId('Component-1')).toHaveClass(
      'bg-red-600 border border-red-500 text-red-300',
    )
    expect(within(container).getByTestId('Component-2')).toHaveClass(
      'bg-red-600 border border-red-500 text-red-300',
    )
    expect(within(container).getByTestId('Component-3')).toHaveClass(
      'bg-red-600 border border-red-500 text-red-300',
    )
    expect(within(container).getByTestId('Component-4')).toHaveClass(
      'bg-red-600 border border-red-500 text-red-300',
    )
    expect(within(container).getByTestId('Component-5')).toHaveClass(
      'bg-red-600 border border-red-500 text-red-300',
    )
    expect(within(container).getByTestId('Component-6')).toHaveClass(
      'bg-red-600 border border-red-500 text-red-300',
    )
    expect(within(container).getByTestId('Component-1')).toHaveAttribute('disabled')
    expect(within(container).getByTestId('Component-2')).toHaveAttribute('disabled')
    expect(within(container).getByTestId('Component-3')).toHaveAttribute('disabled')
    expect(within(container).getByTestId('Component-4')).toHaveAttribute('disabled')
    expect(within(container).getByTestId('Component-5')).toHaveAttribute('disabled')
    expect(within(container).getByTestId('Component-6')).toHaveAttribute('disabled')
  })

  it('should render component without props attributes and className', () => {
    interface Props {
      $disabled: boolean
    }
    const Component1 = tw.input<Props>`bg-red-600 ${({ $disabled }) =>
      $disabled ? 'border border-red-500' : ''}`
    const Component2 = tw(Component1)<Props>`bg-red-600 ${({ $disabled }) =>
      $disabled ? 'border border-red-500' : ''}`
    const Component3 = tw(ClassName)<Props>`bg-red-600 ${({ $disabled }) =>
      $disabled ? 'border border-red-500' : ''}`
    const Component4 = tw.span<Props>(({ $disabled }) => [
      `bg-red-600`,
      $disabled ? 'border border-red-500' : '',
    ])
    const Component5 = tw(Component1)<Props>(({ $disabled }) => [
      `bg-red-600`,
      $disabled ? 'border border-red-500' : '',
    ])
    const Component6 = tw(ClassName)<Props>(({ $disabled }) => [
      `bg-red-600`,
      $disabled ? 'border border-red-500' : '',
    ])

    const { container } = render(
      <>
        <Component1 $disabled data-testid="Component-1" className="text-red-300" />
        <Component2 $disabled data-testid="Component-2" className="text-red-300" />
        <Component3 $disabled data-testid="Component-3" className="text-red-300" />
        <Component4 $disabled data-testid="Component-4" className="text-red-300" />
        <Component5 $disabled data-testid="Component-5" className="text-red-300" />
        <Component6 $disabled data-testid="Component-6" className="text-red-300" />
      </>,
    )

    expect(within(container).getByTestId('Component-1')).not.toHaveAttribute('$disabled')
    expect(within(container).getByTestId('Component-2')).not.toHaveAttribute('$disabled')
    expect(within(container).getByTestId('Component-3')).not.toHaveAttribute('$disabled')
    expect(within(container).getByTestId('Component-4')).not.toHaveAttribute('$disabled')
    expect(within(container).getByTestId('Component-5')).not.toHaveAttribute('$disabled')
    expect(within(container).getByTestId('Component-6')).not.toHaveAttribute('$disabled')
  })

  it('should render component className by string', () => {
    const Component1 = tw.input`bg-red-600 ${'border-red-600'}`
    const Component2 = tw(Component1)`bg-red-600 ${'border-red-600'}`
    const Component3 = tw(ClassName)`bg-red-600 ${'border-red-600'}`

    const { container } = render(
      <>
        <Component1 data-testid="Component-1" className="text-red-300" />
        <Component2 data-testid="Component-2" className="text-red-300" />
        <Component3 data-testid="Component-3" className="text-red-300" />
      </>,
    )

    expect(within(container).getByTestId('Component-1')).toHaveClass(
      'bg-red-600 border-red-600 text-red-300',
    )
    expect(within(container).getByTestId('Component-2')).toHaveClass(
      'bg-red-600 border-red-600 text-red-300',
    )
    expect(within(container).getByTestId('Component-3')).toHaveClass(
      'bg-red-600 border-red-600 text-red-300',
    )
  })

  it('should ignore falsy value', () => {
    const Component1 = tw.span`${null} ${undefined} ${false}`
    const Component2 = tw(Component1)`${null} ${undefined} ${false}`
    const Component3 = tw(ClassName)`${null} ${undefined} ${false}`
    const Component4 = tw.span(() => [null, undefined, false])
    const Component5 = tw(Component1)(() => [null, undefined, false])
    const Component6 = tw(ClassName)(() => [null, undefined, false])
    const { container } = render(
      <>
        <Component1 data-testid="Component-1" />
        <Component2 data-testid="Component-2" />
        <Component3 data-testid="Component-3" />
        <Component4 data-testid="Component-4" />
        <Component5 data-testid="Component-5" />
        <Component6 data-testid="Component-6" />
      </>,
    )
    screen.debug()

    expect(within(container).getByTestId('Component-1')).not.toHaveClass('null undefined false')
    expect(within(container).getByTestId('Component-2')).not.toHaveClass('null undefined false')
    expect(within(container).getByTestId('Component-3')).not.toHaveClass('null undefined false')
    expect(within(container).getByTestId('Component-4')).not.toHaveClass('null undefined false')
    expect(within(container).getByTestId('Component-5')).not.toHaveClass('null undefined false')
    expect(within(container).getByTestId('Component-6')).not.toHaveClass('null undefined false')
  })

  it('should override class', () => {
    const Component1 = tw.span`bg-red-200`
    const Component2 = tw(Component1)`bg-red-200`
    const Component3 = tw(Component1)`bg-pink-400`
    const Component4 = tw.span(() => ['bg-red-200'])
    const Component5 = tw(Component1)(() => ['bg-red-200'])
    const Component6 = tw(Component1)(() => [`bg-pink-400`])
    const { container } = render(
      <>
        <Component1 data-testid="Component-1" className="bg-blue-200" />
        <Component2 data-testid="Component-2" className="bg-blue-200" />
        <Component3 data-testid="Component-3" />
        <Component4 data-testid="Component-4" className="bg-blue-200" />
        <Component5 data-testid="Component-5" className="bg-blue-200" />
        <Component6 data-testid="Component-6" />
      </>,
    )
    screen.debug()

    expect(within(container).getByTestId('Component-1')).toHaveClass('bg-blue-200')
    expect(within(container).getByTestId('Component-1')).not.toHaveClass('bg-red-200')
    expect(within(container).getByTestId('Component-2')).toHaveClass('bg-blue-200')
    expect(within(container).getByTestId('Component-2')).not.toHaveClass('bg-red-200')
    expect(within(container).getByTestId('Component-3')).toHaveClass('bg-pink-400')
    expect(within(container).getByTestId('Component-3')).not.toHaveClass('bg-red-200')
    expect(within(container).getByTestId('Component-4')).toHaveClass('bg-blue-200')
    expect(within(container).getByTestId('Component-4')).not.toHaveClass('bg-red-200')
    expect(within(container).getByTestId('Component-5')).toHaveClass('bg-blue-200')
    expect(within(container).getByTestId('Component-5')).not.toHaveClass('bg-red-200')
    expect(within(container).getByTestId('Component-6')).toHaveClass('bg-pink-400')
    expect(within(container).getByTestId('Component-6')).not.toHaveClass('bg-red-200')
  })

  it('should have a proper displayName', () => {
    const Div = tw.div`bg-gray-400`
    const A = tw.a`bg-gray-400`
    const Nav = tw.nav`bg-gray-400`
    const H1 = tw.h1`bg-gray-400`

    const TestComponent = () => <></>

    const TwTestComponent = tw(TestComponent)``

    expect(Div.displayName).toBe('tw.div')
    expect(A.displayName).toBe('tw.a')
    expect(Nav.displayName).toBe('tw.nav')
    expect(H1.displayName).toBe('tw.h1')
    expect(TwTestComponent.displayName).toBe('tw.TestComponent')
  })

  it('passes ref', async () => {
    const Div = tw.div`bg-gray-400`
    let r: any = null
    const HasRef = () => {
      const ref = useRef<HTMLDivElement>(null)
      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
      useEffect(() => {
        r = ref
      }, [ref])
      return (
        <Div data-testid="mydiv" ref={ref}>
          ref
        </Div>
      )
    }
    render(<HasRef />)
    await act(async () => {
      expect(r).not.toBeNull()
      expect(r.current).not.toBeNull()
      expect(r.current.localName).toBe('div')
    })
  })
})
