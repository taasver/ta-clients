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

  getClients = (): Observable<any> => {
    let url = `${process.env.API_URL}/clients`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (this.clients) { return Observable.of(this.clients); } // return cached results if its there
    return this.http.get(url, {headers: headers}).map(response => {
      this.clients = response.json(); // store it in cache
      return this.clients;
    });
  }

  getClient = (id: string): Observable<any> => {
    let url = `${process.env.API_URL}/clients/${id}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url, {headers: headers}).map(response => response.json());
  }

  saveClient = (client: Client): Observable<any> => {
    let url = `${process.env.API_URL}/clients`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, client, {headers: headers}).map(response => response.json());
  }

  updateClient = (client: Client): Observable<any> => {
    let url = `${process.env.API_URL}/clients/${client.id}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.patch(url, client, {headers: headers}).map(response => response.json());
  }

}