import Prismic from 'prismic-javascript'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import React from 'react'
import { GetStaticProps } from 'next'
import serializeHyperlink from '../utils/serializeHyperlink'

interface Props {
  docData: {
    description: RichTextBlock[]
  }
}

const Index: React.FC<Props> = ({ docData }: Props) => {
  return (
    <div>
      <RichText
        render={docData.description}
        serializeHyperlink={serializeHyperlink as any}
      />
    </div>
  )
}

export default Index

const getStaticProps: GetStaticProps<Props> = async () => {
  const prismicRepo = process.env.PRISMIC_REPO
  const client = Prismic.client(`https://${prismicRepo}.prismic.io/api/v2`)
  const doc = await client.getSingle('index', {})
  return {
    props: { docData: doc.data }
  }
}

export { getStaticProps }
