const data = `[
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6
    }
]`;
const scheduleData = JSON.parse(data);

const scheduleTable = document.getElementById("scheduleTable");

function renderSchedule() {
  scheduleTable.innerHTML = "";

  scheduleData.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.time}</td>
            <td>${item.maxParticipants}</td>
            <td id="currentParticipants${item.id}">${
      item.currentParticipants
    }</td>
            <td>
                <button onclick="enroll(${item.id})" id="enrollButton${
      item.id
    }" ${
      item.isEnrolled || item.currentParticipants >= item.maxParticipants
        ? "disabled"
        : ""
    }>Записаться</button>
            </td>
            <td>
                <button onclick="cancelEnrollment(${
                  item.id
                })" id="cancelEnrollmentButton${item.id}" ${
      item.isEnrolled ? "" : "disabled"
    }>Отменить запись</button>
            </td>`;
    scheduleTable.appendChild(row);
  });
}

function enroll(id) {
  const index = scheduleData.findIndex((item) => item.id === id);
  if (
    !scheduleData[index].isEnrolled &&
    scheduleData[index].currentParticipants <
      scheduleData[index].maxParticipants
  ) {
    scheduleData[index].currentParticipants++;
    scheduleData[index].isEnrolled = true;
    renderSchedule();
    saveToLocalStorage();
  }
}

function cancelEnrollment(id) {
  const index = scheduleData.findIndex((item) => item.id === id);
  if (scheduleData[index].isEnrolled) {
    scheduleData[index].currentParticipants--;
    scheduleData[index].isEnrolled = false;
    renderSchedule();
    saveToLocalStorage();
  }
}

function saveToLocalStorage() {
  localStorage.setItem("scheduleData", JSON.stringify(scheduleData));
}

if (localStorage.getItem("scheduleData")) {
  const storedScheduleData = JSON.parse(localStorage.getItem("scheduleData"));
  scheduleData.forEach((item) => {
    const storedItem = storedScheduleData.find(
      (storedItem) => storedItem.id === item.id
    );
    if (storedItem) {
      item.currentParticipants = storedItem.currentParticipants;
      item.isEnrolled = storedItem.isEnrolled;
    }
  });
}

renderSchedule();
