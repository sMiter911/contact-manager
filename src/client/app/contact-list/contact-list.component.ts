import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: any;

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getContacts().subscribe( data =>
      this.contacts = data);
    console.log(this.contacts);
  }

}
