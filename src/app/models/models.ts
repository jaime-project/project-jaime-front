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

export interface Agent {
    id: string;
    host: string;
    port: string;
    type: string;
}

export interface AgentShort {
    host: string;
    port: string;
    type: string;
}

export interface WorkShort {
    name: string,
    status: string,
    id: string,
    agent_id: string,
    agent_type: string,
    module_name: string,
    ready_date: Date | null
}

export interface Work {
    id: string,
    name: string,
    module: string,
    status: string,
    start_date: Date | null,
    running_date: Date | null,
    terminated_date: Date | null,
    status_date: Date | null,
    agent: Agent,
    params: {}
}
