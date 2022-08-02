import axios from 'axios';
import { AxiosResponse } from "axios";
import { SpringerLinkModel } from "../models";

export class SpringerNatureService {

    public async getCitation(itemDOI: string) : Promise<SpringerLinkModel> {
        try{
            const url = `http://api.springernature.com/metadata/json?q=doi:${itemDOI}&api_key=04f2f1a8830d687541a997a9975dd652`;
            const res: AxiosResponse<SpringerLinkModel> = await axios.get<SpringerLinkModel>(url);
            return res.data;
        }catch(err){
            console.error(err.response.status, err.response.statusText);
        }
    }
}