/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */

export enum IssueType {
  STORY = 'Story',
  TASK = 'Task',
  BUG = 'Bug'
}

export enum IssueStatus {
  BACKLOG = 'Backlog',
  SELECTED = 'Selected',  
  IN_PROGRESS = 'InProgress',
  DONE = 'Done',
  PRE_INFO = 'PreInfo',
  ADD_PRE_INFO = 'AddPreInfo'
}

export const IssueStatusDisplay = {
  [IssueStatus.BACKLOG]: 'Backlog',
  [IssueStatus.SELECTED]: 'Selected for Development',
  [IssueStatus.IN_PROGRESS]: 'In progress',
  [IssueStatus.DONE]: 'Done',
  [IssueStatus.PRE_INFO]: 'Preliminary Information',
  [IssueStatus.ADD_PRE_INFO]: 'Additional Preliminary Information'
};

export enum IssuePriority {
  LOWEST = 'Lowest',
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  HIGHEST = 'Highest',
  PRIMARY = 'Primary',
  ADDITIONAL = 'Additional'
}

export const IssuePriorityColors = {
  [IssuePriority.HIGHEST]: '#CD1317',
  [IssuePriority.HIGH]: '#E9494A',
  [IssuePriority.MEDIUM]: '#E97F33',
  [IssuePriority.LOW]: '#2D8738',
  [IssuePriority.LOWEST]: '#D5F5E3',
  [IssuePriority.PRIMARY]: '#2ECC71',
  [IssuePriority.ADDITIONAL]: '#3498DB'
};
export interface JIssue {
  id: string;
  title: string;
  type: IssueType;
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
  comments: any[];
  projectId: string;
  control?: string;
  name?: string;
  schema?: any;
  value?: any;
  groupTitle?:string;
}
/* eslint-enable no-shadow */


