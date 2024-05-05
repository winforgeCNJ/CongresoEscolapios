export class DTOPreferenceReq {
  firstName: string;
  lastName: string;
  DNI: string;

  constructor(firstName: string, lastName: string, DNI: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.DNI = DNI;
  }
}
