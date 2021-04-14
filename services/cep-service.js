import axios from "axios"

const cep_service_api = axios.create({ baseURL: "https://brasilapi.com.br/api/cep/v1/" })


export default cep_service_api