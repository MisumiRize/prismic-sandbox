import { HTMLSerializer } from 'prismic-reactjs'
import Link from 'next/link'
import React from 'react'

interface ElementData {
  id: string
  link_type: 'Web'
  url: string
}

const linkResolver = (data: ElementData): string => {
  return '/'
}

interface LinkElement {
  data: ElementData
}

const serializeHyperlink: HTMLSerializer<React.ReactNode> = (_type, element: LinkElement, content) => {
  if (element.data.link_type === 'Web') {
    return <a href={element.data.url}>{content}</a>
  }
  return (
    <Link key={element.data.id} href={linkResolver(element.data)}>
      <a>{content}</a>
    </Link>
  )
}

export default serializeHyperlink
