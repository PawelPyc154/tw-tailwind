/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
import clsx, { ClassValue } from 'clsx'
import { ComponentType, PropsWithoutRef, RefAttributes, forwardRef } from 'react'
import { cleanTemplate } from './cleanTemplate'
import { mergeArrays } from './mergeArrays'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { ObjectWithoutPrefixDollar } from '../types/objectWithoutPrefixDollar'

declare global {
  export interface ArrayConstructor {
    isArray(arg: ReadonlyArray<any> | any): arg is ReadonlyArray<any>
  }
}

type TemplateElementsReturn = string | boolean | undefined | null

export function componentFactory<
  TComponentProps extends {
    className?: string
  },
  Ref = never,
>(
  Element: ComponentType<PropsWithoutRef<TComponentProps> & RefAttributes<Ref>>,
): <TTWProps extends {}>(
  template:
    | TemplateStringsArray
    | ((props: PropsWithoutRef<TComponentProps> & TTWProps) => string | ClassValue[]),
  ...templateElements: (
    | ((props: PropsWithoutRef<TComponentProps> & TTWProps) => TemplateElementsReturn)
    | TemplateElementsReturn
  )[]
) => React.ForwardRefExoticComponent<
  PropsWithoutRef<PropsWithoutRef<TComponentProps> & TTWProps> & RefAttributes<Ref>
>

export function componentFactory(Element: ReadonlyArray<string>): string

export function componentFactory<TComponentProps extends { className?: string }, Ref = never>(
  Element:
    | React.ComponentType<PropsWithoutRef<TComponentProps> & RefAttributes<Ref>>
    | ReadonlyArray<string>,
) {
  if (Array.isArray(Element)) {
    return twMerge(Element[0])
  }

  return <TTWProps extends {}>(
    template:
      | TemplateStringsArray
      | ((props: PropsWithoutRef<TComponentProps> & TTWProps) => ClassValue[]),
    ...templateElements: (
      | ((props: PropsWithoutRef<TComponentProps> & TTWProps) => TemplateElementsReturn)
      | TemplateElementsReturn
    )[]
  ) => {
    const Component = forwardRef<Ref, PropsWithoutRef<TComponentProps> & TTWProps>((props, ref) => {
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
          ref={ref}
        />
      )
    })
    Component.displayName = `tw.${Element.displayName || Element.name}`
    return Component
  }
}
