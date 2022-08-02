export class CiteasModel {
    citations: Citation[];
    exports: Export[];
    metadata: Metadata;
    name: string;
    provenance: Provenance[];
    url: string;
}

export interface Citation {}

export interface Export {
  export: string;
  export_name: string;
}

export interface Metadata {}

export interface Provenance {}