function run() {
    fetch("/api/movie")
        .then((response) => response.json())
        .then((data) => {
            const detailsElement = document.getElementById("users");
            let user = "";
            for (let i = 0; i < data.length; i++) {
                user += `<p>${data[i].nom}  -  ${data[i].num}</p>`;
            }
            detailsElement.getElementsByTagName["p"].innerHTML = user;
            detailsElement.style.visibility = "visible";
        });
}

function hide() {
    const detailsElement = document.getElementById("users");
    detailsElement.style.visibility = "hidden";
}
