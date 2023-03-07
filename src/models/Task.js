import { randomUUID } from 'node:crypto';

export default class Task {
  #id = randomUUID();
  #title = '';
  #description = '';
  #completed_at = null;
  #created_at = new Date();
  #updated_at = new Date();

  constructor(title = "", description = "") {
    this.#title = title;
    this.#description = description;

    return this.toJSON();
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  set title(value) {
    this.#title = value;
    this.#updated_at = new Date();
  }

  get description() {
    return this.#description;
  }

  set description(value) {
    this.#description = value;
    this.#updated_at = new Date();
  }

  get completed_at() {
    return this.#completed_at;
  }

  set completed_at(value) {
    this.#completed_at = value;
    this.#updated_at = new Date();
  }

  get created_at() {
    return this.#created_at;
  }

  get updated_at() {
    return this.#updated_at;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      completed_at: this.#completed_at,
      created_at: this.#created_at,
      updated_at: this.#updated_at
    };
  }

  toString() {
    return JSON.stringify(this.toJSON(), null, 2);
  }

}