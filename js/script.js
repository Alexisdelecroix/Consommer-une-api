// document.addEventListener("DOMContentLoaded", function () {

window.onload = function () {
    async function httpGet(url) {
        const query = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(query);
        const response = await query.json();
        return response;
    }

    let resultat = document.getElementById("card");
    let modal = document.getElementById("modal");
    let nb = 12;
    // let url = "https://reqres.in/api/users?per_page=" + nb + "";
    let url = `https://reqres.in/api/users?per_page=${nb}`;

    function afficherLesCartes() {
        const response = httpGet(url);
        if (!response) {
            console.log("erreur404");
        } else {
            response.then((data) => {
                let id = 1;
                data.data.forEach((element) => {
                    // console.log(element);
                    resultat.innerHTML += `<div class="presentation" id="${id}">
                                                <img src="${element.avatar}" alt="Photo de ${element.first_name} ${element.last_name}" />
                                                <p> ${element.first_name} ${element.last_name} </p>
                                                <p> ${element.email} </p>
                                            </div>`;
                    id++;
                });
                const cards = document.querySelectorAll(".presentation");
                console.log(cards.length);

                cards.forEach((element, index) => {
                    element.addEventListener("click", () => {
                        console.log("coucou");
                        modal.classList.add("active");

                        data.data.forEach((element) => {
                            const selectedPerson = data.data[index];
                            modal.innerHTML = `<div id="description"> 
                          <i id="fermeture" class="fa-solid fa-xmark"></i>
                          <div class="position">
                            <img src="${selectedPerson.avatar}" alt="Photo de ${selectedPerson.first_name} ${selectedPerson.last_name}" />
                            <p>${selectedPerson.first_name} ${selectedPerson.last_name}</p>
                            <p>${selectedPerson.email}</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, earum? Veritatis, repellat, in autem quos iure</p>
                          </div>
                        </div>`;
                        });

                        let fermeture = document.getElementById("fermeture");
                        console.log(fermeture);
                        fermeture.addEventListener("click", () => {
                            modal.classList.remove("active");
                        });
                    });
                });
            });
        }
    }
    afficherLesCartes();
};
