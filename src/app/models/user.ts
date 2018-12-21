export class User {
  id: string;
  firstname: string;
  lastname: string;
  faceUrl: string;
  constructor(id: string = null, firstname: string = null, lastname: string = null, faceUrl: string = null) {
    if (id) {
      this.id = id;
    }
    if (firstname) {
      this.firstname = firstname;
    }
    if (lastname) {
      this.lastname = lastname;
    }
    if (faceUrl) {
      this.faceUrl = faceUrl;
    }
  }

  public static From(obj: Partial<User>) {
    const { id, firstname, lastname, faceUrl } = obj;
    return new this(id, firstname, lastname, faceUrl);
  }
}
