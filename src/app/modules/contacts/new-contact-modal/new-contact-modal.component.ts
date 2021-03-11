import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ContactsService } from 'src/app/core/services/contacts.service';
import { Countrie } from 'src/app/shared/models/countrie.model';
import { CountriesService } from 'src/app/core/services/countries.service';
import { AddressesService } from 'src/app/core/services/addresses.service';
import { Address } from 'src/app/shared/models/address.model';

@Component({
  selector: 'app-new-contact-modal',
  templateUrl: './new-contact-modal.component.html',
  styleUrls: ['./new-contact-modal.component.scss'],
})
export class NewContactModalComponent implements OnInit {
  contactsForm = new FormGroup({
    id: new FormControl(0),
    avatar: new FormControl(
      'https://pbs.twimg.com/profile_images/490623209822105600/1JHdK9lS.jpeg'
    ),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    addresses: new FormArray([
      new FormGroup({
        street1: new FormControl(''),
        street2: new FormControl(''),
        town: new FormControl(''),
        country: new FormControl(''),
        contactId: new FormControl(0),
        id: new FormControl(0)
      })
    ])
  });

  countries: Countrie[] = [];
  // addresses: Address[] = [];

  constructor(
    public dialogRef: MatDialogRef<NewContactModalComponent>,
    private _contactsService: ContactsService,
    private _countriesService: CountriesService,
    private _addressService: AddressesService,
    @Inject(MAT_DIALOG_DATA) public contactId: number
  ) {}

  ngOnInit(): void {
    this.getContries();
    if (this.contactId) {
      this.getContact();
    }
  }

  get addresses() {
    return this.contactsForm.get('addresses') as FormArray;
  }

  getContact() {
    this._contactsService.getContact(this.contactId).subscribe(
      (response) => {
        this._addressService.getAddress(this.contactId).subscribe(
          (resAddress) => {
            console.log(resAddress)
            this.contactsForm.patchValue({
              id: this.contactId,
              avatar: response.avatar,
              first_name: response.first_name,
              last_name: response.last_name,
              addresses: resAddress
            });
            console.log(this.contactsForm.value)
          },
          (error) => console.error(error)
        );
  
      },
      (error) => console.error(error)
    );

  }

  getContries() {
    this._countriesService.getCountries().subscribe((response) => {
      this.countries = response;
    });
  }

  editContact() {
    this._addressService.addContactAddress(this.contactsForm.value.addresses, this.contactsForm.value.id).subscribe(
      (res) => {
        console.log(res)
        this.onCloseModal();
      },
      (error) => console.error(error)
    );
  }

  onSubmit() {
    if (this.contactId) {
      this.editContact();
    } else {
      this._contactsService.addContact(this.contactsForm.value).subscribe(
        () => {
          this.onCloseModal();
        },
        (error) => console.error(error)
      );
    }
  }

  onCloseModal(): void {
    this.dialogRef.close();
  }
}
