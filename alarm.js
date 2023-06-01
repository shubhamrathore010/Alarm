const currentTime = document.querySelector("h1"), // select h1 tag in a variable name - curruntTime
  content = document.querySelector(".content"), // select content - classes propertyes in content variable
  selectMenu = document.querySelectorAll("select"), // select a select eliments in a selectMenu
  setAlarmBtn = document.querySelector("button"), // select a button eliments in a setAlarmBtn variable
  wrapper = document.querySelector(".wrapper");
let alarmTime,
  isAlarmSet, // create two variable alarmTime and isAlarmSet
  ringtone = new Audio("Normal.mp3"); // created rington variable and hold audio links

//    creating a for loop  who start frome 12 to 0 where if i < 10 so add '0' in i
//    and set variable i value in option value

for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}
// male set intrevel
setInterval(() => {
  // GETTING HOUR, MINS, SECS by fun setinterval for set time for delay in avery set time
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

  if (h >= 12) {
    // if hour is grater than 12   cear value with - 12 with every value
    h = h - 12;
    ampm = "PM"; // set into PM of value of variabel ampm
  }
  // IF HOUR IS 0, SET THIS VALUE TO 12
  h = h == 0 ? (h = 12) : h;
  //adding 0 before hr, min, sec if this is less than 10
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

  if (alarmTime === `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
});

function setAlarm() {
  if (isAlarmSet) {
    // if isAlarmSet is true

    alarmTime = ""; // clear the value of alarmTime
    ringtone.pause(); // pause the ringtone
    content.classList.remove("disalbe"); // remove txt frome btn
    setAlarmBtn.innerText = "Set Alarm"; // set txt to btn
    return (isAlarmSet = false); // return isAlarmSet value to false
  }
  // getting hour, minute, ampm selet tag value
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please, select a valid time to set Alarm!");
  }
  alarmTime = time;
  isAlarmSet = true;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Clear Alarm";
}

setAlarmBtn.addEventListener("click", setAlarm);
