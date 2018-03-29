import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Client } from './client';

@Injectable()
export class ClientsService {

  constructor(private http: Http) {}

  getClients = (): Observable<Client[]> => {
    let url = `${process.env.API_URL}/clients`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(url, {headers: headers}).map(response => response.json().map((data: any) => new Client(data)));
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

  updateClient = (id: string, newValues: any): Observable<Client> => {
    let url = `${process.env.API_URL}/clients/${id}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.patch(url, newValues, {headers: headers}).map(response => new Client(response.json()));
  }

}