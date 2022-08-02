export class LoggerUtils {
    private log = '';
    private consoleLog;

    constructor(consoleLog: boolean = false){
        this.consoleLog = consoleLog;
    }

    public info(text: string){
        text = `INFO: ${text}\n`;
        this.log += text;
        if(this.consoleLog) console.log(text);
    }

    public warn(text: string){
        text = `WARN: ${text}\n`;
        this.log += text;
        if(this.consoleLog) console.log(text);
    }
   
    public error(text: string){
        text = `ERROR: ${text}\n`;
        this.log += text;
        if(this.consoleLog) console.error(text);
    }

    public getLog(){
        return this.log;
    }

}