import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { ContactsService } from 'src/app/core/services/contacts.service';

@Component({
  selector: 'app-new-contact-modal',
  templateUrl: './new-contact-modal.component.html',
  styleUrls: ['./new-contact-modal.component.scss']
})
export class NewContactModalComponent implements OnInit {

  contactsForm = new FormGroup({
    id: new FormControl(Math.random().toString(36).substr(2, 9)),
    avatar: new FormControl('https://pbs.twimg.com/profile_images/490623209822105600/1JHdK9lS.jpeg'),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
  })

  constructor(
    public dialogRef: MatDialogRef<NewContactModalComponent>, private _contactsService: ContactsService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    this._contactsService.addContact(this.contactsForm.value).subscribe(res => {
      this.onCloseModal();
    }, error => console.error(error));
  }

  onCloseModal(): void {
    this.dialogRef.close();
  }

}
