function addApp() {
    let appList = document.getElementById("apps");
    let appDiv = document.createElement("div");
    appDiv.classList.add("row", "app", "mt-2");
    appDiv.innerHTML = `
        <div class="col-md-5">
            <input type="number" class="form-control battery" placeholder="Battery">
        </div>
        <div class="col-md-5">
            <input type="number" class="form-control importance" placeholder="Importance">
        </div>
        <div class="col-md-2 text-center">
            <button class="btn btn-danger remove-app">❌</button>
        </div>
    `;
    appList.appendChild(appDiv);

    // Remove app on clicking ❌ button
    appDiv.querySelector(".remove-app").addEventListener("click", function () {
        appDiv.remove();
    });
}

function optimizeApps() {
    let batteryCapacity = document.getElementById("battery_capacity").value;
    let apps = [];

    document.querySelectorAll(".app").forEach(app => {
        let battery = app.querySelector(".battery").value;
        let importance = app.querySelector(".importance").value;
        if (battery && importance) {
            apps.push({ "battery": parseInt(battery), "importance": parseInt(importance) });
        }
    });

    fetch("/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "apps": apps, "battery_capacity": parseInt(batteryCapacity) })
    })
    .then(response => response.json())
    .then(data => {
        let selectedAppsList = document.getElementById("selected_apps");
        selectedAppsList.innerHTML = "";
        data.selected_apps.forEach(app => {
            let li = document.createElement("li");
            li.classList.add("list-group-item");
            li.innerText = `Battery: ${app.battery}, Importance: ${app.importance}`;
            selectedAppsList.appendChild(li);
        });
    });
}
