import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClientsService } from './clients.service';
import { Client } from './client';

@Component({
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
  client: Client;
  isLoading: boolean = true; // client loader
  isFormLoading: boolean = false; // form loader
  isFormSubmitted: boolean = false; // form submitted
  isFormSuccessful: boolean = false; // form submitted & successful
  error: string;

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService
  ) {}

  ngOnInit() {
    // listen for url changes (including inital load)
    this.route.params.subscribe((params: any) => {
      this.reset();
      // new client
      if (!params.id) {
        this.isLoading = false;
        this.client = new Client();
        return;
      }
      // existing client
      this.clientsService.getClient(params.id).subscribe(data => {
        this.isLoading = false;
        this.client = data;
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
    this.isFormLoading = true;
    if (this.client.id) { // update existing client
      this.clientsService.updateClient(this.client).subscribe(this.clientSuccessfullySaved, error => {
        this.isFormLoading = false;
        this.error = 'Oops! Could not save the client';
      });
    } else { // save new client
      this.clientsService.saveClient(this.client).subscribe(this.clientSuccessfullySaved, error => {
        this.isFormLoading = false;
        this.error = 'Oops! Could not create new client';
      });
    }
  }

  private clientSuccessfullySaved = (client: Client) => {
    this.client = client;
    this.isFormLoading = false;
    this.isFormSuccessful = true;
    setTimeout(() => { this.isFormSuccessful = false; }, 3000); // display success for 3s
  }

  // reset all component data
  private reset = () => {
    this.client = null;
    this.isLoading = true;
    this.isFormLoading = false;
    this.isFormSubmitted = false;
    this.isFormSuccessful = false;
    this.error = null;
  }

}