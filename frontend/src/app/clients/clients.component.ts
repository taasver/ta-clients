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
    this.subscription = this.clientsService.getClients().subscribe(clients => {
      this.isLoading = false;
      this.clients = clients;
      this.filteredClients = this.clients; // display all by default
    }, error => {
      this.isLoading = false;
      this.isError = true;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Filter all clients based on query string. Search from names, numbers and emails etc (case insensitive)
  search() {
    let query = this.query.toLowerCase();
    let searchFields: string[] = ['id', 'email', 'phone', 'firstName', 'lastName', 'company'];
    this.filteredClients = this.clients.filter((client: Client) => {
      for (var i = 0; i < searchFields.length; i++) {
        let field = searchFields[i];
        if (client[field] && client[field].toLowerCase().indexOf(query) > -1) { return true; }
      }
      return false; // no match by default
    });
  }

  clearQuery = () => {
    this.query = '';
    this.search();
  }

}