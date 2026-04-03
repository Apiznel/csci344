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
  showProfileHeader();
  showSuggestions();
  showStories();
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

async function showProfileHeader() {
  // fetch the current user's profile data from /api/profile
  const endpoint = `${rootURL}/api/profile/`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const profile = await response.json();
  console.log(profile);
  // select the container where the profile header should go
  const profileEl = document.querySelector("aside header");
  // build an HTML string for the user's image + username
  const profileHTML = `
            <img src="${profile.thumb_url}" class="rounded-full w-16" />
            <h2 class="font-Comfortaa font-bold text-2xl">${profile.username}</h2>`;
  // insert that HTML into the DOM
  profileEl.insertAdjacentHTML("beforeend", profileHTML);
}
async function showSuggestions() {
  // fetch the suggested accounts from /api/suggestions
  const endpoint = `${rootURL}/api/suggestions/`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const suggestions = await response.json();
  console.log(suggestions);

  // select the container where the suggestions should go
  const suggestionsEl = document.querySelector("aside div");
  // loop through or map over the returned accounts
  suggestions.forEach((suggestion) => {
    // build an HTML string for each suggested account
    const htmlSnippet = suggestionToHTML(suggestion);
    // insert the combined HTML into the DOM
    suggestionsEl.insertAdjacentHTML("beforeend", htmlSnippet);
  });
}

function suggestionToHTML(suggestion) {
  return `
      <section class="flex justify-between items-center mb-4 gap-2">
          <img src="${suggestion.thumb_url}" class="rounded-full" />
          <div class="w-[180px]">
              <p class="font-bold text-sm">${suggestion.username}</p>
              <p class="text-gray-500 text-xs">suggested for you</p>
          </div>
          <button class="text-blue-500 text-sm py-2">follow</button>
      </section>
`;
}

async function showStories() {
  // fetch the stories from /api/stories
  const endpoint = `${rootURL}/api/stories/`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const stories = await response.json();
  console.log(stories);

  // select the stories container
  const storiesEl = document.querySelector("main header");
  // loop through or map over the returned stories
  stories.forEach((story) => {
    // build an HTML string for each story
    const htmlSnippet = storyToHTML(story);
    // insert the combined HTML into the DOM
    storiesEl.insertAdjacentHTML("beforeend", htmlSnippet);
  });
}

function storyToHTML(story) {
  return `
      <div class="flex flex-col justify-center items-center">
          <img src="${story.user.thumb_url}" class="rounded-full border-4 border-gray-300" />
          <p class="text-xs text-gray-500">${story.user.username}</p>
      </div>
`;
}

async function showPosts() {
  // fetch the posts from /api/posts
  const endpoint = `${rootURL}/api/posts/?limit=10`;
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
  posts.forEach((post) => {
    // build each post's HTML (or call a helper function)
    const htmlSnippet = postToHTML(post);
    // insert the rendered posts into the DOM
    postsEl.insertAdjacentHTML("beforeend", htmlSnippet);
  });
}

function postToHTML(post) {
  return `
        <section class="bg-white border mb-10" id="post-${post.id}">
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
                        ${post.caption}
                    </p>
                </div>
               ${getComments(post.comments)}
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

function getComments(comments) {
  // if there are no comments, return an empty string
  if (comments.length === 0) return "";
  // if there is exactly one comment, render just that comment
  if (comments.length === 1)
    return `
      <p class="text-sm mb-3">
          <strong>${comments[0].user.username}</strong>
          ${comments[0].text}
      </p>
    `;
  // if there is more than one comment:
  //     render a "view all n comments" button
  //     render only the most recent comment underneath it
  return `
      <button class="text-blue-500 text-sm py-2">View all ${comments.length} comments</button>
      <p class="text-sm mb-3">
          <strong>${comments[comments.length - 1].user.username}</strong>
          ${comments[comments.length - 1].text}
      </p>
  `;
  // return the HTML string for whichever case applies
}

function getLikeButton(post) {
  // change color to red when liked
  if (post.current_user_like_id === undefined)
    return `<button class="like" role="switch" aria-label="Like Button" aria-checked="false" onclick="like(${post.id})"><i class="far fa-heart"></i></button>`;
  return `<button class="like" role="switch" aria-label="Like Button" aria-checked="true" onclick="unLike(${post.current_user_like_id}, ${post.id})"><i class="text-red-600 fas fa-heart"></i></button>`;
}

function getBookmarkButton(post) {
  if (post.current_user_bookmark_id === undefined)
    return `<button class="bookmark" role="switch" aria-label="Bookmark Button" aria-checked="false" onclick="bookmark(${post.id})"><i class="far fa-bookmark"></i></button>`;
  return `<button class="bookmark" role="switch" aria-label="Bookmark Button" aria-checked="true" onclick="unBookmark(${post.current_user_bookmark_id}, ${post.id})"><i class="fas fa-bookmark"></i></button>`;
}

async function reloadPost(postId) {
  const response = await fetch(`${rootURL}/api/posts/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();

  // build the updated HTML for that one post:
  const updatedPostHTML = postToHTML(data);

  const post = document.querySelector(`#post-${postId}`);
  post.outerHTML = updatedPostHTML;
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
  reloadPost(postId);
}

async function unLike(likeId, postId) {
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
  reloadPost(postId);
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
  reloadPost(postId);
}

async function unBookmark(bookmarkId, postId) {
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
  reloadPost(postId);
}

// after all of the functions are defined,
// invoke initialize at the bottom:
initializeScreen();
