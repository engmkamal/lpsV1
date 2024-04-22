/* eslint-disable @typescript-eslint/no-explicit-any */
import { IssueStatus, IssueType, IssuePriority } from './field-status';

export class JLane {
  id?: IssueStatus;
  title?: string;
  //issues: any[];
  issues?: JIssue[];
}

export interface JIssue {
  id: string;
  title: string;
  status: IssueStatus;
  type: IssueType;
  priority: IssuePriority;
}

// export const MOCK_LANES1: JLane[] = [
//   {
//     id: IssueStatus.BACKLOG,
//     title: 'Backlog',
//     issues: [
//         {
//             id: 1,
//             control: "LoanType",
//             name: "LoanType",
//             schema: { 
//               "type": "object",
//               "properties": {
//                 "LoanType": {
//                   "type": "string",
//                   "widget": "radio",
//                   "choicesUrl": "/assets/loanType.json",
//                   "choicesVerb": "GET"
//                 }
//               }
//             },
//             value: {
//               "LoanType": "New"
//             },
//             groupTitle:"Loan Type"        
//           },
//           {
//             id: 2,
//             control: "CopyCPR",
//             name: "CopyCPR",
//             schema: { 
//               "type": "object",
//               "properties": {
//                 "CopyCPR": {
//                   "type": "string"
//                 }
//               }
//             },
//             value: {
//               "CopyCPR": "test"
//             },
//             groupTitle:"Copy CPR"        
//           },
//           {
//             id: 3,
//             control: "ProposalType",
//             name: "ProposalType",
//             schema: { 
//               "type": "object",
//               "properties": {
//                 "ProposalType": {
//                   "type": "object",
//                   "properties": {
//                   "TakeOver": {
//                     "type": "boolean",
//                     "title": "Take Over"
//                   },
//                   "TopUp": {
//                     "type": "boolean",
//                     "title": "Top Up"
//                   },
//                   "Renewal": {
//                     "type": "boolean"
//                   },
//                   "Enhancement": {
//                     "type": "boolean"
//                   },
//                   "Reduction": {
//                     "type": "boolean"
//                   },
//                   "Restructure": {
//                     "type": "boolean"
//                   },
//                   "Reschedule": {
//                     "type": "boolean"
//                   },
//                   "LegalAction": {
//                     "type": "boolean",
//                     "title": "Legal Action"
//                   },
//                   "WriteOff": {
//                     "type": "boolean",
//                     "title": "Write Off"
//                   },
//                   "Waiver": {
//                     "type": "boolean"
//                   }
//                 }
//                 }
//               }
//             },
//             value: {
//               "ProposalType": {
//                 "TakeOver": true,
//                 "TopUp": false,
//                 "Renewal": true,
//                 "Enhancement": true,
//                 "Reduction": false,
//                 "Restructure": true,
//                 "Reschedule": false,
//                 "LegalAction": false,
//                 "WriteOff": false,
//                 "Waiver": true
//               }
//             },
//             groupTitle:"Proposal Type"        
//           },
//           {
//             id: 4,
//             control: "cif",
//             name: "cif",
//             schema: { 
//               "type": "object",
//               "properties": {
//                 "cif": {
//                   "type": "string"
//                 }
//               }
//             },
//             value: {
//               "cif": "test"
//             },
//             groupTitle:"CIF"        
//           },
//           {
//             id: 5,
//             control: "CustomerType",
//             name: "CustomerType",
//             schema: { 
//               "type": "object",
//               "properties": {
//                 "CustomerType": {
//                   "type": "string",
//                   "widget": "select",
//                   "choicesUrl": "/assets/customerTypes.json",
//                   "choicesVerb": "GET"
//                 }
//               }
//             },
//             value: {
//               "CustomerType": "Individual"
//             },
//             groupTitle:"Customer Type"        
//           },
//           {
//             id: 6,
//             control: "LegalEntity",
//             name: "LegalEntity",
//             schema: { 
//               "type": "object",
//               "properties": {
//                 "LegalEntity": {
//                   "type": "string",
//                   "widget": "select",
//                   "choicesUrl": "/assets/leagalEntities.json",
//                   "choicesVerb": "GET"
//                   }
//               }
//             },
//             value: {
//               "LegalEntity": "Staff"
//             },
//             groupTitle:"Legal Entity"        
//           },
//           {
//             id: 7,
//             control: "ApprovalAuthority",
//             name: "ApprovalAuthority",
//             schema: { 
//               "type": "object",
//               "properties": {
//                 "ApprovalAuthority": {
//                   "type": "string",
//                   "widget": "radio",
//                   "choicesUrl": "/assets/approvalAuthority.json",
//                   "choicesVerb": "GET"
//                 }
//               }
//             },
//             value: {
//               "ApprovalAuthority": "WithinBranch"
//             },
//             groupTitle:"Approval Authority"        
//           },
//           {
//             id: 8,
//             control: "AdditionalInfo",
//             name: "AdditionalInfo",
//             schema: { 
//               "type": "object",
//               "properties": {
//                 "AdditionalInfo": {
//                   "type": "object",
//                   "properties": {
//                     "EnableEvaluation": {
//                       "type": "boolean",
//                       "title": "Enable Evaluation"
//                     },
//                     "AddJointApplicant": {
//                       "type": "boolean",
//                       "title": "Add Joint Applicant"
//                     }
//                   }
//                 }
//               }
//             },
//             value: {
//               "EnableEvaluation": true,
//               "AddJointApplicant": false
//             },
//             groupTitle:"Additional Info"        
//           },
//     ],
//   },
//   {
//     id: IssueStatus.SELECTED,
//     title: 'Selected',
//     issues: [
//     ],
//   },
//   {
//     id: IssueStatus.IN_PROGRESS,
//     title: 'In Progress',
//     issues: [
//         {
//             id: 1,
//             control: "LoanType",
//             name: "LoanType",
//             schema: { 
//               "type": "object",
//               "properties": {
//                 "LoanType": {
//                   "type": "string",
//                   "widget": "radio",
//                   "choicesUrl": "/assets/loanType.json",
//                   "choicesVerb": "GET"
//                 }
//               }
//             },
//             value: {
//               "LoanType": "New"
//             },
//             groupTitle:"Loan Type"        
//           },
//           {
//             id: 2,
//             control: "CopyCPR",
//             name: "CopyCPR",
//             schema: { 
//               "type": "object",
//               "properties": {
//                 "CopyCPR": {
//                   "type": "string"
//                 }
//               }
//             },
//             value: {
//               "CopyCPR": "test"
//             },
//             groupTitle:"Copy CPR"        
//           },
//           {
//             id: 3,
//             control: "ProposalType",
//             name: "ProposalType",
//             schema: { 
//               "type": "object",
//               "properties": {
//                 "ProposalType": {
//                   "type": "object",
//                   "properties": {
//                   "TakeOver": {
//                     "type": "boolean",
//                     "title": "Take Over"
//                   },
//                   "TopUp": {
//                     "type": "boolean",
//                     "title": "Top Up"
//                   },
//                   "Renewal": {
//                     "type": "boolean"
//                   },
//                   "Enhancement": {
//                     "type": "boolean"
//                   },
//                   "Reduction": {
//                     "type": "boolean"
//                   },
//                   "Restructure": {
//                     "type": "boolean"
//                   },
//                   "Reschedule": {
//                     "type": "boolean"
//                   },
//                   "LegalAction": {
//                     "type": "boolean",
//                     "title": "Legal Action"
//                   },
//                   "WriteOff": {
//                     "type": "boolean",
//                     "title": "Write Off"
//                   },
//                   "Waiver": {
//                     "type": "boolean"
//                   }
//                 }
//                 }
//               }
//             },
//             value: {
//               "ProposalType": {
//                 "TakeOver": true,
//                 "TopUp": false,
//                 "Renewal": true,
//                 "Enhancement": true,
//                 "Reduction": false,
//                 "Restructure": true,
//                 "Reschedule": false,
//                 "LegalAction": false,
//                 "WriteOff": false,
//                 "Waiver": true
//               }
//             },
//             groupTitle:"Proposal Type"        
//           },
//           {
//             id: 4,
//             control: "cif",
//             name: "cif",
//             schema: { 
//               "type": "object",
//               "properties": {
//                 "cif": {
//                   "type": "string"
//                 }
//               }
//             },
//             value: {
//               "cif": "test"
//             },
//             groupTitle:"CIF"        
//           },
//           {
//             id: 5,
//             control: "CustomerType",
//             name: "CustomerType",
//             schema: { 
//               "type": "object",
//               "properties": {
//                 "CustomerType": {
//                   "type": "string",
//                   "widget": "select",
//                   "choicesUrl": "/assets/customerTypes.json",
//                   "choicesVerb": "GET"
//                 }
//               }
//             },
//             value: {
//               "CustomerType": "Individual"
//             },
//             groupTitle:"Customer Type"        
//           },
//           {
//             id: 6,
//             control: "LegalEntity",
//             name: "LegalEntity",
//             schema: { 
//               "type": "object",
//               "properties": {
//                 "LegalEntity": {
//                   "type": "string",
//                   "widget": "select",
//                   "choicesUrl": "/assets/leagalEntities.json",
//                   "choicesVerb": "GET"
//                   }
//               }
//             },
//             value: {
//               "LegalEntity": "Staff"
//             },
//             groupTitle:"Legal Entity"        
//           },
//           {
//             id: 7,
//             control: "ApprovalAuthority",
//             name: "ApprovalAuthority",
//             schema: { 
//               "type": "object",
//               "properties": {
//                 "ApprovalAuthority": {
//                   "type": "string",
//                   "widget": "radio",
//                   "choicesUrl": "/assets/approvalAuthority.json",
//                   "choicesVerb": "GET"
//                 }
//               }
//             },
//             value: {
//               "ApprovalAuthority": "WithinBranch"
//             },
//             groupTitle:"Approval Authority"        
//           },
//           {
//             id: 8,
//             control: "AdditionalInfo",
//             name: "AdditionalInfo",
//             schema: { 
//               "type": "object",
//               "properties": {
//                 "AdditionalInfo": {
//                   "type": "object",
//                   "properties": {
//                     "EnableEvaluation": {
//                       "type": "boolean",
//                       "title": "Enable Evaluation"
//                     },
//                     "AddJointApplicant": {
//                       "type": "boolean",
//                       "title": "Add Joint Applicant"
//                     }
//                   }
//                 }
//               }
//             },
//             value: {
//               "EnableEvaluation": true,
//               "AddJointApplicant": false
//             },
//             groupTitle:"Additional Info"        
//           },
//     ],
//   },
//   {
//     id: IssueStatus.DONE,
//     title: 'Done',
//     issues: [
//     ],
//   },
// ];

export const MOCK_LANES: JLane[] = [
    {
      id: IssueStatus.BACKLOG,
      title: 'Backlog',
      issues: [
        {
          id: '0001',
          priority: IssuePriority.MEDIUM,
          status: IssueStatus.BACKLOG,
          title: 'Behind the 900 stars - Update 08/2020',
          type: IssueType.STORY,
        },
        {
          id: '0002',
          priority: IssuePriority.MEDIUM,
          status: IssueStatus.BACKLOG,
          title: 'Who is the author of Angular Jira clone?',
          type: IssueType.STORY,
        },
      ],
    },
    {
      id: IssueStatus.SELECTED,
      title: 'Selected',
      issues: [
        {
          id: '0003',
          priority: IssuePriority.MEDIUM,
          status: IssueStatus.SELECTED,
          title: 'Set up Akita state management',
          type: IssueType.STORY,
        },
      ],
    },
    {
      id: IssueStatus.IN_PROGRESS,
      title: 'In Progress',
      issues: [
        {
          id: '0004',
          priority: IssuePriority.MEDIUM,
          status: IssueStatus.IN_PROGRESS,
          title: 'Preparing backend API with GraphQL',
          type: IssueType.STORY,
        },
      ],
    },
    {
      id: IssueStatus.DONE,
      title: 'Done',
      issues: [
        {
          id: '0005',
          priority: IssuePriority.MEDIUM,
          status: IssueStatus.DONE,
          title: 'Speak at NGRome 2022',
          type: IssueType.STORY,
        },
      ],
    },
  ];
  

  
