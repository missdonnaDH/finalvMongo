function run() {
    fetch("/api/movie")
        .then((response) => response.json())
        .then((data) => {
            const detailsElement = document.getElementById("results");
            let user = "";
            for (let i = 0; i < data.length; i++) {
                user += `<tr> <td>${data[i].nom}</td> <td> ${data[i].num}</d> </tr>`;
            }
            detailsElement.innerHTML = user;

            detailsElement.style.visibility = "visible";
        });
}

function hide() {
    const detailsElement = document.getElementById("users");

    detailsElement.style.visibility = "hidden";
}
