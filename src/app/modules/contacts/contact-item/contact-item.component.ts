import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Contacts } from 'src/app/shared/models/contacts.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent implements OnInit {

  @Input() data: any; 

  @Output() deleteEvent = new EventEmitter<number>();
  @Output() openEditEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  editContact(id: string) {
    this.openEditEvent.emit(id);
  }

  deleteContact(id: number) {
    this.deleteEvent.emit(id);
  }

}
