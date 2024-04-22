/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl } from "@angular/forms";
import { Schema } from "./schema";

export class State {
    /**
     * form control handling this state
     */
    control!: AbstractControl;

    /**
     * name of the state
     */
    name!: string;

    /**
     * schema for this state
     */
    schema!: Schema;

    /**
     * current value
     */
    value: any;

    /**
     * Group Label Text
    */
    groupTitle?: string;
}
