/* ======================================================
   RATING.JS
   User dapat memberi rating film
====================================================== */


function rateMovie(movieId, ratingValue) {

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("Login terlebih dahulu");
    return;
  }

  let ratings = JSON.parse(localStorage.getItem("ratings")) || [];

  ratings.push({
    id: Date.now(),
    user_id: user.id,
    movie_id: movieId,
    rating: ratingValue,
    created_at: new Date()
  });

  localStorage.setItem("ratings", JSON.stringify(ratings));

  alert("Rating tersimpan");

}