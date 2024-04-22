/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IFieldsnavigation {
  fields: IField[];
}

export interface IField {  
    id: string;
    title: string;
    type?: IssueType;
    status: IssueStatus;
    priority: IssuePriority;
    listPosition: number;
    description: string;
    estimate: number;
    timeSpent: number;
    timeRemaining: number;
    createdAt: string;
    updatedAt: string;
    reporterId: string;
    userIds: string[];
    comments: string;
    projectId: string;
    control?: string;
    name?: string;
    schema?: any;
    value?: any;
    groupTitle?:string;
}

/* eslint-disable no-shadow */
export enum IssueType {
  STORY = 'Story',
  TASK = 'Task',
  BUG = 'Bug'
}

export enum IssueStatus {
  BACKLOG = 'Backlog',
  SELECTED = 'Selected',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  IN_PROGRESS = 'InProgress',
  DONE = 'Done',
  PRE_INFO = 'PreInfo',
  ADD_PRE_INFO = 'AddPreInfo'
}

export enum IssuePriority {
  LOWEST = 'Lowest',
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  HIGHEST = 'Highest',
  PRIMARY = 'Primary',
  ADDITIONAL = 'Additional'
}

export interface IFieldsnavigationState {  
    fields: IField[];
    loading: boolean;
    filter: IFilter;
}

export type IFilter = 'all' | 'pending' | 'completed';




