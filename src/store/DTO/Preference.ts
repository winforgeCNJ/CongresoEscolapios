export class DTOPreferenceReq {
    firstName: string;
    lastName: string;
    DNI: string;
    mail : string;
    phoneNumber : string
  
    constructor(firstName: string, lastName: string, DNI: string, mail : string, phoneNumber : string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.DNI = DNI;
      this.mail = mail;
      this.phoneNumber = phoneNumber
    }
  }