/* ======================================================
   NOTIFICATION.JS
   Mengecek apakah favorite movie memiliki update
====================================================== */

async function checkFavoriteUpdate() {

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) return;

  const favorites =
    JSON.parse(localStorage.getItem("favorites_" + user.id)) || [];

  for (const movie of favorites) {

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}`,
      TMDB_OPTIONS
    );

    const data = await res.json();

    // Contoh logika sederhana update film
    if (data.release_date) {

      const year = data.release_date.substring(0, 4);

      if (year >= 2025) {

        alert(
          "Film favorit kamu mungkin memiliki kelanjutan: " +
          movie.title
        );

      }

    }

  }

}