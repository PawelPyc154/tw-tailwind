import clsx, { type ClassValue } from 'clsx'
// biome-ignore lint/style/useImportType: null
import React from 'react'
import type { ComponentType, PropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'
import type { ObjectWithoutPrefixDollar } from '../types/objectWithoutPrefixDollar'
import { cleanTemplate } from './cleanTemplate'
import { mergeArrays } from './mergeArrays'

declare global {
  export interface ArrayConstructor {
    isArray(arg: ReadonlyArray<unknown> | unknown): arg is ReadonlyArray<unknown>
  }
}

type TemplateElementsReturn = string | boolean | undefined | null

export function componentFactory<
  TComponentProps extends {
    className?: string
  },
>(
  Element: ComponentType<PropsWithoutRef<TComponentProps>>,
): <TTWProps extends {}>(
  template:
    | TemplateStringsArray
    | ((props: PropsWithoutRef<TComponentProps> & TTWProps) => string | ClassValue[]),
  ...templateElements: (
    | ((props: PropsWithoutRef<TComponentProps> & TTWProps) => TemplateElementsReturn)
    | TemplateElementsReturn
  )[]
) => React.ComponentType<PropsWithoutRef<TComponentProps> & TTWProps>

export function componentFactory(Element: ReadonlyArray<string>): string

export function componentFactory<TComponentProps extends { className?: string }>(
  Element: ComponentType<PropsWithoutRef<TComponentProps>> | ReadonlyArray<string>,
):
  | string
  | (<TTWProps extends {}>(
      template:
        | TemplateStringsArray
        | ((props: PropsWithoutRef<TComponentProps> & TTWProps) => string | ClassValue[]),
      ...templateElements: (
        | ((props: PropsWithoutRef<TComponentProps> & TTWProps) => TemplateElementsReturn)
        | TemplateElementsReturn
      )[]
    ) => React.ComponentType<PropsWithoutRef<TComponentProps> & TTWProps>) {
  if (Array.isArray(Element)) {
    return twMerge(Element[0])
  }

  return <TTWProps extends {}>(
    template:
      | TemplateStringsArray
      | ((props: PropsWithoutRef<TComponentProps> & TTWProps) => string | ClassValue[]),
    ...templateElements: (
      | ((props: PropsWithoutRef<TComponentProps> & TTWProps) => TemplateElementsReturn)
      | TemplateElementsReturn
    )[]
  ) => {
    const Component = (props: PropsWithoutRef<TComponentProps> & TTWProps) => {
      const filteredProps = Object.fromEntries(
        Object.entries(props).filter(([key]) => key.charAt(0) !== '$'),
      ) as PropsWithoutRef<TComponentProps> & ObjectWithoutPrefixDollar<TTWProps>

      return (
        <Element
          {...filteredProps}
          className={
            typeof template === 'function'
              ? twMerge(clsx(template(props), props.className))
              : cleanTemplate(
                  mergeArrays(
                    template,
                    templateElements.map((t) => (typeof t === 'function' ? t(props) : t)),
                  ),
                  props.className,
                )
          }
        />
      )
    }
    Component.displayName = `tw.${Element.displayName || Element.name}`
    return Component
  }
}
