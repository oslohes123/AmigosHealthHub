import app from './index'
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT

const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port ?? 'Port Not Set'}`)
})

export default server
