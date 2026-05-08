'use strict';

// user.js
class User {
    #id;
    #name;
    #userName;
    #email;
    constructor(id, name, userName, email) {
        this.#id = id;
        this.#name = name;
        this.#userName = userName;
        this.#email = email;
    }

    getId() { return this.#id; }
    getName() { return this.#name; }
    getUserName() { return this.#userName; }
    getEmail() { return this.#email; }
    getInfo() {
        return `
        <p><strong> ${this.#name} </strong></p>
        <p> ${this.#userName}</p>
        <p> ${this.#email}</p>
        `;
    }
}

class Subscriber extends User {
    #job;
    #company;
    constructor(id, name, userName, email, job, company) {
        super(id, name, userName, email);
        this.#job = job;
        this.#company = company;
    }

    getPages() { return this.#job; }
    getGroups() { return this.#company; }
    getInfo() {
    const baseInfo = super.getInfo();
        return `
        ${baseInfo}
        <p><strong> ${this.#job.join(', ')} </strong></p>
        <p> ${this.#company.join(', ')}</p>
        `;
    }
}

// new Subscriber instance
const currentUser = new Subscriber(
    1,
    'Jane Doe',
    'Jane123',
    'Jane.Doe@email.com',
    ['Software Engineer'],
    ['The Program Project'],
);
