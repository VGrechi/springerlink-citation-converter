export class SpringerLinkModel {
  records: Record[];
  facets: Facet[];
}

export interface Record {
  contentType: string;
  title: string;
  doi: string;
  startingPage: string;
  endingPage: string;
  abstract: string;
  creators: Creator[];
  url: Value;
}

interface Creator {
  creator: string;
}

export interface Facet {
  name: string;
  values: Value[];
}

interface Value {
  value: string;
}
