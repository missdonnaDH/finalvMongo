function run() {
    fetch("/api/movie")
        .then((response) => response.json())
        .then((data) => {
            const detailsElement = document.getElementById("movie");
            let user = "";
            for (let i = 0; i < data.length; i++) {
                user += `${data[i].nom} - ${data[i].num}\n`;
            }
            detailsElement.getElementsByTagName("p")[0].innerText = user;

            detailsElement.style.visibility = "visible";
        });
}
