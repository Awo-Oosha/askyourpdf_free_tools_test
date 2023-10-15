import axios from "axios"
import routes from "./routes"

const AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
})

class Base{

}
export default new Base()