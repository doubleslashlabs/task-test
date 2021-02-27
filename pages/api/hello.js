// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { tasks } from './tasks/_tasks'
export default (req, res) => {
  res.statusCode = 200
  res.json(tasks)
}
