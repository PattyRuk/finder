'use strict';

// user.js
class User {
    #id;
    #name;
    #userName;
    #email;
    #password
    constructor(id, name, userName, email, password) {
        this.#id = id;
        this.#name = name;
        this.#userName = userName;
        this.#email = email;
        this.#password = password;
    }

    getId() { return this.#id; }
    getName() { return this.#name; }
    getUserName() { return this.#userName; }
    getEmail() { return this.#email; }
    getPassword() {return this.#password}
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
    'password123',
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
   
    const accountBtn = document.getElementById('account-info-btn');
    const logoutMenu = document.getElementById('logout-menu');
    const logoutBtn = document.getElementById('logout-btn');

    // 1. Enable button
    postText.addEventListener('input', () => {
        const hasText = postText.value.trim().length > 0;
        const hasImage = postImage.value.length > 0;
        postBtn.disabled = (hasText || hasImage) ? false : true;
    });
    // 2. Post Form --- this was used from my prior assignment (FakeBook)
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
   
   
    //WHO TO FOLLOW SECTION
   
    async function populateConnections(count = 10) {
        const connectionsBox = document.querySelector('.connections');
        const URL = 'https://www.randomuser.me/api/?nat=CA&results=10&seed=same___.YzJ1Om1hbml0b2JhaW5zdGl0dXRlb2Z0cmFkZXNhbmR0ZWNobm9sb2d5OmM6bzo1YWM2MzcwMDQ5NGYyNDJjYWEyOTZiNWY2YmE1MGRiNzo3OjM5ZWM6NzBhOTU3MDkyNzcwNmE4NmE1NWNmMGY0MDVkZDE2MzQyNTM5M2JkODQ2YWE1ZWYxMDEzODY3M2E4ZjkyNjk2Yzp0OlQ6Tg___.YzJ1Om1hbml0b2JhaW5zdGl0dXRlb2Z0cmFkZXNhbmR0ZWNobm9sb2d5OmM6bzozM2RhYWJmOGFiNjJmOWU1YmI5NjY0ZmUxZGVhOGEzODo3OmIwY2U6ZGViNjE3YTdlZTJiZWM3ZWE1ZjFiMTQ5M2FiYTM5YjllZTEwMmE1ZjEwNTBjMzg1MzlkNGIyYTY4ZjU4ODgyODp0OlQ6Tg';

        const options = {                         //got this from the class lecture notes
            method: 'GET',
            headers: {
                'Content-Type': 'application/JSON; charset=UTF-8'  
            },
            mode: 'cors'
        }
        try {
            // Fetching User Data
            const response = await fetch(URL, options);
            const data = await response.json();
            const users = data.results;
   
            // Container to Hold Connections
            const listContainer = document.createElement('div');
            listContainer.className = 'connections-list';
   
            // Structure Connections List
            users.forEach(user => {
                const userItem = document.createElement('div');
                userItem.className = 'connection-item';
   
                userItem.innerHTML = `
                    <img src="${user.picture.thumbnail}" alt="${user.name.first}">
                    <div class="connection-info">
                        <div class="user-name">${user.name.first} ${user.name.last}</div>
                        <div>${user.location.city}</div>
                    </div>
                    <button class="follow-btn">Follow</button>
                `;
   
                listContainer.appendChild(userItem);
            });
   
            connectionsBox.appendChild(listContainer);
   
        } catch (error) {
            console.error('Error fetching suggested users:', error);
            connectionsBox.innerHTML = '<p class="failed">Failed to load suggestions.</p>';
        }
    }


    // Log out logic
    accountBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents the click from immediately closing the menu
        logoutMenu.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        logoutMenu.classList.remove('active');
    });

    logoutBtn.addEventListener('click', () => {

        window.location.href = 'index.html';
    });

    // Initializing
    window.addEventListener('load', () => {
        accountInfo.innerHTML = currentUser.getInfo();
        accountModal.style.display = 'block';
        populateConnections(10);
    });

});