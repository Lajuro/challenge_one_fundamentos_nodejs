import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2));
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  select(table, search) {
    let data = this.#database[table] ?? [];
    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          value = decodeURI(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          return row[key].includes(value);
        });
      });
    }

    return {
      count: data.length,
      data
    };
  }

  select_by_id(table, id) {
    const data = this.#database[table] ?? [];

    return data.find((row) => row.id === id);
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        id,
        ...data
      };

      this.#persist();
    }

    return;
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);

      this.#persist();
    }

    return;
  }

  delete_all(table) {
    this.#database[table] = [];

    this.#persist();
  }

}