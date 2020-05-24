import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  loading = false;
  newContact: any;

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.loading = true;

    const formValues = Object.assign({}, form.value);

    const contact = {
      name: `${formValues.firstName} ${formValues.lastName}`,
      address: formValues.address,
      phone: `${formValues.areaCode} ${formValues.prefix}-${formValues.lineNumber}`,
      photoUrl: formValues.photo
    };

    this.apiService.postContact(contact)
    .subscribe( data => {
      form.reset();
      this.loading = false;
      this.newContact = data;
    });
  }

}
