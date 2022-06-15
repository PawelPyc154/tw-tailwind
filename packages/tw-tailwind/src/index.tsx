/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import clsx, { ClassValue } from 'clsx'
import { createElement, ElementRef, forwardRef, PropsWithoutRef, RefAttributes, ComponentType } from 'react'
import tags from './tags'
import { cleanTemplate } from './utils/cleanTemplate'
import { mergeArrays } from './utils/mergeArrays'
import React from 'react'

const templateTagFactory =
  <TTag extends keyof JSX.IntrinsicElements>(tag: TTag) =>
  <TTWProps extends {}>(
    template: TemplateStringsArray | ((props: JSX.IntrinsicElements[TTag] & TTWProps) => ClassValue[]),
    ...templateElements: ((props: JSX.IntrinsicElements[TTag] & TTWProps) => string | undefined | null)[]
  ) =>
    forwardRef<ElementRef<TTag>, JSX.IntrinsicElements[TTag] & TTWProps>((props, ref) =>
      createElement(
        tag,
        {
          ...props,
          className:
            typeof template === 'function'
              ? clsx(template(props))
              : cleanTemplate(
                  mergeArrays(
                    template,
                    templateElements.map((t) => t(props)),
                  ),
                  props.className,
                ),
          ref,
        },
        props.children,
      ),
    )

declare global {
  export interface ArrayConstructor {
    isArray(arg: ReadonlyArray<any> | any): arg is ReadonlyArray<any>
  }
}

const templateComponentFactory = <TComponentProps extends { className?: string }, Ref = never>(
  Element: ComponentType<PropsWithoutRef<TComponentProps> & RefAttributes<Ref>> | ReadonlyArray<string>,
) => {
  if (Array.isArray(Element)) {
    return Element[0]
  }

  return <TTWProps extends {}>(
    template: TemplateStringsArray | ((props: PropsWithoutRef<TComponentProps> & TTWProps) => ClassValue[]),
    ...templateElements: ((props: PropsWithoutRef<TComponentProps> & TTWProps) => string | undefined | null)[]
  ) =>
    forwardRef<Ref, PropsWithoutRef<TComponentProps> & TTWProps>((props, ref) => (
      <Element
        {...props}
        className={
          typeof template === 'function'
            ? clsx(template(props))
            : cleanTemplate(
                mergeArrays(
                  template,
                  templateElements.map((t) => t(props)),
                ),
                props.className,
              )
        }
        ref={ref}
      />
    ))
}

class Wrapper<T extends keyof JSX.IntrinsicElements> {
  // wrapped has no explicit return type so we can infer it
  wrapped(e: T) {
    return templateTagFactory<T>(e)
  }
}
type IntrinsicElementsTemplateFunctionsMap = {
  [Key in keyof JSX.IntrinsicElements]: ReturnType<Wrapper<Key>['wrapped']>
}

const intrinsicTagMap = tags.reduce(
  (acc, tag: keyof JSX.IntrinsicElements) => ({
    ...acc,
    [tag]: templateTagFactory(tag),
  }),
  {} as IntrinsicElementsTemplateFunctionsMap,
)
const tw = Object.assign(templateComponentFactory, intrinsicTagMap)

export default tw

