import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialmodulesModule } from '@lps/utils';

@Component({
  selector: 'lps-configparent',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MaterialmodulesModule ],
  templateUrl: './configparent.component.html',
  styleUrl: './configparent.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: ()=> inject(ControlContainer, {skipSelf:true})
    }
  ]
})
export class ConfigparentComponent implements OnInit {
  
  @Input({ required:true }) controlKey = '';
  parentContainer = inject(ControlContainer)

  get parentFormGroup(){
    return this.parentContainer.control as FormGroup;
  }

  selectedContriesList: any[] = [];

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

  ngOnInit(){
    this.parentFormGroup.addControl(this.controlKey,
      new FormGroup({
        contintent: new FormControl(''),
        country: new FormControl('') 
      }))

      this.parentFormGroup.get('contintent')?.valueChanges.subscribe((res: number) => {
        console.log(res);
        this.parentFormGroup.get('country')?.setValue(null);
        if(res) {
          this.selectedContriesList = this.list.filter((obj: any) => obj.id === res)[0].countries;
          this.parentFormGroup.get('country')?.enable();
        } else {
          this.parentFormGroup.get('country')?.disable();
        }
      })
  }

  selectContintent(e:any){
    //
  }

  ngOnDestroy(){
    this.parentFormGroup.removeControl(this.controlKey)
  }
}
