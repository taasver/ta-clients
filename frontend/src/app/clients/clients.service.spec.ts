import { Http, Headers, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

import { ClientsService } from './clients.service';
import { Client } from './client';

describe('ClientsService', () => {

  let service: ClientsService;
  let spyGet: jasmine.Spy;
  let spyPost: jasmine.Spy;
  let spyPatch: jasmine.Spy;

  beforeEach(() => {
    const http = new Http(new MockBackend(), new BaseRequestOptions());
    spyGet = spyOn(http, 'get').and.returnValue(
      Observable.of(new Response(new ResponseOptions({ body: JSON.stringify([]) })))
    );
    spyPost = spyOn(http, 'post').and.returnValue(
      Observable.of(new Response(new ResponseOptions({ body: JSON.stringify({}) })))
    );
    spyPatch = spyOn(http, 'patch').and.returnValue(
      Observable.of(new Response(new ResponseOptions({ body: JSON.stringify({}) })))
    );
    service = new ClientsService(http);
  });

  it('should call the backend on getClients call', done => {
    service.getClients().subscribe(() => {
      expect(spyGet.calls.count()).toBe(1);
      expect(spyGet.calls.first().args[0]).toBe('http://test.test/clients');
      done();
    });
  });

  it('should call the backend on getClient call', done => {
    service.getClient('123').subscribe(() => {
      expect(spyGet.calls.count()).toBe(1);
      expect(spyGet.calls.first().args[0]).toBe('http://test.test/clients/123');
      done();   
    });
  });

  it('should call the backend on saveClient call', done => {
    let client = new Client({ email: 'test@email.com', phone: '123223' });
    service.saveClient(client).subscribe(() => {
      expect(spyPost.calls.count()).toBe(1);
      expect(spyPost.calls.first().args[0]).toBe('http://test.test/clients');
      expect(spyPost.calls.first().args[1].email).toBe('test@email.com');
      done();
    });
  });

  it('should call the backend on updateClient call', done => {
    let client = new Client({email: 'test@email.com'});
    service.updateClient('123', client).subscribe(() => {
      expect(spyPatch.calls.count()).toBe(1);
      expect(spyPatch.calls.first().args[0]).toBe('http://test.test/clients/123');
      expect(spyPatch.calls.first().args[1].email).toBe('test@email.com');
      done();
    });
  });

});