import axios from 'axios';
import { AxiosResponse } from "axios";
import { CiteasModel, Export } from "../models";

export class CiteasService {

    public async  getCitation(itemDOI: string) : Promise<Export[]> {
        try{
            const url = `https://api.citeas.org/product/${itemDOI}?email=test@example.com`;
            const res: AxiosResponse<CiteasModel> = await axios.get<CiteasModel>(url);
            return res.data.exports;
        }catch(err){
            console.error(err.response.status, err.response.statusText);
        }
    }
}