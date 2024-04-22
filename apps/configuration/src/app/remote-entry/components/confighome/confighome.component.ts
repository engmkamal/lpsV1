/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, OnInit, inject } from '@angular/core';
// import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { JLane, MOCK_LANES } from "../../interface/section";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'lps-confighome',
  templateUrl: './confighome.component.html',
  styleUrl: './confighome.component.scss'
})

export class ConfighomeComponent implements OnInit{  
  
  widgetrendererParam:any;
  title = 'angular-material-drag-and-drop-lists';

  lanes: JLane[];

  sectionFields: any = [ 
    {
      id: 1,
      control: "LoanType",
      name: "LoanType",
      schema: { 
        "type": "object",
        "properties": {
          "LoanType": {
            "type": "string",
            "widget": "radio",
            "choicesUrl": "/assets/loanType.json",
            "choicesVerb": "GET"
          }
        }
      },
      value: {
        "LoanType": "New"
      },
      groupTitle:"Loan Type"        
    },
    {
      id: 2,
      control: "CopyCPR",
      name: "CopyCPR",
      schema: { 
        "type": "object",
        "properties": {
          "CopyCPR": {
            "type": "string"
          }
        }
      },
      value: {
        "CopyCPR": "test"
      },
      groupTitle:"Copy CPR"        
    },
    {
      id: 3,
      control: "ProposalType",
      name: "ProposalType",
      schema: { 
        "type": "object",
        "properties": {
          "ProposalType": {
            "type": "object",
            "properties": {
            "TakeOver": {
              "type": "boolean",
              "title": "Take Over"
            },
            "TopUp": {
              "type": "boolean",
              "title": "Top Up"
            },
            "Renewal": {
              "type": "boolean"
            },
            "Enhancement": {
              "type": "boolean"
            },
            "Reduction": {
              "type": "boolean"
            },
            "Restructure": {
              "type": "boolean"
            },
            "Reschedule": {
              "type": "boolean"
            },
            "LegalAction": {
              "type": "boolean",
              "title": "Legal Action"
            },
            "WriteOff": {
              "type": "boolean",
              "title": "Write Off"
            },
            "Waiver": {
              "type": "boolean"
            }
          }
          }
        }
      },
      value: {
        "ProposalType": {
          "TakeOver": true,
          "TopUp": false,
          "Renewal": true,
          "Enhancement": true,
          "Reduction": false,
          "Restructure": true,
          "Reschedule": false,
          "LegalAction": false,
          "WriteOff": false,
          "Waiver": true
        }
      },
      groupTitle:"Proposal Type"        
    },
    {
      id: 4,
      control: "cif",
      name: "cif",
      schema: { 
        "type": "object",
        "properties": {
          "cif": {
            "type": "string"
          }
        }
      },
      value: {
        "cif": "test"
      },
      groupTitle:"CIF"        
    },
    {
      id: 5,
      control: "CustomerType",
      name: "CustomerType",
      schema: { 
        "type": "object",
        "properties": {
          "CustomerType": {
            "type": "string",
            "widget": "select",
            "choicesUrl": "/assets/customerTypes.json",
            "choicesVerb": "GET"
          }
        }
      },
      value: {
        "CustomerType": "Individual"
      },
      groupTitle:"Customer Type"        
    },
    {
      id: 6,
      control: "LegalEntity",
      name: "LegalEntity",
      schema: { 
        "type": "object",
        "properties": {
          "LegalEntity": {
            "type": "string",
            "widget": "select",
            "choicesUrl": "/assets/leagalEntities.json",
            "choicesVerb": "GET"
            }
        }
      },
      value: {
        "LegalEntity": "Staff"
      },
      groupTitle:"Legal Entity"        
    },
    {
      id: 7,
      control: "ApprovalAuthority",
      name: "ApprovalAuthority",
      schema: { 
        "type": "object",
        "properties": {
          "ApprovalAuthority": {
            "type": "string",
            "widget": "radio",
            "choicesUrl": "/assets/approvalAuthority.json",
            "choicesVerb": "GET"
          }
        }
      },
      value: {
        "ApprovalAuthority": "WithinBranch"
      },
      groupTitle:"Approval Authority"        
    },
    {
      id: 8,
      control: "AdditionalInfo",
      name: "AdditionalInfo",
      schema: { 
        "type": "object",
        "properties": {
          "AdditionalInfo": {
            "type": "object",
            "properties": {
              "EnableEvaluation": {
                "type": "boolean",
                "title": "Enable Evaluation"
              },
              "AddJointApplicant": {
                "type": "boolean",
                "title": "Add Joint Applicant"
              }
            }
          }
        }
      },
      value: {
        "EnableEvaluation": true,
        "AddJointApplicant": false
      },
      groupTitle:"Additional Info"        
    },
  ];

  primaryFields: any = [];

  additionalFields: any = [ 
    {
      id: 31,
      control: "StaffId",
      name: "StaffId",
      schema: { 
        "type": "object",
        "properties": {
          "StaffId": {
            "type": "string"
          }
        }
      },
      value: {
        "StaffId": "2434"
      },
      groupTitle:"Staff Id"        
    },
    {
      id: 32,
      control: "Designation",
      name: "Designation",
      schema: { 
        "type": "object",
        "properties": {
          "Designation": {
            "type": "string"
          }
        }
      },
      value: {
        "Designation": "Officer"
      },
      groupTitle:"Designation"        
    },
    {
      id: 33,
      control: "TenureOfService",
      name: "TenureOfService",
      schema: { 
        "type": "object",
        "properties": {
          "TenureOfService": {
            "type": "number"
          }
        }
      },
      value: {
        "TenureOfService": 3.4
      },
      groupTitle:"Tenure of Service"        
    },
    {
      id: 34,
      control: "OtherTenureOfService",
      name: "OtherTenureOfService",
      schema: { 
        "type": "object",
        "properties": {
          "OtherTenureOfService": {
            "type": "number"
          }
        }
      },
      value: {
        "OtherTenureOfService": 3.4
      },
      groupTitle:"Other Tenure of Service"        
    },
    {
      id: 35,
      control: "DateOfJoining",
      name: "DateOfJoining",
      schema: { 
        "type": "object",
        "properties": {
          "DateOfJoining": {
            "type": "string",
            "widget": "date",
            "dateFormat": "dd/MM/yyyy"
          }
        }
      },
      value: {
        "DateOfJoining": "2019-10-14T18:00:00.000Z"
      },
      groupTitle:"Date of Joining"        
    },
    {
      id: 36,
      control: "DateOfConfirmation",
      name: "DateOfConfirmation",
      schema: { 
        "type": "object",
        "properties": {
          "DateOfConfirmation": {
            "type": "string",
            "widget": "date",
            "dateFormat": "dd/MM/yyyy"
          }
        }
      },
      value: {
        "DateOfConfirmation": "2020-10-14T18:00:00.000Z"
      },
      groupTitle:"Date of Confirmation"        
    }
  ];


  fb = inject(FormBuilder);

  selectedContriesList: any[] = [];

  // form = new FormGroup({
  //   ParentField1: new FormControl('')
  // })

  form!: FormGroup;

  list = [
    {
      id: 1,
      label: 'Asia',
      countries: [
        {
          id: 101,
          label: 'India'
        },
        {
          id: 102,
          label: 'Iran'
        }
      ]
    },
    {
      id: 2,
      label: 'Europe',
      countries: [
        {
          id: 201,
          label: 'France'
        },
        {
          id: 202,
          label: 'Germany'
        }
      ]
    }
  ];

  ngOnInit(): void{

    this.form = this.fb.group({
      ParentField1: [''],
    })


    localStorage.setItem("sectionFields", JSON.stringify(this.sectionFields))
    localStorage.setItem("primaryFields", JSON.stringify(this.primaryFields))
    localStorage.setItem("additionalFields", JSON.stringify(this.additionalFields))

    //this.widgetrendererParam = this.sectionFields;
    this.lanes = MOCK_LANES;

    this.form.get('contintent')?.valueChanges.subscribe((res: number) => {
      console.log(res);
      this.form.get('country')?.setValue(null);
      if(res) {
        this.selectedContriesList = this.list.filter((obj: any) => obj.id === res)[0].countries;
        this.form.get('country')?.enable();
      } else {
        this.form.get('country')?.disable();
      }
    })
  
  }


 
  drop(event: CdkDragDrop<string[]>) {
    console.log(event);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.container.data)
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        //console.log(event.currentIndex)
    }
  }

  submit(){
    console.log(this.form.value);
    this.form.reset();
  }

  pre = `
  sectionFields:
  ${JSON.stringify(this.sectionFields, null, ' ')}
  
  primaryFields:
  ${JSON.stringify(this.primaryFields, null, ' ')}

  additionalFields:
  ${JSON.stringify(this.additionalFields, null, ' ')}`;
  

}
