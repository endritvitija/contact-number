import { Component, Input, OnInit } from '@angular/core';
import { AvatarGenerator } from 'random-avatar-generator';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent implements OnInit {

  @Input() fullName: string; 

  public generator = new AvatarGenerator();

  constructor() { }

  ngOnInit(): void {
  }

  getAvatar() {
    return this.generator.generateRandomAvatar(this.fullName);
  }

}
