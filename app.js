//Déclaration de variables
let champ = document.getElementById("champ");
let btn = document.getElementById("btn");
let ville = document.getElementById("titre");
let villeSave = document.getElementById("save");
const api_key = "ddef234bffdb94e0b9b8358c6d653348";
let url = "https://api.openweathermap.org/geo/1.0/direct?q=";
let city;
// champ.addEventListener("input", update)
btn.addEventListener("click", update);

function update() {
  city = champ.value;
  titre.innerHTML = city;
  fetch(url + city + "&limit=5&appid=" + api_key)
    .then((res) => res.json())
    .then((r) => {
      let latitude = r[0].lat; // je récupere la latitude de la ville
      let longitude = r[0].lon; // je récupere la longitude de la ville
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&appid=" +
          api_key +
          "&units=metric&exclude=current,hourly,alert,minutely&lang=fr"
      )
        .then((r) => r.json())
        .then((r) => {
          // LOCAL STORAGE
          localStorage.setItem(
            "name",
            JSON.stringify({
              temp: r.daily[0].temp.day,
              ville: champ.value,
            })
          );

          let dataSaved = JSON.parse(localStorage.getItem("name"));
          console.log(dataSaved.temp);
          let dataSaved2 = JSON.parse(localStorage.getItem("name"));
          console.log(dataSaved2.ville);

          //FIN LOCAL STORAGE

          let lundi = document.querySelector(".jour_1");
          lundi.innerHTML = r.daily[3].temp.day;

          if (dataSaved == null) {
            let Mardi = document.querySelector(".jour_2");
            Mardi.innerHTML = r.daily[4].temp.day;
          } else {
            let Mardi = document.querySelector(".jour_2");
            Mardi.innerHTML =
              dataSaved2.ville + " " + JSON.stringify(dataSaved.temp);
          }

          let Mercredi = document.querySelector(".jour_3");
          Mercredi.innerHTML = r.daily[5].temp.day;

          let Jeudi = document.querySelector(".jour_4");
          Jeudi.innerHTML = r.daily[6].temp.day;

          let Vendredi = document.querySelector(".jour_5");
          Vendredi.innerHTML = r.daily[0].temp.day;

          let Samedi = document.querySelector(".jour_6");
          Samedi.innerHTML = r.daily[1].temp.day;

          let Dimanche = document.querySelector(".jour_7");
          Dimanche.innerHTML = r.daily[2].temp.day;

          if (dataSaved2 == null) {
            villeSave.appendChild(p);
            let p = document.createElement("p");
            p.innerHTML = champ.value + " " + r.daily[0].temp.day + "°   ";
          } else {
            let p = document.createElement("p");
            p.innerHTML =
              dataSaved2.ville + " " + JSON.stringify(dataSaved.temp);
            villeSave.appendChild(p);
          }
        });
    });
}
