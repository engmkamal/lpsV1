// import { Component } from '@angular/core';
// import { BaseComponent } from '../base/base.component';

// /**
//  * checkbox input
//  */
// @Component({
//   selector: 'lps-checkbox',
//   templateUrl: './checkbox.component.html',
//   styleUrls: ['./checkbox.component.scss']
// })
// export class CheckboxComponent extends BaseComponent {}

//==========================================
import { Component, OnInit } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { BaseComponent } from '../base/base.component';

import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormControl, FormArray, FormGroup } from "@angular/forms";

@Component({
  selector: 'lps-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends BaseComponent implements OnInit {

  //interestFormGroup: FormGroup;

  override ngOnInit(): void {
    super.ngOnInit()
    if (!this.state.value)
      this.state.value = []
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.state.value.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.state.control.setValue(this.state.value)
  }

  remove(fruit: string): void {
    const index = this.state.value.indexOf(fruit);

    if (index >= 0) {
      this.state.value.splice(index, 1);
    }

    this.state.control.setValue(this.state.value)
  }

  edit(fruit: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.state.value.indexOf(fruit);
    if (index >= 0) {
      this.state.value[index] = value;
    }

    this.state.control.setValue(this.state.value)
  }

  onChange(selectedOption: MatCheckboxChange) {
    // // const interests = (<FormArray>(
    // //   this.interestFormGroup.get("interests")
    // // )) as FormArray;

       const interests = (<FormArray>(
        this.state.control
        //(this.state.control as FormArray).controls
    )) as FormArray;

    if (selectedOption.checked) {
      //this.formArray().push(new FormControl(selectedOption.source.value));
      interests.controls.push(new FormControl(selectedOption.source.value));
      //this.state.value.push(selectedOption.source.value);
    } else {
      // const i = interests.controls.findIndex(
      //   x => x.value === selectedOption.source.value
      // );

      const index = this.state.value.indexOf(selectedOption)
      this.state.value.removeAt(index);
    }
    console.log("");
  }
}

