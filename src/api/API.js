import axios from "axios";
import { VITE_API_KEY } from "../config/enviroment";
import errorHandler from "./handler";

export default class IPAPI {
    constructor(){
        this.API = axios.create({
          baseURL: `https://geo.ipify.org/api/v2`,
        });
        this.API.interceptors.response.use(
          (request) => {
            return request;
          },
          (error) => {
            errorHandler(error.response.data);
            return Promise.reject(error);
          }
        );
    }

    async getIpData(ip){
        try {
            const response = await this.API.get(
                `/country,city?apiKey=${VITE_API_KEY}&ipAddress=${ip}`
            )
            return response.data
        } catch (error) {
            throw error
        }
    } 
} 