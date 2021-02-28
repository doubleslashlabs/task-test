// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { tasks } from './_tasks'
import { table } from '../utils/airtable'

console.log(tasks)

export default async (req, res) => {
  const { description } = req.body

  try {
    const createdRecords = await table.create([{ fields: { description } }])
    const createdRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields,
    }
    res.status(200).json(createdRecord)
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Something went wrong' })
  }
}
