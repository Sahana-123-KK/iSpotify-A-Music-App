// console.log("Playing Song...");
const audioElement = new Audio("songs/1.mp3");
// audioVariable.play();
let songIndex = 0;
let masterPlay = document.getElementById("playbtn");
const myprogressBar = document.getElementById("myprogressBar");
const gif = document.getElementById("gif");
const songmastertitle = document.getElementById("songmastertitle");
let songItems = Array.from(document.getElementsByClassName("songitem"));
let songs = [
  {
    songName: "Main Tera Boyfriend - Raabta",
    songPath: "./songs/1.mp3",
    coverPath: "./covers/1.jpg",
    duration: "4:07",
  },
  {
    songName: "Tukur Tukur - Dilwale",
    songPath: "./songs/2.mp3",
    coverPath: "./covers/1.jpg",
    duration: "4:07",
  },
  {
    songName: "Haule Haule - Rab Ne Bana De Jodi",
    songPath: "./songs/3.mp3",
    coverPath: "./covers/1.jpg",
    duration: "4:07",
  },
  {
    songName: "Hawayein - Jab Harry Met Sejal",
    songPath: "./songs/4.mp3",
    coverPath: "./covers/1.jpg",
    duration: "4:07",
  },
  {
    songName: "Kaise Hua - Kabir Singh",
    songPath: "./songs/5.mp3",
    coverPath: "./covers/1.jpg",
    duration: "4:07",
  },

  {
    songName: "Man Mast Magan- 2 States",
    songPath: "./songs/6.mp3",
    coverPath: "./covers/1.jpg",
    duration: "4:07",
  },
  {
    songName: "Sajdaa-My Name is Khan",
    songPath: "./songs/7.mp3",
    coverPath: "./covers/1.jpg",
    duration: "4:07",
  },
  {
    songName: "Sakhiyan 2.0 - Bell Bottom",
    songPath: "./songs/8.mp3",
    coverPath: "./covers/1.jpg",
    duration: "4:07",
  },
  {
    songName: "Teri Aankhon Mein-Album",
    songPath: "./songs/9.mp3",
    coverPath: "./covers/1.jpg",
    duration: "4:07",
  },
  {
    songName: "Vaaste-Album",
    songPath: "./songs/5.mp3",
    coverPath: "./covers/1.jpg",
    duration: "4:07",
  },
];

//Event handlers
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songPlay")).forEach((element) => {
    element.classList.remove("fa-pause");
    element.classList.add("fa-play");
  });
};

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
  } else {
    makeAllPlays();
    audioElement.pause();
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener("timeupdate", () => {
  console.log("Updaing Time");
  let percentage = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myprogressBar.value = percentage;
  if (audioElement.currentTime == audioElement.duration) {
    audioElement.pause();
    console.log("yes");
    if (songIndex >= 9) {
      songIndex = 0;
    } else {
      songIndex++;
    }
    audioElement.value = 0;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.play();
  }
  songmastertitle.innerText = songs[songIndex].songName;
});

myprogressBar.addEventListener("change", () => {
  const duration = (myprogressBar.value * audioElement.duration) / 100;
  audioElement.currentTime = duration;
});
// myprogressBar.addEventListener("change",()=>{

// })

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByTagName("span")[0].innerHTML = songs[i].songName;
});

Array.from(document.getElementsByClassName("songPlay")).forEach((element) => {
  element.addEventListener("click", (e) => {
    console.log(songIndex);
    console.log(e.target.id);
    if (songIndex == e.target.id && !audioElement.paused) {
      audioElement.pause();
      e.target.classList.remove("fa-pause");
      e.target.classList.add("fa-play");
      gif.style.opacity = 0;
      masterPlay.classList.remove("fa-pause");
      masterPlay.classList.add("fa-play");
    } else if (songIndex == e.target.id && audioElement.paused) {
      audioElement.play();
      e.target.classList.remove("fa-play");
      e.target.classList.add("fa-pause");
      masterPlay.classList.remove("fa-play");
      masterPlay.classList.add("fa-pause");
      gif.style.opacity = 1;
    } else {
      gif.style.opacity = 1;

      makeAllPlays();
      songIndex = parseInt(e.target.id); //-->Parse int is necessay so tha
      console.log(e.target.id);
      e.target.classList.remove("fa-play");
      e.target.classList.add("fa-pause");
      audioElement.currentTime = 0;
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      songmastertitle.innerText = songs[songIndex].songName;

      audioElement.play();
      masterPlay.classList.remove("fa-play");
      masterPlay.classList.add("fa-pause");
    }
  });
});

let previous = document.getElementById("previous");

previous.addEventListener("click", () => {
  gif.style.opacity = 1;

  if (songIndex <= 0) {
    songIndex = 9;
  } else {
    songIndex--;
  }
  songmastertitle.innerText = songs[songIndex].songName;

  audioElement.value = 0;
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.play();
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});

// if (audioElement.currentTime == audioElement.duration) {
//   audioElement.pause();
//   console.log("yes");
//   if (songIndex >= 9) {
//     songIndex = 0;
//   } else {
//     songIndex++;
//   }
//   audioElement.value = 0;
//   audioElement.src = `songs/${songIndex + 1}.mp3`;
//   audioElement.play();
// }

document.getElementById("next").addEventListener("click", () => {
  gif.style.opacity = 1;

  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  songmastertitle.innerText = songs[songIndex].songName;
  audioElement.value = 0;
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.play();
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});

console.log(audioElement.duration);
