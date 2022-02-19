export interface Server {
    name: string;
    url: string;
    token: string;
    type: string;
    version: string;
}

export interface ClusterShort {
    name: string;
    url: string;
    type: string;
}

export interface Agent {
    id: string;
    host: string;
    port: string;
    type: string;
    status: string;
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
    start_date: Date | null
}

export interface Work {
    id: string,
    name: string,
    module_name: string,
    module_repo: string,
    status: string,
    start_date: Date | null,
    running_date: Date | null,
    terminated_date: Date | null,
    status_date: Date | null,
    agent: Agent,
    params: {}
}

export interface RepoGit {
    name: string,
    type: string,
    url: string,
    path: string,
    branch: string,
    user: string,
    pass: string,
}

export interface RepoLocal {
    name: string,
    type: string,
}
