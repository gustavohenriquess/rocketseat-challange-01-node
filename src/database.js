import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);
export class Database {
  #database = {};

  constructor() {
    this.#load();
  }

  async #load() {
    await fs
      .readFile(databasePath, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  async #beforeExecution() {
    await this.#load();
  }

  #afterExecution() {
    this.#persist();
  }

  async select(table, search) {
    await this.#beforeExecution();

    let data = this.#database[table] ?? [];

    if (search && search.id) {
      data = data.filter((row) => row.id === search.id);
    } else if (!this.#isEmpty(search)) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].includes(value);
        });
      });
    }

    return data;
  }

  async insert(table, data) {
    await this.#beforeExecution();

    data.created_at = new Date();
    data.updated_at = new Date();

    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }
    console.log(data.id);
    this.#afterExecution();
    return data;
  }

  async update(table, id, data) {
    await this.#beforeExecution();

    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      data.updated_at = new Date();
      for (let i in data) {
        this.#database[table][rowIndex][i] = data[i];
      }
      // this.#database[table][rowIndex] = { id, ...data };
      this.#afterExecution();
    }
  }

  async delete(table, id) {
    await this.#beforeExecution();

    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#afterExecution();
    }
  }

  #isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
}
