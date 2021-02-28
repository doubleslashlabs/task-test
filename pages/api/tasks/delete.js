// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { table, getMinifiedRecord } from '../utils/airtable'
import { tasks } from './_tasks'

console.log(tasks)

// export default (req, res) => {
//   res.status(200).json(tasks)
// }

export default async (req, res) => {
  const { id } = req.body
  try {
    const deletedRecords = await table.destroy([id])
    res.status(200).json(getMinifiedRecord(deletedRecords[0]))
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Something went wrong' })
  }
}
