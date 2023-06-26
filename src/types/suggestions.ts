export interface ISuggestion {
    data:       Datum[];
    pagination: Pagination;
    meta:       Meta;
}

export interface Datum {
    name:                       string;
    analytics_response_payload: string;
}

export interface Meta {
    msg:         string;
    status:      number;
    response_id: string;
}

export interface Pagination {
    count:  number;
    offset: number;
}
