import { Client } from './client';

describe('Client', () => {

  let client: Client;

  beforeEach(() => {
    client = new Client();
  });

  it('should not be valid if no email or phone are set', () => {
    expect(client.isValid()).toBe(false);
  });

  it('should be valid if email and phone are set', () => {
    client.email = 'test@email.com';
    client.phone = '123 123';
    expect(client.isValid()).toBe(true);
  });

  it('should return email in toString method if names are not set', () => {
    client.email = 'test@email.com';
    expect(client.toString()).toBe('test@email.com');
  });

  it('should return email in toString method if names are not set', () => {
    client.email = 'test@email.com';
    client.firstName = 'John';
    client.lastName = 'Smith';
    expect(client.toString()).toBe('John Smith');
  });

});