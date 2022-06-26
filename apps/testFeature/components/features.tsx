import React, { useRef, forwardRef } from 'react'
import tw from 'tw-tailwind'

interface ClassNameProps {
  className: string
  isLoading: boolean
}
export const ClassName = ({ className, isLoading }: ClassNameProps) => (
  <div className={className}>
    {className} {isLoading && <div>Loading</div>}
  </div>
)
export const ClassNameForwardRef = forwardRef<HTMLDivElement, ClassNameProps>(
  ({ className, isLoading }, ref) => (
    <div className={className} ref={ref}>
      {className} {isLoading && <div>Loading</div>}
    </div>
  ),
)
ClassNameForwardRef.displayName = 'ClassNameForwardRef'

export const Div1 = tw.div`bg-slate-600`
export const Div1Test = () => {
  const ref = useRef<HTMLDivElement>(null)
  const refSpan = useRef<HTMLSpanElement>(null)
  return (
    <div>
      <Div1 ref={ref} />
      {/* @ts-expect-error */}
      <Div1 ref={refSpan} />
      {/* @ts-expect-error */}
      <Div1 type="button" />
    </div>
  )
}

export const Div2 = tw(Div1)`bg-slate-600`
export const Div2Test = () => {
  const ref = useRef<HTMLDivElement>(null)
  const refSpan = useRef<HTMLSpanElement>(null)
  return (
    <div>
      <Div2 ref={ref} />
      {/* @ts-expect-error */}
      <Div2 ref={refSpan} />
      {/* @ts-expect-error */}
      <Div2 type="button" />
    </div>
  )
}

export const Div3 = tw(ClassName)`bg-slate-600`
export const Div3Test = () => {
  const ref = useRef<HTMLDivElement>(null)
  const refSpan = useRef<HTMLSpanElement>(null)
  return (
    <div>
      <Div3 className="bg-slate-700" isLoading />
      {/* @ts-expect-error */}
      <Div3 ref={ref} className="bg-slate-700" isLoading />
      {/* @ts-expect-error */}
      <Div3 ref={refSpan} className="bg-slate-700" isLoading />
      {/* @ts-expect-error */}
      <Div3 type="button" />
    </div>
  )
}

export const Div4 = tw.div<{ isLoading: boolean }>`bg-slate-600 ${'text-red-200'} 
 ${({ isLoading }) => isLoading && 'border-2 boroder'}`
export const Div4Test = () => {
  const ref = useRef<HTMLDivElement>(null)
  const refSpan = useRef<HTMLSpanElement>(null)
  return (
    <div>
      <Div4 className="bg-slate-700" isLoading />
      <Div4 ref={ref} isLoading />
      {/* @ts-expect-error */}
      <Div4 ref={refSpan} isLoading />
      {/* @ts-expect-error */}
      <Div4 />
    </div>
  )
}

export const Div5 = tw(Div1)<{ isLoading: boolean }>`bg-slate-600 ${'text-red-200'} 
${({ isLoading }) => isLoading && 'border-2 boroder'}`
export const Div5Test = () => {
  const ref = useRef<HTMLDivElement>(null)
  const refSpan = useRef<HTMLSpanElement>(null)
  return (
    <div>
      <Div5 className="bg-slate-700" isLoading />
      <Div5 ref={ref} isLoading />
      {/* @ts-expect-error */}
      <Div5 ref={refSpan} isLoading />
      {/* @ts-expect-error */}
      <Div5 />
    </div>
  )
}

export const Div6 = tw(ClassName)`bg-slate-600 ${'text-red-200'} 
${({ isLoading }) => isLoading && 'border-2 boroder'}`
export const Div6Test = () => {
  const ref = useRef<HTMLDivElement>(null)
  const refSpan = useRef<HTMLSpanElement>(null)
  return (
    <div>
      <Div6 className="bg-slate-700" isLoading />
      {/* @ts-expect-error */}
      <Div6 ref={ref} isLoading className="bg-slate-700" />
      {/* @ts-expect-error */}
      <Div6 ref={refSpan} isLoading className="bg-slate-700" />
      {/* @ts-expect-error */}
      <Div6 />
    </div>
  )
}

export const Div7 = tw.div<{ isLoading: boolean }>(({ isLoading }) => [
  'bg-slate-600',
  isLoading && 'border-2 boroder',
])
export const Div7Test = () => {
  const ref = useRef<HTMLDivElement>(null)
  const refSpan = useRef<HTMLSpanElement>(null)
  return (
    <div>
      <Div7 className="bg-slate-700" isLoading />
      <Div7 ref={ref} isLoading />
      {/* @ts-expect-error */}
      <Div7 ref={refSpan} isLoading />
      {/* @ts-expect-error */}
      <Div7 />
    </div>
  )
}

export const Div8 = tw(Div1)<{ isLoading: boolean }>(({ isLoading }) => [
  'bg-slate-600',
  isLoading && 'border-2 boroder',
])
export const Div8Test = () => {
  const ref = useRef<HTMLDivElement>(null)
  const refSpan = useRef<HTMLSpanElement>(null)
  return (
    <div>
      <Div8 className="bg-slate-700" isLoading />
      <Div8 ref={ref} isLoading />
      {/* @ts-expect-error */}
      <Div8 ref={refSpan} isLoading />
      {/* @ts-expect-error */}
      <Div8 />
    </div>
  )
}

export const Div9 = tw(ClassName)(({ isLoading }) => [
  'bg-slate-600',
  isLoading && 'border-2 boroder',
])
export const Div9Test = () => {
  const ref = useRef<HTMLDivElement>(null)
  const refSpan = useRef<HTMLSpanElement>(null)
  return (
    <div>
      <Div9 className="bg-slate-700" isLoading />
      {/* @ts-expect-error */}
      <Div9 ref={ref} isLoading className="bg-slate-700" />
      {/* @ts-expect-error */}
      <Div9 ref={refSpan} isLoading className="bg-slate-700" />
      {/* @ts-expect-error */}
      <Div9 />
    </div>
  )
}

export const Div10 = tw(ClassNameForwardRef)(({ isLoading }) => [
  'bg-slate-600',
  isLoading && 'border-2 boroder',
])
export const Div10Test = () => {
  const ref = useRef<HTMLDivElement>(null)
  const refSpan = useRef<HTMLSpanElement>(null)
  return (
    <div>
      <Div10 className="bg-slate-700" isLoading />

      <Div10 ref={ref} isLoading className="bg-slate-700" />
      {/* @ts-expect-error */}
      <Div10 ref={refSpan} isLoading className="bg-slate-700" />
      {/* @ts-expect-error */}
      <Div10 />
    </div>
  )
}

export const Div11 = tw(ClassName)`bg-slate-600 ${({ isLoading }) =>
  isLoading && 'border-2 boroder'}`
export const Div11Test = () => {
  const ref = useRef<HTMLDivElement>(null)
  const refSpan = useRef<HTMLSpanElement>(null)
  return (
    <div>
      <Div10 className="bg-slate-700" isLoading />

      <Div10 ref={ref} isLoading className="bg-slate-700" />
      {/* @ts-expect-error */}
      <Div10 ref={refSpan} isLoading className="bg-slate-700" />
      {/* @ts-expect-error */}
      <Div10 />
    </div>
  )
}

const tw1 = tw`bg-red-700`
export const TWTest = () => (
  <div>
    <div className={tw1} />
  </div>
)
