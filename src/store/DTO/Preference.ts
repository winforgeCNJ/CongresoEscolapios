export class DTOPreferenceReq {
    firstName: string;
    lastName: string;
    DNI: string;
    email : string;
    phone : string
  
    constructor(firstName: string, lastName: string, DNI: string, email : string, phone : string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.DNI = DNI;
      this.email = email;
      this.phone = phone
    }
  }