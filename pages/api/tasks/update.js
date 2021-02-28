// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { tasks } from './_tasks'
import { table, getMinifiedRecord } from '../utils/airtable'

console.log(tasks)

// export default (req, res) => {
//   res.status(200).json(tasks)
// }

export default async (req, res) => {
  const { id, fields } = req.body
  try {
    const updateRecords = await table.update([{ id, fields }])
    res.status(200).json(getMinifiedRecord(updateRecords[0]))
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Something went wrong' })
  }
}
