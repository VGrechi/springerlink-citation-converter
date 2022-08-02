import * as fs from 'fs';
import CsvReadableStream from 'csv-reader';
import { SpringerLinkCsvModel } from '../models';

export class IOService {

    public async readInputFiles(inputDir: string = './input') : Promise<SpringerLinkCsvModel[]> {
        const files = await this.readDir(inputDir);

        let springerLinkModels: SpringerLinkCsvModel[] = [];

        await Promise.all(files.map(async f => {
            const models = await this.readFile(inputDir, f);
            springerLinkModels = springerLinkModels.concat(models);
        }))

        return springerLinkModels;
    }

    private async readDir(inputDir: string): Promise<string[]> {
        return new Promise<string[]>((res, rej) => {
            fs.readdir(inputDir, (err, files) => {
                if(err){
                    console.error(err);
                    rej(err);
                }
                res(files);
            });
        });
    }

    private async readFile(inputDir: string, filename: string): Promise<SpringerLinkCsvModel[]> {
        return await new Promise<SpringerLinkCsvModel[]>((res, rej) => {
            let models: SpringerLinkCsvModel[] = [];
            let inputStream = fs.createReadStream(`${inputDir}/${filename}`, 'utf8');
        
            inputStream
                .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
                .on('data', (row: any[]) => {
                    models.push(new SpringerLinkCsvModel(row));
                })
                .on('end', () => res(models.slice(1)))
                .on('error', (err) => {
                    console.error(err);
                    rej(err)
                });
        });
    }

    public async saveFile(contentAsString: string, prefix: string, format: string, outputDir: string = './output') : Promise<void> {
        let filename = `${prefix}_${new Date().getTime()}.${format}`;
        fs.writeFileSync(`${outputDir}/${filename}`, contentAsString, 'utf8');
    }
}