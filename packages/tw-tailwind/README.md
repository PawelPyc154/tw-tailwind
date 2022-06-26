# Tw-Tailwind

A lighter version of twin.macro that allows you to create tailwind react components like styled-components

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/tw-tailwind.svg
[npm-url]: https://www.npmjs.com/package/tw-tailwind

## Install

Using [npm](http://npmjs.org/package/tw-tailwind)

```bash
npm i tw-tailwind
```

Using [yarn](https://classic.yarnpkg.com/en/package/tw-tailwind)

```bash
yarn add tw-tailwind
```

⚠️ _Tw-Tailwind requires TailwindCSS to be installed and configured on your project too. [Install TailwindCSS](https://tailwindcss.com/docs/installation)_

## Usage

### Import

```js
import tw from 'tw-tailwind'
```

### Features

```ts
const sharedClasses = tw`border-red-500`
```

```js
const Component = tw.div`flex items-center justify-center`

const Component = tw(Button)`flex items-center justify-center`
```

```ts
interface Props {
  $hasBorder: boolean
}
const Component = tw.div<Props>`
  bg-red-500 
  ${({ $hasBorder }) => $hasBorder && 'border-2 border-blue-500'}`

const Component = tw(Button)<Props>`
  bg-red-500 
  ${({ $hasBorder }) => $hasBorder && 'border-2 border-blue-500'}`
```

```ts
const Component = tw.div(() => ['bg-red-500'])

const Component = tw(Button)(() => ['bg-red-500'])
```

```ts
interface Props {
  $hasBorder: boolean
}
const Component = tw.div<Props>(({ $hasBorder }) => [
  'bg-red-500',
  $hasBorder && 'border-2 border-blue-500',
])

const Component = tw(Button)<Props>`
  bg-red-500 
  ${({ $hasBorder }) => $hasBorder && 'border-2 border-blue-500'}`
```

## Example

### Button

```js
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

export const Button = ({ children, className, type = 'button', color = 'emerald', isLoading, ...props }: ButtonProps) => (
  <ButtonStyled type={type} {...props} $color={color} $isLoading={isLoading} className={className}>
    {children}
  </ButtonStyled>
)

const ButtonStyled = tw.button<{ $color: keyof typeof colors; $isLoading?: boolean }>(({ $isLoading, $color }) => [
  `disabled:opacity-30 disabled:pointer-events-none text-white font-medium rounded-md px-4 h-10 flex items-center relative select-none`,
  colors[$color],
  $isLoading && ['pointer-events-none', loadingColors[$color]],
])
```

### Input

```js
import { forwardRef, ReactNode } from 'react'
import tw from 'tw-tailwind'
import { Label } from './label'
import clsx from 'clsx'

const colors = { white: tw`bg-white `, gray: tw`bg-gray-200` }

type InputProps = Omit<JSX.IntrinsicElements['input'], 'ref'> & {
  label?: string
  icon?: ReactNode
  className?: string
  color?: keyof typeof colors
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, icon, color = 'white', ...props }, ref) => (
    <Container className={className}>
      {label && <Label>{label}</Label>}
      <Wrapper>
        <InputStyled className={clsx([colors[color], !!icon && `pl-10 `])} {...props} ref={ref} />
        <IconWrapper>{icon}</IconWrapper>
      </Wrapper>
    </Container>
  ),
)

Input.displayName = 'Input'

const InputStyled = tw.input`bg-white rounded-md px-3 shadow-sm h-10 flex border border-gray-300 items-center w-full pb-px`
const Container = tw.div`text-sm w-full`
const Wrapper = tw.div`relative`
const IconWrapper = tw.div`absolute text-xl h-10 px-3 flex justify-center items-center top-0 left-0`
```

## VS Code IntelliSense

Install "Tailwind CSS IntelliSense" VSCode - extension for autocomplete

[https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

```js
  // vs code setting.json

  "scss.validate": false,
  "editor.quickSuggestions": {
    "strings": true
  },
  "editor.autoClosingQuotes": "always",
  "tailwindCSS.experimental.classRegex": [
    "tw`([^`]*)", // tw`...`
    "tw\\.[^`]+`([^`]*)", // tw.xxx`...`
    "tw\\(.*?\\).*?`([^`]*)", // tw(Component)`...`
    ["tw\\.[^\\)]+\\(.*=>([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"], // tw.xxx(()=> ['...'])
    ["tw\\(.*?\\)\\(.*=>([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"], // tw(Component)(()=> ['...'])
    ["tw\\(.*?\\).*?\\(.*=>([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"], // tw(Component)<...>(()=> ['...'])
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"] // clsx( ['...'])
  ],

  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
```

