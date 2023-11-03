document.addEventListener("DOMContentLoaded", function() {
    loadPasswordEntries();
    const passwordForm = document.getElementById("passwordForm");

    passwordForm.addEventListener("submit", function(event) {
        event.preventDefault();
        savePasswordEntry();
    });

    // Add an event listener for dynamically created delete buttons
    document.getElementById("passwordTable").addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            deletePasswordEntry(event.target);
        }
    });
});

function loadPasswordEntries() {
    const passwordTable = document.getElementById("passwordTable");
    passwordTable.innerHTML = "";

    const passwordDetails = JSON.parse(localStorage.getItem("passwordDetail")) || [];

    passwordDetails.forEach(function(entry, index) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.Website}</td>
            <td>${entry.Username}</td>
            <td>${entry.Password}</td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
        `;

        passwordTable.appendChild(row);
    });
}

function savePasswordEntry() {
    const Website = document.getElementById("Website").value;
    const Username = document.getElementById("Username").value;
    const password = document.getElementById("password").value;

    const passwordDetails = JSON.parse(localStorage.getItem("passwordDetail")) || [];

    passwordDetails.push({ Website, Username, Password: password });

    localStorage.setItem("passwordDetail", JSON.stringify(passwordDetails));

    loadPasswordEntries();

    document.getElementById("Website").value = "";
    document.getElementById("Username").value = "";
    document.getElementById("password").value = "";
   
   
}

function deletePasswordEntry(deleteButton) {
    const index = deleteButton.getAttribute("data-index");
    const passwordDetails = JSON.parse(localStorage.getItem("passwordDetail")) || [];

    if (index !== null && index >= 0 && index < passwordDetails.length) {
        passwordDetails.splice(index, 1);
        localStorage.setItem("passwordDetail", JSON.stringify(passwordDetails));
        loadPasswordEntries();
    }
    alert("Confirm to delete Password!");
}

function copyPasswordToClipboard(copyButton) {
    const passwordElement = copyButton.parentElement.previousElementSibling.querySelector(".password-hidden");

    const passwordText = passwordElement.textContent;

    const textArea = document.createElement("textarea");
    textArea.value = passwordText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    alert("Password copied to clipboard!");
}