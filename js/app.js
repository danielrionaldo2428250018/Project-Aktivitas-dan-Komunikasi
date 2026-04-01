const API_KEY = "66e5a263a9a88234aa2e06e5fca6ffb0";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

let allMovies = [];

async function fetchMovies(){

try{

const res = await fetch(
`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
);

const data = await res.json();

allMovies = data.results;

renderMovies(allMovies);

}catch(error){

console.log(error);

}

}



function renderMovies(movies){

const grid = document.getElementById("moviesGrid");

grid.innerHTML = "";

movies.forEach(movie=>{

const card = document.createElement("div");

card.className="movie-card";

card.innerHTML = `

<a href="detail.html?id=${movie.id}">

<img src="${IMG_BASE + movie.poster_path}">

</a>

<h3>${movie.title}</h3>

<button onclick='toggleFavorite(${JSON.stringify(movie)})'>
❤ Favorite
</button>

<div class="rating">

<span onclick="rateMovie(${movie.id},1)">⭐</span>
<span onclick="rateMovie(${movie.id},2)">⭐</span>
<span onclick="rateMovie(${movie.id},3)">⭐</span>
<span onclick="rateMovie(${movie.id},4)">⭐</span>
<span onclick="rateMovie(${movie.id},5)">⭐</span>

</div>

`;

grid.appendChild(card);

});

}



const searchInput = document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("input",function(){

const keyword = this.value.toLowerCase();

const filtered = allMovies.filter(movie=>
movie.title.toLowerCase().includes(keyword)
);

renderMovies(filtered);

});

}



fetchMovies();

if(typeof checkFavoriteUpdate === "function"){
checkFavoriteUpdate();
}

if(typeof checkLogin === "function"){
checkLogin();
}