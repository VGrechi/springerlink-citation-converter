export class RisExportBuilder {
    export: string;

    init(exportText: string = ''){
        this.export = exportText;
        return this;
    }

    type(type: string) {
        this.export += `TY  - ${type}`;
        this.export += '\n';
        return this;
    }

    title(title: string) {
        this.export += `TI  - ${title}`;
        this.export += '\n';
        return this;
    }

    abstract(abstract: string) {
        this.export += `AB  - ${abstract}`;
        this.export += '\n';
        return this;
    }

    keyword(keyword: string) {
        this.export += `KW  - ${keyword}`;
        this.export += '\n';
        return this;
    }

    author(author: string) {
        this.export += `AU  - ${author}`;
        this.export += '\n';
        return this;
    }

    pubYear(pubYear: string) {
        this.export += `PY  - ${pubYear}`;
        this.export += '\n';
        return this;
    }

    URL(URL: string) {
        this.export += `L1  - ${URL}`;
        this.export += '\n';
        return this;
    }

    DOI(doi: string) {
        this.export += `DO  - ${doi}`;
        this.export += '\n';
        return this;
    }

    startPage(page: string) {
        this.export += `SP  - ${page}`;
        this.export += '\n';
        return this;
    }

    endPage(page: string) {
        this.export += `EP  - ${page}`;
        this.export += '\n';
        return this;
    }

    build(){
        this.export += `ER  -`;
        this.export += '\n';
        return this.export;
    }

    

}