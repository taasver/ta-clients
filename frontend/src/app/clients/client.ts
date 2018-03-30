export class Client {
  _id?: string;
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

  constructor(data: any) {
    this._id = data._id;
    this.email = data.email;
    this.phone = data.phone;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.photo = data.photo;
    this.company = data.company;
    this.country = data.country;
    this.city = data.city;
    this.address = data.address;
    this.postalCode = data.postalCode;
  }

  // valid if email and phone are there
  isValid = (): boolean => !!(/*this.email && */this.phone);

  // print clients name or email if name is not there
  toString = (): string => this.firstName && this.lastName ? this.firstName + ' ' + this.lastName : this.email; 

};