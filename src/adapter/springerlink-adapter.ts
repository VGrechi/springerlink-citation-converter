import { RisExportBuilder } from "../builders/ris-export-builder";
import { SpringerLinkModel } from "../models";
import { Adapter } from "./adapter";

export class SpringerLinkAdapter implements Adapter<SpringerLinkModel> {

    public transform(model: SpringerLinkModel): string {
        const record = model.records[0];
        const builder = new RisExportBuilder().init();

        const typeFacet = model.facets.find(f => f.name === 'type');
        if (typeFacet) {
            switch (typeFacet.values[0].value) {
                case 'Journal': builder.type('JOUR'); break;
                //case 'proceedings-article': builder.type('CONF'); break;
                //case 'print': builder.type('BOOK'); break;
                case 'Book': builder.type('BOOK'); break;
                //case 'reference-book': builder.type('BOOK'); break;
                //case 'book-chapter': builder.type('CHAP'); break;
                default: builder.type('JOUR'); break;
            }
        }

        if (record.title) {
            builder.title(record.title);
        }

        const yearFacet = model.facets.find(f => f.name === 'year');
        if (yearFacet) {
            builder.pubYear(yearFacet.values[0].value);
        }

        if (record.creators) {
            record.creators.map(c => {
                builder.author(c.creator);
            });
        }

        if (record.abstract) {
            builder.abstract(record.abstract);
        }

        const keywordFacet = model.facets.find(f => f.name === 'keyword');
        if (keywordFacet) {
            keywordFacet.values.map(v => {
                builder.keyword(v.value);
            });
        }

        if (record.doi) {
            builder.DOI(record.doi);
        }

        if (record.url) {
            builder.URL(record.url.value);
        }

        if (record.startingPage) {
            builder.startPage(record.startingPage);
        }

        if (record.endingPage) {
            builder.endPage(record.endingPage);
        }
        
        const t = builder.build();
        return t;
    }
}