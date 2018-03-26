import { Http, Headers, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

import { ClientsService } from './clients.service';

describe('ClientsService', () => {

  let service: ClientsService;
  let spy: jasmine.Spy;

  beforeEach(() => {
    const http = new Http(new MockBackend(), new BaseRequestOptions());
    spy = spyOn(http, 'get').and.returnValue(
      Observable.of(new Response(new ResponseOptions({
        body: JSON.stringify({})
      })))
    );
    service = new ClientsService(http);
  });

  it('should call the backend on getClients call and cache the results', done => {
    service.getClients().subscribe(() => {
      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.first().args[0]).toBe('http://test.test/clients');
      service.getClients().subscribe(() => {
        expect(spy.calls.count()).toBe(1);
        done();
      });        
    });
  });

});