export interface Server {
    name: string;
    url: string;
    token: string;
    user: string;
    type: string;
    version: string;
}

export interface ServerShort {
    name: string;
    url: string;
    type: string;
}
