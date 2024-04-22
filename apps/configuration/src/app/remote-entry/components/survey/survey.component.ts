import { HttpClient } from '@angular/common/http';
import { Component, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { toSignal } from "@angular/core/rxjs-interop";
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'lps-survey',
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.scss',
})
export class SurveyComponent {

  fb = inject(FormBuilder);
  http = inject(HttpClient);

  addedFields: WritableSignal<any[]> = signal([]);
  sectionForm!: FormGroup;
  form!: FormGroup;
  addRemoveField!: FormGroup;

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

  sectionFields = computed( ()=> [ ...this.primaryFields(), ...this.addedFields() ]  );

  fieldTobeAdded = new FormControl("");
  fieldTobeRemoved = new FormControl("");

  field2beAdded = signal('');
  field2beRemoved = signal('');

  surveyForm!: FormGroup;

  showFld = true;

  // field2beAdded = toSignal(this.fieldTobeAdded.valueChanges);
  // field2beRemoved = toSignal(this.fieldTobeRemoved.valueChanges);

  constructor(){
    effect(()=>{
      this.fieldTobeAdded.patchValue(this.field2beAdded(), { emitEvent:false });
      this.fieldTobeRemoved.patchValue(this.field2beRemoved(), { emitEvent:false });
    })

    // this.fieldTobeAdded.valueChanges.subscribe((val) =>
    //   this.field2beAdded.set(val ?? '')
    // );

    this.fieldTobeRemoved.valueChanges.subscribe((val) =>
      this.field2beRemoved.set(val ?? '')
    );

    
    this.fieldTobeAdded.valueChanges
      .subscribe((res:any) => {

        this.addedFields().push(res);
        this.additionalFields().slice(res);
        this.field2beAdded.set(res ?? '');
        this.addRemoveField.controls['fieldTobeAdded'].reset();
        
        const filter = { ...res }
        // Object.keys(res).forEach(key=>{
        //   if (!res[key])
        //       filter.delete(key)
        //   else
        //       filter[key]=filter[key].toLowerCase();
        //  })
         return filter;
      });

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
    this.form = this.fb.group({ });


    this.sectionForm = this.fb.group({ 
      primaryFieldsControl: this.fb.group({ 
        fieldTobeAdded: [''],
        fieldTobeRemoved: [''],
      }),
      additionalFieldsControl: this.fb.group({ 
        fieldTobeAdded: [''],
        fieldTobeRemoved: [''],
      }),
    })

    this.addRemoveField = this.fb.group({
      fieldTobeAdded: [''],
      fieldTobeRemoved: [''],
    })

    this.surveyForm = this.fb.group({
      surveyq1: [''],
      surveyq2: [''],
      surveyq3: [''],
      surveyq4: [''],
      surveyq5: [''],
      surveyq6: [''],
      surveyq7: ['']
    })

    this.onChanges();

    
  }

  onChanges(): void {
    // this.surveyForm.valueChanges
    //   .pipe(
    //     debounceTime(500)
    //   )
    //   .subscribe(values => console.log(values));

    // this.surveyForm.controls['surveyq2'].valueChanges
    // .subscribe(values => (values == 'No')? (this.showFld = false) :(this.showFld = false));


    this.surveyForm.controls['surveyq2'].valueChanges
    .subscribe(values => {
      if(values == 'No'){
        return this.showFld = false;
      }else{
        return this.showFld = true;
      }
    });

    // this.surveyForm.controls['surveyq4'].valueChanges
    // .subscribe(values => this.showFld = false);


    // this.surveyForm.controls['surveyq6'].valueChanges
    // .subscribe(values => this.showFld = false);
  }

  getFields(){
    //return this.http.get()
  }





}
