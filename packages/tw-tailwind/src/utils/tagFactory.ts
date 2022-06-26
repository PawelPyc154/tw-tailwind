/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */

import clsx, { ClassValue } from 'clsx'
import { forwardRef, ElementRef, createElement } from 'react'
import tags from '../tags'
import { ObjectWithoutPrefixDollar } from '../types/objectWithoutPrefixDollar'
import { cleanTemplate } from './cleanTemplate'
import { mergeArrays } from './mergeArrays'

type TemplateElementsReturn = string | boolean | undefined | null

export const tagFactory =
  <TTag extends keyof JSX.IntrinsicElements>(tag: TTag) =>
  <TTWProps extends {}>(
    template:
      | TemplateStringsArray
      | ((props: JSX.IntrinsicElements[TTag] & TTWProps) => string | ClassValue[]),
    ...templateElements: (
      | ((props: JSX.IntrinsicElements[TTag] & TTWProps) => TemplateElementsReturn)
      | TemplateElementsReturn
    )[]
  ) => {
    const Component = forwardRef<ElementRef<TTag>, JSX.IntrinsicElements[TTag] & TTWProps>(
      (props, ref) => {
        const filteredProps = Object.fromEntries(
          Object.entries(props).filter(([key]) => key.charAt(0) !== '$'),
        ) as JSX.IntrinsicElements[TTag] & ObjectWithoutPrefixDollar<TTWProps>
        return createElement(
          tag,
          {
            ...filteredProps,
            className:
              typeof template === 'function'
                ? clsx(template(props), props.className)
                : cleanTemplate(
                    mergeArrays(
                      template,
                      templateElements.map((t) => (typeof t === 'function' ? t(props) : t)),
                    ),
                    props.className,
                  ),
            ref,
          },
          props.children,
        )
      },
    )
    Component.displayName = `tw.${tag}`
    return Component
  }
