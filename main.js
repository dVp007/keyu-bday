const startstop = document.getElementById("startstop");
const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");
const hours = document.getElementById("hours");
const days = document.getElementById("days");
setOptions();
function getCurrentGiftTime(hour) {
  if (hour >= 0 && hour < 10) {
    return 0;
  } else if (hour >= 10 && hour < 13) {
    return 10;
  } else if (hour >= 13 && hour < 16) {
    return 13;
  } else if (hour >= 16 && hour < 20) {
    return 16;
  } else {
    return 20;
  }
}
const currentHour = new Date().getHours(); // 0-23
const currentGift = JSON.parse(
  localStorage.getItem(getCurrentGiftTime(currentHour)),
);

const option1 = (document.getElementById("gift-content-1").innerHTML =
  currentGift.option1);
const option2 = (document.getElementById("gift-content-2").innerHTML =
  currentGift.option2);

if (currentGift.isOpened) {
  const giftContainer = document.getElementById("g-container");
  giftContainer.childNodes.forEach((c, i) => {
    // Make sure it's an element node
    if (c instanceof HTMLElement) {
      if (currentGift.openedOption === "option1" && i == 1) {
        c.classList.add("opened");
      }
      if (currentGift.openedOption === "option2" && i == 3) {
        c.classList.add("opened");
      }
    }
  });
}
const defaults = {
  spread: 360,
  ticks: 100,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
};
const today = new Date();
const todayAt12 = new Date();
todayAt12.setHours(0, 0, 0, 0);
const birthdate = new Date("October 30, 2025");
let totalSeconds = 0;
if (todayAt12.getTime() === birthdate.getTime()) {
  totalSeconds = 0;
} else {
  birthdate.setFullYear(today.getFullYear());
  totalSeconds = (birthdate - today) / 1000;
}

const setDisplay = (sec) => {
  days.innerText = String(Math.floor(sec / (24 * 60 * 60))).padStart(2, "0");
  sec = sec % (24 * 60 * 60);
  hours.innerText = String(Math.floor(sec / (60 * 60))).padStart(2, "0");
  sec = sec % (60 * 60);
  minutes.innerText = String(Math.floor(sec / 60)).padStart(2, "0");
  sec = sec % 60;
  seconds.innerText = String(Math.floor(sec)).padStart(2, "0");
};

const setHappyBirthday = () => {
  const counterContainer = document.getElementById("counter-container");
  counterContainer.setAttribute("style", "display:none");
  const birthdayContainer = document.getElementById("birthday-container");
  birthdayContainer.setAttribute("style", "display:flex");
  shoot();
};

function shoot() {
  confetti({
    ...defaults,
    particleCount: 150,
    scalar: 1.2,
    shapes: ["circle", "square", "stars"],
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  });

  confetti({
    ...defaults,
    particleCount: 20,
    scalar: 2,
    shapes: ["emoji"],
    shapeOptions: {
      emoji: {
        value: ["🦄", "🌈"],
      },
    },
  });
}

const timer = setInterval(() => {
  if (totalSeconds <= 0) {
    totalSeconds = 0;
    clearInterval(timer);
    setHappyBirthday();
    return;
  }
  totalSeconds -= 1;
  setDisplay(totalSeconds);
}, 1000);

function nextGiftTime() {
  if (!currentGift.isOpened) return;
  if (currentHour >= 0 && currentHour < 10) {
    return "Next Gift at 10 am";
  } else if (currentHour >= 10 && currentHour < 13) {
    return "Next Gift at 1 pm";
  } else if (currentHour >= 13 && currentHour < 16) {
    return "Next Gift at 4 pm";
  } else {
    return "Next Gift at 8 pm";
  }
}
const nextGift = document.getElementById("next-gift-time");

nextGift.innerHTML = nextGiftTime();

function openGift(giftBox, emoji, id) {
  let alreadyOpened = false;
  // check if any of the gift are open
  const giftContainer = document.getElementById("g-container");
  giftContainer.childNodes.forEach((c) => {
    // Make sure it's an element node
    if (c instanceof HTMLElement) {
      if (c.classList.contains("opened")) {
        alreadyOpened = true;
      }
    }
  });
  if (alreadyOpened) return;
  if (!giftBox.classList.contains("opened")) {
    giftBox.classList.add("opened");
    // update localStorage
    localStorage.setItem(
      currentHour,
      JSON.stringify({
        ...currentGift,
        isOpened: true,
        openedOption: id,
      }),
    );
    // Trigger confetti when gift is opened
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: giftBox.getBoundingClientRect().left / window.innerWidth + 0.05,
          y: giftBox.getBoundingClientRect().top / window.innerHeight + 0.1,
        },
      });
    }, 300);
  }
}

function setOptions() {
  if (localStorage.getItem(getCurrentGiftTime(new Date().getHours()))) return;
  localStorage.setItem(
    "0",
    JSON.stringify({
      option1: "Watch your favorite Movie?",
      option2: "Play mafia with friends?",
      isOpened: false,
      openedOption: "",
    }),
  );
  localStorage.setItem(
    "10",
    JSON.stringify({
      option1: "Indian idli Medu wada breakfast",
      option2: "Gail's or fitzbillies breakfast",
      isOpened: false,
      openedOption: "",
    }),
  );
  localStorage.setItem(
    "13",
    JSON.stringify({
      option1: "Lunch at Kineya",
      option2: "Lunch at Las Iguanas",
      isOpened: false,
      openedOption: "",
    }),
  );
  localStorage.setItem(
    "16",
    JSON.stringify({
      option1: "100£ worth of Clothes Shopping",
      option2: "100£ shopping coupon from Dharmil",
      isOpened: false,
      openedOption: "",
    }),
  );
  localStorage.setItem(
    "20",
    JSON.stringify({
      option1: "Dinner at Franco Manca",
      option2: "Movie at The Light Cinema",
      isOpened: false,
      openedOption: "",
    }),
  );
}
