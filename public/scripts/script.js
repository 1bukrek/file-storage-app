// displaying server message after submitting
const form = document.querySelector("form");
const messageDiv = document.getElementById("message");

form.addEventListener("submit", function (e) {
    // prevent refreshing the page
    e.preventDefault();

    const formData = new FormData(form);
    fetch("/upload", { method: "POST", body: formData })
        .then((response) => response.text())
        .then((data) => {
            // displaying the message
            let { content, url } = JSON.parse(data)
            messageDiv.innerHTML = content
            messageDiv.style.color = "green";
            let a = document.createElement("a")
            a.innerText = "View image"
            a.setAttribute("href", url)
            messageDiv.appendChild(a)
        })
        .catch((error) => {
            console.log(error)
            messageDiv.innerHTML =
                "Error occured while uploading the file!";
            messageDiv.style.color = "red";
        });
});