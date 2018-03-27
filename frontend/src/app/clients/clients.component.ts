import { Component, OnInit, OnDestroy } from '@angular/core';

import { ClientsService } from './clients.service';
import { Client } from './client';

@Component({
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit, OnDestroy {
  query: string = ''; // search input text
  private clients: Client[] = []; // full list of clients
  filteredClients: Client[] = []; // list that will be displayed
  isLoading: boolean = true;
  isError: boolean = false;
  private subscription: any;

  constructor(private clientsService: ClientsService) {}

  ngOnInit() {
    this.subscription = this.clientsService.getClients().subscribe(data => {
      this.isLoading = false;
      this.clients = data;
      this.filteredClients = this.clients; // display all by default
    }, error => {
      this.isLoading = false;
      this.isError = true;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Filter all clients based on query string. Search from names and numbers
  search() {
    this.filteredClients = this.clients.filter((client: Client) => {
      return client.firstName.toLowerCase().indexOf(this.query.toLowerCase()) > -1 || // case insensitive
             client.phone.indexOf(this.query) > -1; 
    });
  }

  clearQuery = () => {
    this.query = '';
    this.search();
  }

}