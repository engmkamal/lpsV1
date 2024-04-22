import { HttpClient } from '@angular/common/http';
import { Component, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'lps-cprinitiationhome',
  templateUrl: './cprinitiationhome.component.html',
  styleUrl: './cprinitiationhome.component.scss',
})
export class CprinitiationhomeComponent {

  fb = inject(FormBuilder);
  http = inject(HttpClient);

  allAddedFields: WritableSignal<any[]> = signal([]);
  sectionForm!: FormGroup;
  form!: FormGroup;

  fieldTobeAdded = new FormControl("");
  fieldTobeRemoved = new FormControl("");


  addRemoveField!: FormGroup;

  allAdditionalFields: WritableSignal<any[]> = signal([ 
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
  ]);

  preInfoAdditionalFields = [ 
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

  allPrimaryFields: WritableSignal<any[]> = signal([ 
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
  ]);

  preInfoPrimaryFields = [ 
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

  //sectionFields = computed( ()=> [ ...this.allPrimaryFields(), ...this.allAddedFields() ]  );



  field2beAdded = signal('');
  field2beRemoved = signal('');

  // field2beAdded = toSignal(this.fieldTobeAdded.valueChanges);
  // field2beRemoved = toSignal(this.fieldTobeRemoved.valueChanges);

  primaryFields: WritableSignal<any[]> = signal([ 
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
  ]);

  additionalFields: WritableSignal<any[]> = signal([ 
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
        },
        hidden: true
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
        },
        hidden: true
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
        },
        hidden: true
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
        },
        hidden: true
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
        },
        hidden: true
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
        },
        hidden: true
      },
      value: {
        "DateOfConfirmation": "2020-10-14T18:00:00.000Z"
      },
      groupTitle:"Date of Confirmation"        
    }
  ]);


  addedFields = computed( ()=> this.additionalFields().filter((fields)=>fields.schema.hidden !== true)   );

  fieldsToAdd = computed( ()=> this.additionalFields().filter((fields)=>fields.schema.hidden === true)   );

  constructor(){
    // effect(()=>{
    //   this.fieldTobeAdded.patchValue(this.field2beAdded(), { emitEvent:false });
    //   this.fieldTobeRemoved.patchValue(this.field2beRemoved(), { emitEvent:false });
    // })

    // this.fieldTobeAdded.valueChanges.subscribe((val) =>
    //   this.field2beAdded.set(val ?? '')
    // );

    // this.fieldTobeRemoved.valueChanges.subscribe((val) =>
    //   this.field2beRemoved.set(val ?? '')
    // );

    
    // this.fieldTobeAdded.valueChanges
    //   .subscribe((res:any) => {

    //     this.allAddedFields().push(res);
    //     this.allAdditionalFields().slice(res);
    //     this.field2beAdded.set(res ?? '');
    //     this.addRemoveField.controls['fieldTobeAdded'].reset();
        
    //     const filter = { ...res }
    //     // Object.keys(res).forEach(key=>{
    //     //   if (!res[key])
    //     //       filter.delete(key)
    //     //   else
    //     //       filter[key]=filter[key].toLowerCase();
    //     //  })
    //      return filter;
    //   });

    // this.addRemoveField.controls['fieldTobeAdded'].valueChanges
    //   .subscribe(res=>{
    //     console.log('valueChanges');
    //     const filter={...res}
    //     // Object.keys(res).forEach(key=>{
    //     //   if (!res[key])
    //     //       filter.delete(key)
    //     //   else
    //     //       filter[key]=filter[key].toLowerCase();
    //     //  })
    //      return filter;
    //   });



  }

  ngOnInit(){
    // this.form = this.fb.group({ });


    // this.sectionForm = this.fb.group({ 
    //   primaryFieldsControl: this.fb.group({ 
    //     fieldTobeAdded: [''],
    //     fieldTobeRemoved: [''],
    //   }),
    //   additionalFieldsControl: this.fb.group({ 
    //     fieldTobeAdded: [''],
    //     fieldTobeRemoved: [''],
    //   }),
    // })

    this.addRemoveField = this.fb.group({ 
      fldToAdd: [''],
      fldToRemove: [''],
    })
   

    // this.addRemoveField = new FormGroup({
    //   fldToAdd: new FormControl(''),
    //   fldToRemove: new FormControl('')
    // })


  }

  getFields(){
    //return this.http.get()
  }

  addSelectedField(fld?:any){

    let sFld = this.addRemoveField.controls['fldToAdd'].value;
    sFld.schema.hidden = false;
    
    const mFld = this.additionalFields().map(obj => {
      if(obj.id === sFld.id){
        const scma = obj.schema;
        scma.hidden = false
        return { ...obj, schema: scma }
      } 
      return obj
    })

    const mFldSig = signal(mFld);
    
    this.additionalFields.update((fields)=>
    [
      ...mFldSig()
    ])

    // this.additionalFields.update((fields)=>
    // [
    //   ...fields.filter((fs)=>fs.id != sFld.id),
    //   sFld
    // ])

  }

  removeSelectedField(fld?:any){

    const sFld = this.addRemoveField.controls['fldToRemove'].value;
    sFld.schema.hidden = true;
    const mFld = this.additionalFields().map(obj => {
      if(obj.id === sFld.id){
        const scma = obj.schema;
        scma.hidden = true
        return { ...obj, schema: scma }
      } 
      return obj
    })

    const mFldSig = signal(mFld);
    this.additionalFields.update((fields)=>
    [
      ...mFldSig()
    ])
    
    // this.additionalFields.update((fields)=>
    // [
    //   ...fields.filter((fs)=>fs.id != sFld.id),
    //   sFld
    // ])

  }





}
