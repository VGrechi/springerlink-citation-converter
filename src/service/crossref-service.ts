import axios from 'axios';
import { AxiosResponse } from "axios";
import { CrossRefModel, Message } from "../models";

export class CrossRefService {

    public async getCitation(itemDOI: string) : Promise<CrossRefModel> {
        try{
            const url = `https://api.crossref.org/works/${itemDOI}`;
            const res: AxiosResponse<CrossRefModel> = await axios.get<CrossRefModel>(url);
            return res.data;
        }catch(err){
            console.error(err.response.status, err.response.statusText);
        }
    }
}