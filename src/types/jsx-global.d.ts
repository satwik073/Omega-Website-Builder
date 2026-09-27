import type { JSX as Jsx } from 'react/jsx-runtime'

declare global {
  namespace JSX {
    type Element = Jsx.Element
    type ElementClass = Jsx.ElementClass
    type IntrinsicElements = Jsx.IntrinsicElements
    type ElementAttributesProperty = Jsx.ElementAttributesProperty
    type ElementChildrenAttribute = Jsx.ElementChildrenAttribute
    type LibraryManagedAttributes<C, P> = Jsx.LibraryManagedAttributes<C, P>
  }
}

export {}
