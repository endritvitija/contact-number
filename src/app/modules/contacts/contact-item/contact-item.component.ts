import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Contacts } from 'src/app/shared/models/contacts.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent implements OnInit {

  @Input() data: any; 

  @Output() contactId = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  getContactId(id: number) {
    this.contactId.emit(id);
  }

}
