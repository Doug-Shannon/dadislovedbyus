export class User {
  uid: string;
  firstname: string;
  lastname: string;
  faceUrl: string;
  constructor(uid: string = null, firstname: string = null, lastname: string = null, faceUrl: string = null) {
    if (uid) {
      this.uid = uid;
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
    const { uid, firstname, lastname, faceUrl } = obj;
    return new this(uid, firstname, lastname, faceUrl);
  }
}
