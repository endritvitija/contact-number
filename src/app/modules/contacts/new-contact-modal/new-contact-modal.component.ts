import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ContactsService } from 'src/app/core/services/contacts.service';
import { Countrie } from 'src/app/shared/models/countrie.model';
import { CountriesService } from 'src/app/core/services/countries.service';
import { AddressesService } from 'src/app/core/services/addresses.service';
import { Address } from 'src/app/shared/models/address.model';
import { SnackBarService } from 'src/app/core/services/snackbar.service';

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
    addresses: new FormArray([]),
  });

  countries: Countrie[] = [];

  constructor(
    public dialogRef: MatDialogRef<NewContactModalComponent>,
    private _contactsService: ContactsService,
    private _countriesService: CountriesService,
    private _addressService: AddressesService,
    private _snackBarService: SnackBarService,
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

  removeAddress(index: number, contactId: number) {
    this._addressService.delete(contactId).subscribe(() => {
      this._snackBarService.displaySuccess('Address deleted successfully', 'OK')
      this.addresses.removeAt(index);
    });
  }

  addAddress() {
    this.addresses.push(
      new FormGroup({
        street1: new FormControl(''),
        street2: new FormControl(''),
        town: new FormControl(''),
        country: new FormControl(''),
        contactId: new FormControl(this.contactId),
        id: new FormControl(0),
      })
    );
  }

  getContact() {
    this._contactsService.getOne(this.contactId).subscribe(
      (response) => {
        this._addressService.getOne(this.contactId).subscribe(
          (resAddress: Address[]) => {
            resAddress.forEach(() => this.addAddress());
            this.contactsForm.patchValue({
              id: this.contactId,
              avatar: response.avatar,
              first_name: response.first_name,
              last_name: response.last_name,
              addresses: resAddress,
            });
          },
          () =>
            this._snackBarService.displayFailure(
              'Address fetch failed',
              'Refresh page'
            )
        );
      },
      () =>
        this._snackBarService.displayFailure(
          'Contact fetch failed',
          'Refresh page'
        )
    );
  }

  getContries() {
    this._countriesService.get().subscribe(
      (response) => {
        this.countries = response;
      },
      () =>
        this._snackBarService.displayFailure(
          'Countries fetch failed',
          'Refresh page'
        )
    );
  }

  editContact() {
    const contact = this.contactsForm.value;
    this._contactsService
      .edit({
        id: contact.id,
        first_name: contact.first_name,
        last_name: contact.last_name,
        avatar: contact.avatar,
      })
      .subscribe(
        () => {
          this._snackBarService.displaySuccess('Contact updated successfully', 'OK');
          this.onCloseModal(true);
        },
        () =>
          this._snackBarService.displayFailure(
            'Edit Contact failed',
            'Please try again'
          )
      );
  }

  onAddressSubmit() {
    this.addresses.value.forEach((address: Address) => {
      if (address.id > 0) {
        this._addressService.update(address, address.id).subscribe(
          () => {
            this._snackBarService.displaySuccess('Address updated successfully', 'OK');
            this.onCloseModal(true);
          },
          () =>
            this._snackBarService.displayFailure(
              'Address submit failed',
              'Refresh page'
            )
        );
      } else {
        this._addressService.add(address).subscribe(
          () => {
            this._snackBarService.displaySuccess('Address added successfully', 'OK');
            this.onCloseModal(true);
          },
          () =>
            this._snackBarService.displayFailure(
              'Address submit failed',
              'Please try again'
            )
        );
      }
    });
  }

  onSubmit() {
    if (this.contactId) {
      this.editContact();
      this.onAddressSubmit();
    } else {
      this._contactsService.add(this.contactsForm.value).subscribe(
        () => {
          this._snackBarService.displaySuccess('Contact created successfully', 'OK')
          this.onCloseModal(true);
        },
        () =>
          this._snackBarService.displayFailure(
            'Add contact failed',
            'Please try again'
          )
      );
    }
  }

  onCloseModal(request: boolean): void {
    this.dialogRef.close(request);
  }
}
