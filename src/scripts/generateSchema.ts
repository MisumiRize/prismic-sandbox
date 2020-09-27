import fs from 'fs'
import { getIntrospectionQuery } from 'graphql'
import fetch from 'isomorphic-fetch'
import path from 'path'
import Prismic from 'prismic-javascript'

const prismicRepo = process.env.PRISMIC_REPO;

(async function() {
  const api = await Prismic.api(`https://${prismicRepo}.prismic.io/api/v2`)
  const res = await fetch(
    `https://${prismicRepo}.prismic.io/graphql?query=${getIntrospectionQuery()}`,
    {
      headers: {
        'Prismic-Ref': api.masterRef.ref,
      }
    }
  )
  const schema = await res.json()
  fs.writeFileSync(
    path.join(__dirname, '../../schema.json'),
    JSON.stringify(schema, null, 2),
    'utf8'
  )
})()
