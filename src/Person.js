// Person class
class Person {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

// Administrator class extends Person
class Administrator extends Person {
  constructor(email, password) {
    super(email, password);
    this.admin = true;
  }
}
