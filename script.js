// show current date info
function updateCalendar() {
    const now = new Date();

    const monthNames = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY",
        "JUNE", "JULY", "AUGUST", "SEPTEMBER",
        "OCTOBER", "NOVEMBER", "DECEMBER"
    ];

    const month = monthNames[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    const dayName = now.toLocaleDateString('en-US', { weekday: 'short' });

    document.getElementById('month').textContent = month;
    document.getElementById('day').textContent = day;
    document.getElementById('year').textContent = year;
    document.getElementById('week').textContent = dayName;
}

updateCalendar();


// toggle state
let isOpen = false;

function showMonthCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const monthIndex = now.getMonth();

    const daysContainer = document.getElementById("monthDays");

    const week = document.getElementById("week");
    const day = document.getElementById("day");
    const yearText = document.getElementById("year");
    const img = document.querySelector("img");
    const monthEl = document.getElementById("month");

    if (!isOpen) {
        // OPEN calendar
        daysContainer.innerHTML = "";

        // ✅ DAY LABELS
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        for (let d of dayNames) {
            daysContainer.innerHTML += `<div class="day-label">${d}</div>`;
        }

        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const firstDay = new Date(year, monthIndex, 1).getDay();

        // empty slots
        for (let i = 0; i < firstDay; i++) {
            daysContainer.innerHTML += "<div></div>";
        }

        // days
        for (let d = 1; d <= daysInMonth; d++) {
            daysContainer.innerHTML += `<div>${d}</div>`;
        }

        // hide elements
        week.style.display = "none";
        day.style.display = "none";
        yearText.style.display = "none";
        img.style.display = "none";

        // add spacing class
        monthEl.classList.add("month-open");

        // resize window
        window.electronAPI.resizeWindow(250, 400);

        isOpen = true;

    } else {
        // CLOSE calendar
        daysContainer.innerHTML = "";

        // show elements again
        week.style.display = "block";
        day.style.display = "block";
        yearText.style.display = "block";
        img.style.display = "block";

        // remove spacing class
        monthEl.classList.remove("month-open");

        // resize back
        window.electronAPI.resizeWindow(250, 270);

        isOpen = false;
    }
        //close button
        document.getElementById("closeBtn").addEventListener("click", () => {
        window.electronAPI.closeWindow();
});
}