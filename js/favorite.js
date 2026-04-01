/* ======================================================
   FAVORITE.JS
   Mengatur fitur favorite movie
====================================================== */


function toggleFavorite(movie) {

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("Silakan login terlebih dahulu");
    return;
  }

  const key = "favorites_" + user.id;

  let favorites = JSON.parse(localStorage.getItem(key)) || [];

  const exist = favorites.find(f => f.id === movie.id);

  if (exist) {

    // Jika sudah ada maka hapus
    favorites = favorites.filter(f => f.id !== movie.id);

  } else {

    // Tambahkan favorite
    favorites.push({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      created_at: new Date()
    });

  }

  localStorage.setItem(key, JSON.stringify(favorites));

}