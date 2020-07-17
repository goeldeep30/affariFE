import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    exports: [
        CardModule,
        DropdownModule
    ]
})
export class PrimeNgModule { }