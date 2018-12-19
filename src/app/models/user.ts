export class User {
  uid: string;
  firstname: string;
  lastname: string;
  constructor(uid: string = null, firstname: string = null, lastname: string = null) {
    if (uid) {
      this.uid = uid;
    }
    if (firstname) {
      this.firstname = firstname;
    }
    if (lastname) {
      this.lastname = lastname;
    }
  }

  public static From(obj: Partial<User>) {
    const { uid, firstname, lastname } = obj;
    return new this(uid, firstname, lastname);
  }
}
