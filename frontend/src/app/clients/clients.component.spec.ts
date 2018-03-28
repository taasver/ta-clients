import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { FormsModule }  from '@angular/forms';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ClientsComponent } from './clients.component';
import { ClientsService }   from './clients.service';
import { Client }   from './client';

let comp: ClientsComponent;
let fixture: ComponentFixture<ClientsComponent>;
let spy: jasmine.Spy;
let searchInput: HTMLInputElement;

const TEST_CLIENTS: Client[] = [
  createClient('michael@gmail.com', '450-3232-223-44', 'https://test.test/c1.jpg', 'Michael', 'Knight'),
  createClient('hannibal@gmail.com', '342-234-840', 'https://test.test/c2.jpg'),
  createClient('ba@gmail.com', '342-234-841')
];

// helper
function createClient(email: string, phone: string, photo?: string, firstName?: string, lastName?: string) {
  let client = new Client();
  client.email = email;
  client.phone = phone;
  client.photo = photo;
  client.firstName = firstName;
  client.lastName = lastName;
  return client;
}

// helper
class ClientsServiceStub {
  getClients() { return Observable.of(TEST_CLIENTS); }
}

describe('ClientsComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ ClientsComponent ],
      providers: [ {provide: ClientsService, useClass: ClientsServiceStub} ]
    });
    fixture = TestBed.createComponent(ClientsComponent);
    comp    = fixture.componentInstance;
    spy = spyOn(fixture.debugElement.injector.get(ClientsService), 'getClients').and.callThrough();
    searchInput = fixture.debugElement.query(By.css('#clients-query')).nativeElement;
    fixture.detectChanges();
  });

  it('should work', () => {
    expect(comp instanceof ClientsComponent).toBe(true);
  });

  it('should load the clients', () => {
    expect(spy.calls.count()).toBe(1);
    expect(comp.isLoading).toBe(false);
    expect(comp.filteredClients).toEqual(TEST_CLIENTS);
  });

  it('should display the list of clients', () => {
    expect(spy.calls.count()).toBe(1);
    expect(comp.isLoading).toBe(false);
    expect(comp.filteredClients).toEqual(TEST_CLIENTS);
  });

  it('should display the photo and name or email of the client', () => {
    let clients = fixture.debugElement.queryAll(By.css('.client'));
    let firstClientPhoto = clients[0].query(By.css('.client__photo')).nativeElement;
    let firstClientText = clients[0].query(By.css('.client__text')).nativeElement;
    let secondClientText = clients[1].query(By.css('.client__text')).nativeElement;
    expect(firstClientPhoto.style.backgroundImage).toContain(TEST_CLIENTS[0].photo);
    expect(firstClientText.textContent).toContain(TEST_CLIENTS[0].firstName + ' ' + TEST_CLIENTS[0].lastName);
    expect(secondClientText.textContent).toContain(TEST_CLIENTS[1].email);
  });

  it('should find a client when searching by name (lowercase) and display the result count', () => {
    expect(comp.query).toBe('');
    searchInput.value = 'knight';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let client = fixture.debugElement.queryAll(By.css('.client'));
    let count = fixture.debugElement.query(By.css('.clients-page > div')).nativeElement;
    expect(comp.query).toBe('knight');
    expect(comp.filteredClients[0]).toEqual(TEST_CLIENTS[0]); // check clients in component
    expect(client.length).toBe(1); // check rendered cliets
    expect(count.textContent).toContain('Found 1 client');
  });

  it('should find a client when searching by phone', () => {
    searchInput.value = '342-234-841';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let clients = fixture.debugElement.queryAll(By.css('.client'));
    expect(comp.filteredClients[0]).toEqual(TEST_CLIENTS[2]); // check clients in component
    expect(clients.length).toBe(1); // check rendered clients
  });

  it('should find no items when searching without matches for the query', () => {
    searchInput.value = 'trolololo';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let clients = fixture.debugElement.queryAll(By.css('.client'));
    expect(comp.filteredClients).toEqual([]); // check clients in component
    expect(clients.length).toBe(0); // check rendered clients
  });

  it('should clear search query when clear button clicked', () => {
    searchInput.value = 'knight';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(comp.query).toBe('knight');
    let clearBtn = fixture.debugElement.query(By.css('.input-simple__clear')).nativeElement;
    clearBtn.click();
    expect(comp.query).toBe('');
  });

});