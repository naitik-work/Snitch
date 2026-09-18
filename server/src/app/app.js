import express from "express"
import cors from "cors"
import morgan from "morgan"
import authRoutes from "../routes/auth.routes.js"
import productRoutes from "../routes/product.routes.js"
import cartRoutes from "../routes/cart.routes.js"
import orderRoutes from "../routes/order.routes.js"

const app = express()

const allowedOrigins = [
    "https://snitch-cxnr.onrender.com",
    "http://localhost:5173",
    "http://localhost:3000"
]

if (process.env.CLIENT_URL) {
    const clientUrl = process.env.CLIENT_URL.trim().replace(/\/+$/, "")
    if (clientUrl && !allowedOrigins.includes(clientUrl)) {
        allowedOrigins.push(clientUrl)
    }
}

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

app.use(morgan("dev"))
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/orders", orderRoutes)

export default app