import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ClientComponent } from './client.component';
import { ClientsService }   from './clients.service';
import { Client }   from './client';

let comp: ClientComponent;
let fixture: ComponentFixture<ClientComponent>;
let spyGet: jasmine.Spy;
let spySave: jasmine.Spy;
let spyUpdate: jasmine.Spy;

const TEST_CLIENT: Client = new Client({
  '_id': '123',
  'email': 'michael@kr.com',
  'phone': '*** *** **** 2006',
  'firstName': 'Michael',
  'lastName': 'Knight',
  'photo': 'https://test.test/photo.jpg',
  'company': 'Knight rider',
  'country': 'USA',
  'city': 'Los Angeles',
  'address': 'Rider Blv 4',
  'postalCode': '410032'
});

describe('ClientComponent', () => {

  describe('New client', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ FormsModule, RouterTestingModule ],
        declarations: [ ClientComponent ],
        providers: [ {provide: ClientsService, useClass: ClientsServiceStub} ]
      });
      fixture = TestBed.createComponent(ClientComponent);
      comp    = fixture.componentInstance;
      spyGet  = spyOn(fixture.debugElement.injector.get(ClientsService), 'getClient').and.callThrough();
      spySave = spyOn(fixture.debugElement.injector.get(ClientsService), 'saveClient').and.callThrough();
      fixture.detectChanges();
    });

    it('should initialize empty client if no id in the url', () => {
      expect(comp.client).toBeDefined();
      expect(comp.client.phone).toBeUndefined();
      expect(comp.client.email).toBeUndefined();
      expect(spyGet.calls.count()).toBe(0);
    });

    it('should throw an error when trying to save empty client', fakeAsync(() => {
      let submitBtn = fixture.debugElement.query(By.css('button')).nativeElement;
      submitBtn.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      let errorDiv = fixture.debugElement.query(By.css('.client__error')).nativeElement;
      expect(comp.error).toBe('Please fill in all the required data');
      expect(errorDiv.textContent).toContain('Please fill in all the required data');
      expect(spySave.calls.count()).toBe(0);
    }));

    it('should submit the new client', fakeAsync(() => {
      comp.client.phone = '123';
      comp.client.email = 'test@test.ee';
      let submitBtn = fixture.debugElement.query(By.css('button')).nativeElement;
      submitBtn.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(3000); // timeout for success message
      expect(comp.error).toBe(null);
      expect(spySave.calls.count()).toBe(1);
    }));

  });

  describe('Existing client', () => {

    let activatedRoute: ActivatedRouteStub;

    beforeEach(() => {
      activatedRoute = new ActivatedRouteStub();
      TestBed.configureTestingModule({
        imports: [ FormsModule, RouterTestingModule ],
        declarations: [ ClientComponent ],
        providers: [
          { provide: ClientsService, useClass: ClientsServiceStub },
          { provide: ActivatedRoute, useValue: activatedRoute },
        ]
      });
      fixture = TestBed.createComponent(ClientComponent);
      comp    = fixture.componentInstance;
      spyGet  = spyOn(fixture.debugElement.injector.get(ClientsService), 'getClient').and.callThrough();
      spyUpdate = spyOn(fixture.debugElement.injector.get(ClientsService), 'updateClient').and.callThrough();
      fixture.detectChanges();
    });

    it('should load the client from api if id in the url', () => {
      expect(comp.client).toBeDefined();
      expect(comp.client.phone).toBe(TEST_CLIENT.phone);
      expect(comp.client.email).toBe(TEST_CLIENT.email);
      expect(spyGet.calls.count()).toBe(1);
    });

    it('should throw an error when trying to update a client with no email', fakeAsync(() => {
      comp.client.email = '';
      let submitBtn = fixture.debugElement.query(By.css('button')).nativeElement;
      submitBtn.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      let errorDiv = fixture.debugElement.query(By.css('.client__error')).nativeElement;
      expect(comp.error).toBe('Please fill in all the required data');
      expect(errorDiv.textContent).toContain('Please fill in all the required data');
      expect(spyUpdate.calls.count()).toBe(0);
    }));

    it('should update the client', fakeAsync(() => {
      comp.client.phone = '123';
      comp.client.email = 'test@test.ee';
      let submitBtn = fixture.debugElement.query(By.css('button')).nativeElement;
      submitBtn.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(3000); // timeout for success message
      expect(comp.error).toBe(null);
      expect(spyUpdate.calls.count()).toBe(1);
    }));

  });

});

// helper
class ClientsServiceStub {
  getClient = (id: string): Observable<Client> => {
    return Observable.of(new Client(TEST_CLIENT)); // clone
  }
  saveClient = (client: Client) => {
    return Observable.of(new Client(client)); // clone
  }
  updateClient = (id: string, newValues: any) => {
    return Observable.of(new Client(TEST_CLIENT)); // clone
  }
}

// helper
class ActivatedRouteStub {
  private paramsSubject = new BehaviorSubject({id: '123'});
  params = this.paramsSubject.asObservable();
  get snapshot() {
    return { params: this.params };
  }
}