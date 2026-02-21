import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { UserRouter } from "./routes/users"
import { productRouter } from "./routes/product"
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use("/users", UserRouter)
app.use("/product", productRouter)

const MONGO_URL = process.env.MONGO_URL as string

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected ✅")

    app.listen(3001, () => {
      console.log("SERVER STARTED 🚀")
    })
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed ❌", err)
  })
