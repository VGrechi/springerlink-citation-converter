import { RisExportBuilder } from "../builders/ris-export-builder";
import { CrossRefModel } from "../models";
import { Adapter } from "./adapter";

export class CrossRefAdapter implements Adapter<CrossRefModel> {

    public transform(model: CrossRefModel): string {
        const data = model.message;
        const builder = new RisExportBuilder().init();
        if (data.type) {
            switch (data.type) {
                case 'journal-article': builder.type('JOUR'); break;
                case 'proceedings-article': builder.type('CONF'); break;
                case 'print': builder.type('BOOK'); break;
                case 'book': builder.type('BOOK'); break;
                case 'reference-book': builder.type('BOOK'); break;
                case 'book-chapter': builder.type('CHAP'); break;
                default: builder.type('JOUR'); break;
            }
        }

        if (data.title) {
            builder.title(data.title[0]);
        }

        if (data.published) {
            const dateParts = data.published['date-parts'];
            builder.pubYear(dateParts[0][0]);
        }

        if (data.author) {
            data.author.map(a => {
                builder.author(`${a.family}, ${a.given ? a.given.substring(0, 1) : ''}.`);
            });
        }

        if (data.abstract) {
            let abstract = data.abstract.replace('<jats:title>Abstract</jats:title><jats:p>', '');
            abstract = abstract.replace('</jats:p>', '');
            builder.abstract(abstract);
        }

        if (data.subject) {
            data.subject.map(s => {
                builder.keyword(s);
            });
        }

        if (data.DOI) {
            builder.DOI(data.DOI);
        }

        if (data.URL) {
            builder.URL(data.URL);
        }

        if (data.page) {
            const pages = data.page.split('-');
            builder.startPage(pages[0]);
            builder.endPage(pages[1]);
        }

        const t = builder.build();
        return t;
    }
}