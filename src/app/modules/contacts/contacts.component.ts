import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactsService } from 'src/app/core/services/contacts.service';
import { Contacts } from 'src/app/shared/models/contacts.model';
import { NewContactModalComponent } from './new-contact-modal/new-contact-modal.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts: Contacts[] = [];
  contactId: string;

  constructor(private _contactsServices: ContactsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getContacts();
  }

  openEditContact(contactId: string) {
    const dialogRef = this.dialog.open(NewContactModalComponent, {
      width: '90vw',
      data: contactId 
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getContacts();
    });
  }

  getContacts() {
    this._contactsServices.getContacts().subscribe(
      (response) => {
        this.contacts = response;
      },
      (error) => console.log(error)
    );
  }

  deleteContact(contactId: number) {
    this._contactsServices.deleteContact(contactId).subscribe(() => {
      this.getContacts();
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewContactModalComponent, {
      width: '90vw',
      data: null
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getContacts();
    });
  }
}
