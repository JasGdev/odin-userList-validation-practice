// storages/usersStorage.js
// This class lets us simulate interacting with a database.
class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUser({ firstName, lastName, email, age, bio }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { firstName, lastName, email, age, bio }) {
    this.storage[id] = { id, firstName, lastName, email, age, bio};
  }

  deleteUser(id) {
    delete this.storage[id];
  }

  findByNameEmail(name, email){
    const users = Object.values(this.storage)
    if (name == '' && email != '') {
      return users.find((user) => user.email === email)
    } else if (name != '' && email == '') {
      return users.find((user) => (user.firstName + ' ' + user.lastName) === (name))
    } else {
      return users.find((user) => (user.firstName + ' ' + user.lastName) === (name) && user.email === email)
    }
  }

}
// Rather than exporting the class, we can export an instance of the class by instantiating it.
// This ensures only one instance of this class can exist, also known as the "singleton" pattern.
module.exports = new UsersStorage();
