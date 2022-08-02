// Load CSV Files
// GET Citation
// Format to specfic format
// Save output File

import { CrossRefAdapter, SpringerLinkAdapter } from './adapter';
import { CrossRefService, IOService } from './service';
import { SpringerNatureService } from './service/springernature-service';
import { DelayUtils } from './utils/delay-utils';
import { LoggerUtils } from './utils/logger';

(async (format: string) => {
    const ioService = new IOService();
    const Logger = new LoggerUtils();
    const models = await ioService.readInputFiles('./input2');

    let output: string = '';
    let successCount = 0, errorCount = 0;
    await Promise.all(models.map(async (model, index) => {
        try{
            await DelayUtils.delay(index * 250);
            const dataCrossRef = await new CrossRefService().getCitation(model.itemDOI);
            if(!dataCrossRef){
                Logger.info(`${model.itemDOI} could not be processed.`);
                errorCount++;
                return;
            }

            if(!dataCrossRef.message.abstract){
                const dataSpringer = await new SpringerNatureService().getCitation(model.itemDOI);
                if(dataSpringer && dataSpringer.records.length > 0){
                    dataCrossRef.message.abstract = dataSpringer.records[0].abstract;
                }
            }
      
            output += new CrossRefAdapter().transform(dataCrossRef);
            //output += new SpringerLinkAdapter().transform(data);
            output += '\n\n';

            Logger.info(`${model.itemDOI} processed.`);
            successCount++;
        } catch(err){
            Logger.error(`${model.itemDOI} not processed.\n ${JSON.stringify(model)}\n ${err}`);
            errorCount++;
        }
    }));
    Logger.info(`${models.length} were processed. Success: ${successCount} | Error: ${errorCount}`);

    await ioService.saveFile(Logger.getLog(), 'log', 'txt', './log');
    await ioService.saveFile(output, 'output', format);
})('ris');
