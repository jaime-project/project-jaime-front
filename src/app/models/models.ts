export interface Cluster {
    name: string,
    url: string,
    token: string,
    type: string,
}

export interface ClusterShort {
    name: string,
    url: string,
    type: string,
}

export interface Server {
    name: string
    host: string
    port: string
    user: string
    password: string
}

export interface ServerShort {
    name: string,
    host: string,
    port: string,
}

export interface Agent {
    id: string,
    host: string,
    port: string,
    type: string,
    status: string,
}

export interface AgentShort {
    host: string,
    port: string,
    type: string,
}

export interface CronShort {
    id: string,
    name: string,
    cron_expression: string,
    status: string,
    creation_date: string,
}

export interface CronJob {
    name: string
    cron_expression: string
    job_module_repo: string
    job_module_name: string
    job_agent_type: string
    id: string
    creation_date: Date
    status: string
    job_params: any
}

export interface JobShort {
    name: string,
    status: string,
    id: string,
    agent_id: string,
    agent_type: string,
    module_name: string,
    start_date: string | null
}

export interface Job {
    id: string,
    name: string,
    module_name: string,
    module_repo: string,
    status: string,
    start_date: Date | null,
    running_date: Date | null,
    terminated_date: Date | null,
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

export interface MessageShort {
    id: string,
    status: string,
    title: string,
    subject: string,
    job: string,
    date: Date,
}

export interface Message {
    id: string,
    status: string,
    title: string,
    subject: string,
    job: string,
    date: Date | null,
    body: string,
    files: string[],
}

export interface TestClusterResult {
    success: boolean,
    text: string,
}

export interface HookShort {
    id: string,
    name: string,
    status: string,
    creation_date: string,
}

export interface HookJob {
    name: string
    job_module_repo: string
    job_module_name: string
    job_agent_type: string
    id: string
    creation_date: Date
    status: string
    job_params: any
}

export interface CardShort {
    id: string,
    name: string,
    description: string,
    module: string,
    repo: string,
    color: string
}

export interface Card {
    id: string,
    name: string,
    description: string,
    color: string
    job_module_name: string,
    job_module_repo: string,
    job_agent_type: string,
    job_default_docs: {},
    job_card_docs: string,
    creation_date: Date,
}

export interface Library {
    name: string,
    description: string,
    repo: string,
    path: string,
    branch: string,
    user: string,
    password: string,
}

export interface LibraryShort {
    name: string,
    description: string,
    repo: string,
}