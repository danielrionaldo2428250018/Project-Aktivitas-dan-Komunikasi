/* ======================================================
   AUTH.JS
   Mengatur sistem login dan register user
====================================================== */


/* REGISTER USER */

function register() {

  const username = document.getElementById("regUser").value;
  const password = document.getElementById("regPass").value;

  // Ambil data user dari LocalStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Cek apakah username sudah ada
  const exist = users.find(u => u.username === username);

  if (exist) {
    alert("Username sudah digunakan");
    return;
  }

  // Simpan user baru
  users.push({
    id: Date.now(),
    username: username,
    password: password,
    created_at: new Date()
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Register berhasil");
  window.location = "login.html";
}


/* LOGIN USER */

function login() {

  const username = document.getElementById("loginUser").value;
  const password = document.getElementById("loginPass").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    alert("Username atau password salah");
    return;
  }

  // Simpan user yang sedang login
  localStorage.setItem("currentUser", JSON.stringify(user));

  window.location = "movies.html";
}


/* LOGOUT */

function logout() {
  localStorage.removeItem("currentUser");
  window.location = "login.html";
}

function checkLogin(){

const user = localStorage.getItem("currentUser");

if(!user){

window.location = "login.html";

}

}