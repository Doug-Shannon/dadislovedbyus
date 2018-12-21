export class Attribute {
  id: string;
  attribute: string;
  user: string;
  constructor(id: string = null, attribute: string = null, user: string = null) {
    if (id) {
      this.id = id;
    }
    if (attribute) {
      this.attribute = attribute;
    }
    if (user) {
      this.user = user;
    }
  }

  public static From(obj: Partial<Attribute>) {
    const { id, attribute, user } = obj;
    return new this(id, attribute, user);
  }
}
