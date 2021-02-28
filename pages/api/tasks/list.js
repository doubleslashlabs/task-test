// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { tasks } from './_tasks'
import { table, minifyRecords } from '../utils/airtable'

console.log(tasks)

export default async (req, res) => {
  try {
    const records = await table.select({}).firstPage()
    const minifiedRecords = minifyRecords(records)
    res.status(200).json(minifiedRecords)
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong' })
  }
}
