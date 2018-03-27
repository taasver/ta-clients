import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { FormsModule }  from '@angular/forms';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ClientsComponent } from './clients.component';
import { ClientsService }   from './clients.service';

let comp: ClientsComponent;
let fixture: ComponentFixture<ClientsComponent>;
let spy: jasmine.Spy;
let searchInput: HTMLInputElement;

const TEST_CLIENTS: any = [
  { name: 'Michael Knight', photo: 'https://test.test/c1.jpg', phone: '450-3232-223-44' },
  { name: 'Hannibal Smith', photo: 'https://test.test/c2.jpg', phone: '342-234-840' },
  { name: 'B. A. Baracus',  photo: 'https://test.test/c3.jpg', phone: '342-234-841' }
];

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

/*  it('should work', () => {
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

  it('should display the photo and name of the client', () => {
    let client = fixture.debugElement.query(By.css('.client'));
    let photo = client.query(By.css('.client__photo')).nativeElement;
    let text = client.query(By.css('.client__text')).nativeElement;
    expect(photo.style.backgroundImage).toContain(TEST_CLIENTS[0].photo);
    expect(text.textContent).toContain(TEST_CLIENTS[0].name);
  });

  it('should find a client when searching by name (lowercase) and display the result count', () => {
    expect(comp.query).toBe('');
    searchInput.value = 'knight';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let client = fixture.debugElement.queryAll(By.css('.client'));
    let count = fixture.debugElement.query(By.css('.client-page > div')).nativeElement;
    expect(comp.query).toBe('knight');
    expect(comp.filteredClients).toEqual([TEST_CLIENTS[0]]); // check clients in component
    expect(client.length).toBe(1); // check rendered cliets
    expect(count.textContent).toContain('Found 1 client');
  });

  it('should find a client when searching by phone', () => {
    searchInput.value = '342-234-840';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let clients = fixture.debugElement.queryAll(By.css('.client'));
    expect(comp.filteredClients).toEqual([TEST_CLIENTS[1]]); // check clients in component
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
  });*/

});