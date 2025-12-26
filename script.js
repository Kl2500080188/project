function validateLogin() {
  const correctUsername = "admin";
  const correctPassword = "12345";

  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;

  if (username === correctUsername && password === correctPassword) {
    // Store username in localStorage
    localStorage.setItem("loggedInUser", username);

    // Redirect to home page
    window.location.href = "home.html";
    return false;
  } else {
    alert("Invalid username or password!");
    return false;
  }
}

  const user = localStorage.getItem("loggedInUser");

  if (user) {
    document.getElementById("userInfo").innerText =
      "Logged in : " + user;
  } else {
    // If not logged in, redirect to login page
    window.location.href = "login.html";
  }
  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  }
document.addEventListener("DOMContentLoaded", function () {

    // ===== LOGIN CHECK =====
    const user = localStorage.getItem("loggedInUser");

    if (user) {
        const userInfo = document.getElementById("userInfo");
        if (userInfo) {
            userInfo.innerText = "Logged in as: " + user;
        }
    } else {
        window.location.href = "login.html";
    }

    // ===== LOGOUT =====
    window.logout = function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    };

    const form = document.querySelector(".activity-form");
    const activityList = document.querySelector(".activity-list ul");

    // Load activities on page load
    loadActivities();

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const activity = {
                id: Date.now(), // unique id
                name: document.getElementById("activity-name").value,
                category: document.getElementById("activity-type").value,
                desc: document.getElementById("activity-desc").value
            };

            saveActivity(activity);
            displayActivity(activity);
            form.reset();
        });
    }

    // ===== Save activity =====
    function saveActivity(activity) {
        let activities = JSON.parse(localStorage.getItem("activities")) || [];
        activities.push(activity);
        localStorage.setItem("activities", JSON.stringify(activities));
    }

    // ===== Load activities =====
    function loadActivities() {
        let activities = JSON.parse(localStorage.getItem("activities")) || [];
        activities.forEach(displayActivity);
    }

    // ===== Display activity with Remove button =====
    function displayActivity(activity) {
        if (!activityList) return;

        const li = document.createElement("li");
        li.setAttribute("data-id", activity.id);

        li.innerHTML = `
            <strong>${activity.name}:</strong> ${activity.desc} (${activity.category})
            <button class="remove-btn">Remove</button>
        `;

        // Remove button click
        li.querySelector(".remove-btn").addEventListener("click", function () {
            removeActivity(activity.id);
            li.remove();
        });

        activityList.appendChild(li);
    }

    // ===== Remove activity =====
    function removeActivity(id) {
        let activities = JSON.parse(localStorage.getItem("activities")) || [];
        activities = activities.filter(activity => activity.id !== id);
        localStorage.setItem("activities", JSON.stringify(activities));
    }
});
document.addEventListener("DOMContentLoaded", function () {

    // ===== LOGIN CHECK =====
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const userInfo = document.getElementById("userInfo");
    if (userInfo) {
        userInfo.innerText = "Logged in as: " + user;
    }

    // ===== PROGRESS PAGE LOGIC =====
    updateProgress();

    function updateProgress() {
        const activities = JSON.parse(localStorage.getItem("activities")) || [];

        if (activities.length === 0) return;

        const counts = {
            sports: 0,
            arts: 0,
            volunteering: 0,
            academic: 0,
            other: 0
        };

        activities.forEach(act => {
            if (counts.hasOwnProperty(act.category)) {
                counts[act.category]++;
            }
        });

        const total = activities.length;

        setProgress("sports", counts.sports, total);
        setProgress("arts", counts.arts, total);
        setProgress("volunteering", counts.volunteering, total);
        setProgress("academic", counts.academic, total);
        setProgress("other", counts.other, total);
    }

    function setProgress(type, count, total) {
        const percent = Math.round((count / total) * 100);

        const bar = document.getElementById(type + "Bar");
        const text = document.getElementById(type + "Percent");

        if (bar && text) {
            bar.value = percent;
            text.innerText = percent + "%";
        }
    }

});


