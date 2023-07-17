window.onload = function () {

    // Function Fetch
    async function httpGet(url) {
        // Création d'un nouvelle objet 
    const headers = new Headers();
    // Append(name, value)
    headers.append("Content-Type", "application/json");
        const query = await fetch(url,
             {
            method: "GET",
            headers: headers
        });
        console.log(query);
        const response = await query.json();
        // console.log(response);
        return response;
    }

    let resultat = document.getElementById("card");
    let modal = document.getElementById("modal");
    let nb = 12;
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
                console.log(cards);

                cards.forEach((element, index) => {
                    element.addEventListener("click", () => {
                        modal.classList.add("active");

                        data.data.forEach(() => {
                            const selectedPerson = data.data[index];
                            modal.innerHTML = `<div id="description"> 
                          <i id="fermeture" class="fa-solid fa-xmark"></i>
                          <div class="position">
                            <img src="${selectedPerson.avatar}" alt="Photo de ${selectedPerson.first_name} ${selectedPerson.last_name}" />
                            <p>${selectedPerson.first_name} ${selectedPerson.last_name}</p>
                            <p>${selectedPerson.email}</p>
                            <p>Je suis ${selectedPerson.first_name} ${selectedPerson.last_name} j'adore la programmation veillez me contacter 
                            via mon mail ici : ${selectedPerson.email}</p>
                          </div>
                        </div>`;
                        });

                        let fermeture = document.getElementById("fermeture");
                        // console.log(fermeture);
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

