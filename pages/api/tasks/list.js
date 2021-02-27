// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { tasks } from './_tasks'

const Airtable = require('airtable')
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
)

const table = base(process.env.AIRTABLE_TABLE_NAME)

const minifyRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record))
}

const getMinifiedRecord = (record) => {
  if (!record.fields.completed) {
    record.fields.completed = false
  }
  return {
    id: record.id,
    fields: record.fields,
  }
}

console.log(tasks)

export default async (req, res) => {
  const records = await table.select({}).firstPage()
  const minifiedRecords = minifyRecords(records)
  res.status(200).json(minifiedRecords)
}
