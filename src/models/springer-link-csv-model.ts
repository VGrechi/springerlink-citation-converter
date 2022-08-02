export class SpringerLinkCsvModel {
    itemTitle: string;
    publicationTitle: string;
    bookSeriesTitle: string;
    journalVolume: string;
    journalIssue: string;
    itemDOI: string;
    authors: string;
    publicationYear: string;
    URL: string;
    contentType: string;

    constructor(row: any[]){
        this.itemTitle = row[0];
        this.publicationTitle = row[1];
        this.bookSeriesTitle = row[2];
        this.journalVolume = row[3];
        this.journalIssue = row[4];
        this.itemDOI = row[5];
        this.authors = row[6];
        this.publicationYear = row[7];
        this.URL = row[8];
        this.contentType = row[9];
    }
}