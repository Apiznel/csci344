// requires utilities.js to be loaded first:
// included in index.html

const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "cchin2"; // change to your username :)
let password = "password";

async function initializeScreen() {
  token = await getToken();
  showNav();
  // invoke all of the Part 1 functions here
  showPosts();
}

async function showPosts() {
  // fetch the posts from /api/posts
  const endpoint = `${rootURL}/api/posts/`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const posts = await response.json();
  console.log(posts);
  // select the posts container
  const postsEl = document.querySelector("#posts");
  // loop through the first 10 posts
  posts.forEach((post) => {
    // build each post's HTML (or call a helper function)
    const htmlSnippet = postToHTML(post);
    // insert the rendered posts into the DOM
    postsEl.insertAdjacentHTML("beforeend", htmlSnippet);
  });
}

function postToHTML(post) {
  return `
        <section class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${post.user.username}</h3>
                <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${post.image_url}" alt="${post.alt_text}" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                        ${getLikeButton(post)}
                        <button><i class="far fa-comment"></i></button>
                        <button><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                        ${getBookmarkButton(post)}
                    </div>
                </div>
                <p class="font-bold mb-3">${post.likes.length} likes</p>
                <div class="text-sm mb-3">
                    <p>
                        <strong>${post.user.username}</strong>
                        ${post.caption} <button class="button">more</button>
                    </p>
                </div>
               ${getComments(post)}
                <p class="uppercase text-gray-500 text-xs">${post.display_time}</p>
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg"></i>
                    <input type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
                </div>
                <button class="text-blue-500 py-2">Post</button>
            </div>
        </section>
         `;
}

function getComments(post) {
  return ``;
}

function expandCaption(post) {}

function getLikeButton(post) {
  // change color to red when liked
  if (post.current_user_like_id === undefined)
    return `<button class="like" role="switch" aria-label="Like Button" aria-checked="false" onclick="like(${post.id})"><i class="far fa-heart"></i></button>`;
  return `<button class="like" role="switch" aria-label="Like Button" aria-checked="true" onclick="unLike(${post.current_user_like_id})"><i class="text-red-600 fas fa-heart"></i></button>`;
}

function getBookmarkButton(post) {
  if (post.current_user_bookmark_id === undefined)
    return `<button class="bookmark" role="switch" aria-label="Bookmark Button" aria-checked="false" onclick="bookmark(${post.id})"><i class="far fa-bookmark"></i></button>`;
  return `<button class="bookmark" role="switch" aria-label="Bookmark Button" aria-checked="true" onclick="unBookmark(${post.current_user_bookmark_id})"><i class="fas fa-bookmark"></i></button>`;
}

async function like(postId) {
  const postData = { post_id: postId };
  const endpoint = `${rootURL}/api/likes/`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  console.log(data);
}

async function unLike(likeId) {
  const endpoint = `${rootURL}/api/likes/${likeId}`;
  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
  console.log(data);
}

async function bookmark(postId) {
  const postData = { post_id: postId };
  const endpoint = `${rootURL}/api/bookmarks/`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  console.log(data);
}

async function unBookmark(bookmarkId) {
  const endpoint = `${rootURL}/api/bookmarks/${bookmarkId}`;
  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
  console.log(data);
}

async function getToken() {
  return await getAccessToken(rootURL, username, password);
}

function showNav() {
  document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:

// after all of the functions are defined,
// invoke initialize at the bottom:
initializeScreen();
