export interface Cluster {
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

export interface Server {
    name: string;
    host: string;
    port: string;
    user: string;
    password: string;
}

export interface ServerShort {
    name: string;
    host: string;
    port: string;
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

export interface CronShort {
    id: string,
    name: string,
    cron_expression: string,
    status: string,
    creation_date: string,
}

export interface CronWork {
    name: string
    cron_expression: string
    work_module_repo: string
    work_module_name: string
    work_agent_type: string
    id: string
    creation_date: Date
    status: string
    work_params: any
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
