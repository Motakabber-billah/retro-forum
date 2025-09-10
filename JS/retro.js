const loadAllPosts = async (searchText = '') => {
    let url = 'https://openapi.programming-hero.com/api/retro-forum/posts';
    if (searchText.trim() !== '') {
        url += `?category=${searchText}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    const posts = data.posts;
    displayPosts(posts);
}

const displayPosts = (posts) => {
    // console.log(posts);
    const postContainer = document.getElementById('post-contasiner');
    postContainer.innerHTML = ''; // Clear previous results

    posts.forEach(post => {
        // console.log(post);
        const postCard = document.createElement('div');
        postCard.classList = `bg-[#797DFC]/10 border border-[#797DFC] rounded-3xl p-6 lg:p-10`;
        postCard.innerHTML = `
                <div class="flex flex-col md:flex-row gap-6">
                    <div id= "${post.id}-online" class="avatar online hidden">
                        <div class="w-24 h-24 rounded-full">
                            <img src="${post.image}" />
                        </div>
                    </div>
                    <div id= "${post.id}-offline" class="avatar offline">
                        <div class="w-24 h-24 rounded-full">
                            <img src="${post.image}" />
                        </div>
                    </div>
                    <div class="border-b border-dashed border-[#12132D]/20">
                        <div class="flex gap-6">
                            <div class="flex items-center gap-3 mb-2">
                                <h3>#</h3>
                                <h3>${post.category}</h3>
                            </div>
                            <div class="flex items-center gap-3 mb-2">
                                <h3>Author:</h3>
                                <h3>${post.author.name}</h3>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-[#12132D] text-xl font-bold mb-4">${post.title}</h3>
                        </div>
                        <div>
                            <p class="font-normal text-base text-[#12132D]/60 mb-5">${post.description}</p>
                        </div>
                    </div>
                </div>
                <div class="flex ml-0 lg:ml-32 mt-3">
                    <div class="flex items-center gap-2 mr-5">
                        <div>
                            <i class="fa-regular fa-message"></i>
                        </div>
                        <div>
                            <h3 class="text-base text-[#12132D]/60">${post.comment_count}</h3>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 mr-5">
                        <div>
                            <i class="fa-regular fa-eye"></i>
                        </div>
                        <div>
                            <h3 class="text-base text-[#12132D]/60">${post.view_count}</h3>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 mr-5">
                        <div>
                            <i class="fa-regular fa-clock"></i>
                        </div>
                        <div class="flex items-center gap-1">
                            <h3 class="text-base text-[#12132D]/60">${post.posted_time}</h3>
                            <h3>min</h3>
                        </div>
                    </div>
                    <div>
                        <button onclick="readMarkCard('${post.id}')" class="text-white text-base font-semibold px-6 py-3 rounded-full">
                         <img src="images/Group 40106.png" alt="">
                        </button>
                    </div>
                </div>
        `;
        postContainer.appendChild(postCard);
    });
}

// handle read as mark button
const readMarkCard = async (id) => {
    // console.log('Marked as read',id);
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();
    const post = data.posts.find(p => p.id === +id);
    // console.log(data);
    // console.log(post);

    const statusOnline = document.getElementById(`${post.id}-online`);
    statusOnline.classList.remove('hidden');

    const statusOffline = document.getElementById(`${post.id}-offline`);
    statusOffline.classList.add('hidden');

    const readView = document.getElementById('read-view');
    readView.innerText = parseInt(readView.innerText) + 1;

    const readCardContainer = document.getElementById('load-title');
    const markCard  = document.createElement('div');
    markCard.classList = `bg-[#FFFFFF] rounded-2xl p-4 flex gap-4 mb-4`;
    markCard.innerHTML = `
                    
                        <div>
                            <h3 class="text-base text-[#12132D]/60 ">${post.title}</h3>
                        </div>
                        <div class="flex gap-2">
                            <div>
                                <i class=" fa-regular fa-eye"></i>
                            </div>
                            <div>
                                <span>${post.view_count}</span>
                            </div>
                        </div>
                    
    `;
     readCardContainer.appendChild(markCard);
}

// handle search button
const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
     if (searchText === '') {
        loadAllPosts(); // Show all posts if search is empty
    } else {
        loadAllPosts(searchText); // Show filtered posts
    }
    loadAllPosts(searchText);
}
loadAllPosts();


// Latest Post Section
const loadLatestPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    // console.log(data);
    displayLatestPosts(data);
}

const displayLatestPosts = (data) => {
    const latestPostContainer = document.getElementById('latest-post-container');
    data.forEach(data => {
        console.log(data);
        const latestPostCard = document.createElement('div');
        latestPostCard.classList = ``;
        latestPostCard.innerHTML = `
                    <div class="card w-96 bg-base-100 shadow-xl">
                        <figure class="px-10 pt-10">
                            <img src="${data.cover_image}" alt="" class="rounded-xl" />
                        </figure>
                        <div class="card-body ">
                            <div class="flex items-center gap-3 mb-4">
                                <div>
                                    <img src="images/Frame.png" alt="">
                                </div>
                                <div>
                                    <h3 class="text-base font-normal text-[#12132D]">${data.author.posted_date || 'Not Available'} </h3>
                                </div>
                            </div>
                            <div class="mb-3">
                                <h3 class="text-base text-[#12132D] font-extrabold">${data.description}</h3>
                            </div>
                            <div class="mb-3">
                                <h3 class="text-base text-[#12132D]/60 font-normal">
                                ${data.title}</h3>
                            </div>
                            <div class="flex items-center gap-3">
                                <div>
                                    <img class="w-11 h-11 rounded-full" src="${data.profile_image}" alt="">
                                </div>
                                <div>
                                    <h3 class="text-base text-[#12132D] font-extrabold">${data.author.name}</h3>
                                    <h3 class="text-base text-[#12132D]/60 font-normal">${data.author.designation || 'Not Available'}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
        latestPostContainer.appendChild(latestPostCard);
    });
}
loadLatestPosts();