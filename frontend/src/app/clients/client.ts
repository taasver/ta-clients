export class Client {
  id?: string;
  email: string; // email of the client
  phone: string; // phone number
  firstName: string;
  lastName: string;
  photo?: string; // photo url
  company?: string; // company name
  country?: string;
  city?: string;
  address?: string;
  postalCode?: string;

  // valid if email and phone are there
  isValid = (): boolean => !!(this.email && this.phone);

  // print clients name or email if name is not there
  toString = (): string => this.firstName && this.lastName ? this.firstName + ' ' + this.lastName : this.email; 

};