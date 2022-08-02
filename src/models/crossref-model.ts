export class CrossRefModel {
    message: Message;
}

export interface Message {
  type: string;
  title: string;
  abstract: string;
  published: any;
  author: any[];
  subject: string[];
  DOI: string;
  URL: string;
  page: string;
}
