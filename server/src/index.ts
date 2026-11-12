import 'dotenv/config'
import app from './app'


const PORT = process.env.PORT || 8003

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
