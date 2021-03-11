import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts = [
    { name: 'Endrit', surname: 'Vitija' },
    { name: 'Endritt', surname: 'Vitija' },
    { name: 'Endriit', surname: 'Vitija' },
    { name: 'Endrrit', surname: 'Vitija' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
