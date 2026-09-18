import app from "./app/app.js"
import { connectDB } from "./config/db.js"

await connectDB()

const PORT = parseInt(process.env.PORT, 10) || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})