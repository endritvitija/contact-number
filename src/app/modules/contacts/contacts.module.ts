import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';



@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    ContactRoutingModule
  ]
})
export class ContactModule { }
