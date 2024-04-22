/* eslint-disable @typescript-eslint/no-explicit-any */

import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { IFieldsnavigationState } from '../models/fieldsnavigation';
import { computed, inject } from '@angular/core';
import { FieldsnavigationService } from './fieldsnavigation.service';

const initialState: IFieldsnavigationState = {
    fields: [],
    loading: false,
    filter: 'all'
}

export const FieldsnavigationStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods(
        (store, fieldsnavService = inject(FieldsnavigationService))=>({

            async loadAll(){

                patchState(store, {loading: true});

                const fields:any = await fieldsnavService.getFieldsnavigation();

                patchState(store, {fields, loading: false});
            }
        })
    ),
    withComputed((state) => ({
        filteredFields: computed(()=>{
            const fields = state.fields();

            // const ff = fields
            //         .filter((x:any) => x.status === status)
            //         .sort((a:any, b:any) => a.listPosition - b.listPosition))






        })
    }))
)


