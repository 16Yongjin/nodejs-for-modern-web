module.exports = class DummyDB {
  constructor () {
    this.storage = [];
    this.count = 1;
  }

  get (id) {
    if (id) {
      return this.storage.find(i => i.id === +id)
    } else {
      return this.storage
    }
  }

  insert (data) {
    data.id = this.count++;
    this.storage.push(data);
    return data;
  }

  remove (id) {
    const oldLen = this.storage.length;
    this.storage = this.storage.filter(i => i.id === +id);
    return oldLen !== this.storage.length
  }

}

// const DummyDB = (() => {
//   const DummyDB = {};
//   const storage = [];
//   let count = 1;

//   DummyDB.get = (id) => {
//     if (id) {
//       id = (typeof id === 'string') ? Number(id) : id;

//       for (let i in storage) if (storage[i].id === id) {
//         return storage[i];
//       }
//     } else {
//       return storage
//     }
//   };

//   DummyDB.insert = (data) => {
//     data.id = count++;
//     storage.push(data);
//     return data;
//   }

//   DummyDB.remove = (id) => {
//     id = (typeof id === 'string') ? Number(id) : id;

//     for (let i in storage) if (storage[i].id === id) {
//       storage.splice(i, 1);
//       return true;
//     }

//     return false;
//   };

//   return DummyDB;
// })();