import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { ContactRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactItemComponent } from './contact-item/contact-item.component';



@NgModule({
  declarations: [ContactsComponent, ContactItemComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class ContactModule { }
