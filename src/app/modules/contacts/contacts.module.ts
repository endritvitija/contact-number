import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactItemComponent } from './contact-item/contact-item.component';
import { HttpClientModule } from '@angular/common/http';
import { NewContactModalComponent } from './new-contact-modal/new-contact-modal.component';


@NgModule({
  declarations: [ContactsComponent, ContactItemComponent, NewContactModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ContactRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class ContactModule { }
