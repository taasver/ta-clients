import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientsService } from './clients.service';
import { Client } from './client';

@Component({
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
  private originalClient: Client; // needed to detect updated fields
  client: Client;
  isLoading: boolean = true; // client loader
  isFormLoading: boolean = false; // form loader
  isFormSubmitted: boolean = false; // form submitted
  isFormSuccessful: boolean = false; // form submitted & successful
  error: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientsService: ClientsService
  ) {}

  ngOnInit() {
    // listen for url changes (including inital load)
    this.route.params.subscribe((params: any) => {
      this.reset();
      // new client
      if (!params.id) {
        this.isLoading = false;
        this.client = new Client({});
        return;
      }
      // existing client
      this.clientsService.getClient(params.id).subscribe(client => {
        this.isLoading = false;
        this.client = client;
        this.originalClient = JSON.parse(JSON.stringify(client)); // clone
      }, error => {
        this.isLoading = false;
        this.error = 'Oops! Could not load the client';
      });
    });    
  }

  onSubmit = (event: any) => {
    event.preventDefault(); // do not actually submit
    this.error = null;
    this.isFormSubmitted = true;
    if (!this.client.isValid()) {
      this.error = 'Please fill in all the required data';
      return;
    }
    if (this.client._id) { // update existing client
      let newData = {};
      // detect fields that need to be updated
      Object.keys(this.client).forEach(key => {
        if (typeof this.client[key] !== 'function' && this.client[key] !== this.originalClient[key]) {
          newData[key] = this.client[key];
        }
      });
      if (Object.keys(newData).length === 0) { return; } // don't submit if no changes
      this.isFormLoading = true;
      this.clientsService.updateClient(this.client._id, newData).subscribe(this.clientSuccessfullySaved, error => {
        this.isFormLoading = false;
        this.error = error.json().message || 'Oops! Could not save the client';
      });
    } else { // save new client and go back to list page
      this.isFormLoading = true;
      this.clientsService.saveClient(this.client).subscribe(client => {
        this.clientSuccessfullySaved(client);
        setTimeout(() => this.router.navigate(['/']), 1000); // back to list page in 1s
      }, error => {
        this.isFormLoading = false;
        this.error = error.json().message || 'Oops! Could not save the client';
      });
    }
  }

  private clientSuccessfullySaved = (client: Client) => {
    this.client = client;
    this.originalClient = JSON.parse(JSON.stringify(client)); // clone
    this.isFormLoading = false;
    this.isFormSuccessful = true;
    setTimeout(() => { this.isFormSuccessful = false; }, 3000); // display success for 3s
  }

  // reset all component data
  private reset = () => {
    this.client = null;
    this.originalClient = null;
    this.isLoading = true;
    this.isFormLoading = false;
    this.isFormSubmitted = false;
    this.isFormSuccessful = false;
    this.error = null;
  }

}