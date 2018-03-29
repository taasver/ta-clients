import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { Client } from './client';

@Injectable()
export class ClientsService {
  private clients: Client[]; // cache 

  constructor(private http: Http) {}

  getClients = (): Observable<Client[]> => {
    let url = `${process.env.API_URL}/clients`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (this.clients) { return Observable.of(this.clients); } // return cached results if its there
    return this.http.get(url, {headers: headers}).map(response => {
      // setup client class instances and store them in cache
      this.clients = response.json().map((data: any) => new Client(data));
      return this.clients;
    });
  }

  getClient = (id: string): Observable<Client> => {
    let url = `${process.env.API_URL}/clients/${id}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url, {headers: headers}).map(response => new Client(response.json()));
  }

  saveClient = (client: Client): Observable<Client> => {
    let url = `${process.env.API_URL}/clients`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, client, {headers: headers}).map(response => new Client(response.json()));
  }

  updateClient = (client: Client): Observable<Client> => {
    let url = `${process.env.API_URL}/clients/${client._id}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.patch(url, client, {headers: headers}).map(response => new Client(response.json()));
  }

}