export class Nickname {
  id: string;
  nickname: string;
  user: string;
  constructor(id: string = null, nickname: string = null, user: string = null) {
    if (id) {
      this.id = id;
    }
    if (nickname) {
      this.nickname = nickname;
    }
    if (user) {
      this.user = user;
    }
  }

  public static From(obj: Partial<Nickname>) {
    const { id, nickname, user } = obj;
    return new this(id, nickname, user);
  }
}
