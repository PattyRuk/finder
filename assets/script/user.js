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
// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    const postBtn = document.getElementById('post-button');
    const postText = document.getElementById('post-text');
    const postImage = document.getElementById('post-image');
    const postForm = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts-container');
    const accountModal = document.getElementById('account-pop-up');
    const accountInfo = document.getElementById('pop-up-info');

    // 1. Enable button
    postText.addEventListener('input', () => {
        const hasText = postText.value.trim().length > 0;
        const hasImage = postImage.value.length > 0;
        postBtn.disabled = (hasText || hasImage) ? false : true;
    });
    // 2. Post Form
    const createPostElement = (text, imgSrc) => {
        const post = document.createElement('div');
        post.className = 'post';

        // Profile Header & Time
        const now = new Date();
        const timeString = `${now.toLocaleDateString()}  ${now.toLocaleTimeString()}`
        post.innerHTML =
            `<div class="post-header">
                <div class="profile-pic"><img src="./assets/media/profilepic2.jpg"></div>
                <div class="post-info">
                    <h3>Jane Doe</h3>
                    <span>${timeString}</span>
                </div>
            </div>
            <p>${text}</p>`;
        if (imgSrc) {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.className = 'post-image-display';
            post.appendChild(img);
        }
        return post;
    };

    postForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // add image
        const file = postImage.files[0];
        let imageUrl = null;
        if (file) {
            imageUrl = URL.createObjectURL(file);
        }
       
        // combine and post
        const newPost = createPostElement(postText.value, imageUrl);
        postsContainer.prepend(newPost);

        //reset form
        postForm.reset();
        postBtn.disabled = true;
   
    });
   
   


});
