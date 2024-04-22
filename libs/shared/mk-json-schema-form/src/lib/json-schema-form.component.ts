/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
//import { FormArray } from '@angular/forms';
import { BaseComponent } from '../index';
import { AdditionalPropertiesComponent } from './additional-properties/additional-properties.component';
import { ArrayComponent } from './array/array.component';
import { JsonPointer } from './json-pointer';
import { ObjectComponent } from './object/object.component';
import { Schema } from './schema';
import { State } from './state';
import { TabComponent } from './tab/tab.component';
import { TableComponent } from './table/table.component';
import { WrapperComponent } from './wrapper/wrapper.component';

/**
 * entry component
 */
@Component({
  selector: 'lps-json-schema-form',
  //template: `<lps-wrapper [state]="resolvedState"></lps-wrapper>`,
  template: `
  <div class="form-group row" *ngIf="state.schema.type === 'checkboxGroup' ">
    <label class="col-sm-3 col-form-label">{{ resolvedState.groupTitle }}</label>
    <span style="width:1px;"><label class="col-form-label">:</label></span>
    <div class="col-sm-8">
      <lps-wrapper [state]="resolvedState"></lps-wrapper>
    </div>
  </div>
  <div class="form-group row" *ngIf="state.schema.type !== 'checkboxGroup' ">
    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
      <label class="col-form-label">{{ resolvedState.groupTitle }}</label>
      <span class="col-form-label">:</span>
    </div>
    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
      <lps-wrapper [state]="resolvedState"></lps-wrapper>
    </div>

  </div>`,
  styles: []
})
export class JsonSchemaFormComponent implements OnInit {

  @Input() state!: State;

  resolvedState!: State

  /**
   * register container form elements to avoid cyclic imports
   */
  ngOnInit(): void {

    const clone: Schema = JSON.parse(JSON.stringify(this.state.schema))

    this.resolvedState = {
      value: this.state.value,
      schema: clone,
      control: this.state.control,
      name: this.state.name,
      groupTitle: this.state.groupTitle
    }

    WrapperComponent.arrayComponent = ArrayComponent
    WrapperComponent.tabComponent = TabComponent
    WrapperComponent.tableComponent = TableComponent
    WrapperComponent.objectComponent = ObjectComponent
    WrapperComponent.additionalPropertiesComponent = AdditionalPropertiesComponent

    this.resolve(clone)

    BaseComponent.prepareControl(this.state.control, clone, this.state.value, false)
  }

  resolve(schema?: Schema) {
    if (!schema)
      return
    if (schema.$ref) {
      if (schema.$ref.startsWith('#'))
        for (const [k, v] of Object.entries(JsonPointer.jsonPointer(this.state.schema, schema.$ref.substring(1))))
          (schema as any)[k] = v
    }
    this.resolve(schema.additionalProperties)
    this.resolve(schema.items)
    if (schema.properties)
      for (const prop of Object.values(schema.properties))
        this.resolve(prop)
  }
}
