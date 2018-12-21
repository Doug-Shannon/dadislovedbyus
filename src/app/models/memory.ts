export class Memory {
  id: string;
  memory: string;
  user: string;
  constructor(id: string = null, memory: string = null, user: string = null) {
    if (id) {
      this.id = id;
    }
    if (memory) {
      this.memory = memory;
    }
    if (user) {
      this.user = user;
    }
  }

  public static From(obj: Partial<Memory>) {
    const { id, memory, user } = obj;
    return new this(id, memory, user);
  }
}
