console.log("hello there");
let currentsong = new Audio();
let tracks;
let cards;
let card2;

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs() {
  tracks = [
    { name: "Anti-Hero", filename: "Anti-Hero-645939.mp3", arname: "Taylor Swift", img: "https://i.scdn.co/image/ab67616d00004851e787cffec20aa2a396a61647" },
    { name: "Fix You", filename: "Fix_You-556571.mp3", arname: "Coldplay", img: "https://i.scdn.co/image/ab67616d00001e024e0362c225863f6ae2432651" },
    { name: "Love Story", filename: "Love_Story-151200.mp3", arname: "Taylor Swift", img: "https://i.scdn.co/image/ab67616d00004851877ea8fa223c26f19aaef92d" },
    { name: "Tum Hi Ho", filename: "Tum_Hi_Ho_Aashiqui_2-576744.mp3", arname: "Arijit Singh", img: "https://i.scdn.co/image/ab67616d000048516404721c1943d5069f0805f3" },
    { name: "God_Put_A_Smile", filename: "God_Put_A_Smile-18411.mp3", arname: "Coldplay", img: "https://i.scdn.co/image/ab67616d00004851de09e02aa7febf30b7c02d82" },
    { name: "Levitating", filename: "Levitating-641072.mp3", arname: "Dua Lipa", img: "https://i.scdn.co/image/ab67616d000048514bc66095f8a70bc4e6593f4f" }
  ];

  cards = [
    { name: "Aabaad Barbaad", filename: "Aabaad Barbaad.mp3", arname: "Arijit Singh", img: "https://i.scdn.co/image/ab67616d00001e02f338d36ff740be4cdc5ec709" },
    { name: "Agar Tum Saath Ho", filename: "Agar_Tum_Saath_Ho.mp3", arname: "Arijit Singh", img: "https://i.scdn.co/image/ab67616d00001e02da50894e074ecd5ce61de0a1" },
    { name: "Aayat", filename: "Aayat.mp3", arname: "Arijit Singh", img:"https://i.scdn.co/image/ab67616d00001e026b01530825529db0bee75515" }
  ];

  card2 = [
    { filename: "A-Sky-Full-Of-Stars.mp3", name: "A Sky Full of Stars", arname: "Coldplay", img:"https://i.scdn.co/image/ab67616d00001e026b01530825529db0bee75515" },
    { filename: "Hymn-for-the-Weekend.mp3", name: "Hymn for the Weekend", arname: "Coldplay", img:"https://i.scdn.co/image/ab67616d00001e026b01530825529db0bee75515" },
    { filename: "Viva-La-Vida.mp3", name: "Viva La Vida", arname: "Coldplay", img:"https://i.scdn.co/image/ab67616d00001e026b01530825529db0bee75515" },
    { filename: "yellow.mp3", name: "Yellow", arname: "Coldplay", img: "https://i.scdn.co/image/ab67616d00001e026b01530825529db0bee75515" }
  ];}


//   let a = await fetch("http://127.0.0.1:3000/id.html");
//   let response = await a.text();
//   let div = document.createElement("div");
//   div.innerHTML = response;
//   let as = div.getElementsByTagName("a");
  

//   for (let element of as) {
//     if (element.href.endsWith(".mp3")) {
//       const filename = element.href.split("tracks/")[1];
//       const name = element.innerText.trim();
//       const arname = element.dataset.arname
//       const img = element.dataset.img
//       tracks.push({
//         filename: filename,
//          name: name ,
//          arname:arname,
//          img:img

//       });
//     }
//   }

//   let b = await fetch("http://127.0.0.1:3000/id.html");
//   let res = await b.text();
//   let d= document.createElement("d");
//   d.innerHTML = res;
//   let c = div.getElementsByTagName("b");

//   for (let element of c) {
//     if (element.href.endsWith(".mp3")) {
//       const filename = element.href.split("cards/")[1];
//       const name = element.innerText.trim();
//       const arname = element.dataset.arname
//       const img = element.dataset.img
//       cards.push({
//         filename: filename,
//          name: name ,
//          arname:arname,
//          img:img

//       });
//     }
//   }

// }

const playmusic = (trac, pause = false) => {
  if (typeof trac !== "string") {
    console.error("Invalid track:", trac);
    return;
  }

  let found = false;

  // Try playing from tracks folder first
  currentsong.src = `./tracks/${encodeURIComponent(trac)}`;
  currentsong.load();

  currentsong.onerror = () => {
    if (!found) {
      console.warn("Track not found in tracks folder.");
      currentsong.src = `./cards/${encodeURIComponent(trac)}`; // Fallback to cards folder
      currentsong.load();

      currentsong.onerror = () => {
        console.error("Error loading track from both folders:", trac);
      };

      if (!pause) {
        currentsong.play()
          .then(() => play.src = "pause.png")
          .catch(err => console.error("Playback error:", err));
      }
    }
  };

  

  if (!pause) {
    currentsong.play()
      .then(() => {
        found = true;
        play.src = "pause.png";
      })
      .catch(err => console.error("Playback error:", err));
  }

  document.querySelector(".songinfo").innerHTML = trac.replace(/-\d+/, "");
  document.querySelector(".songtime").innerHTML = "00:00/00:00";
};





async function main() {
  await getsongs();
const csongList = document.querySelector(".csong ul");
csongList.innerHTML = "";
document.getElementById("c1").addEventListener("click", () => {
   cards.forEach(card => {
    csongList.innerHTML +=
      `<li style="display: flex; align-items: center; gap: 10px;" data-filename="${card.filename}">
        <img src="${card.img}" height="50px" style="border-radius: 6px; padding: 2px;">
        <div style="flex-direction: column; width: 200px;">
          <div class="name">${card.name.replace(/-\d+/, "")}</div>
          <div class="arname">${card.arname}</div>
        </div>
        <img src="play.png" style="width: 25px; filter: invert(1); padding: 5px;">
      </li>`;
  });

  // Add event listeners for playing songs from card list
  Array.from(csongList.getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", () => {
      const filename = e.getAttribute("data-filename");
      console.log("Card song clicked: ", filename);
      if (filename) {
        playmusic(filename);
      }
    });
  });
});



  let songul = document.querySelector(".songslist ul");
  songul.innerHTML = "";

  tracks.forEach(track => {
    songul.innerHTML +=
     `<li style="display: flex; align-items: center; gap: 10px;" data-filename="${track.filename}">
      <img src="${track.img}" height="50px" style="border-radius: 6px; padding: 2px;">
      <div style="flex-direction: column; width: 200px;">
        <div class="name">${track.name.replace(/-\d+/, "")}</div>
        <div class="arname">${track.arname}</div>
      </div>
      <img src="play.png" style="width: 25px; filter: invert(1); padding: 5px;">
    </li>`;
  });

  // Add event listeners for each song item in the song list
  Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", () => {
      const filename = e.getAttribute("data-filename");
      console.log("Song clicked: ", filename); // Debugging
      if (filename) {
        playmusic(filename);
      }
    });
  });

  if (tracks.length > 0) {
    playmusic(tracks[0].filename, true); // Play first song if available
  } else {
    console.error("No songs found!");
  }

  
  
    
}

main();


// Updating time
currentsong.addEventListener("timeupdate", () => {
  console.log(currentsong.currentTime, currentsong.duration);
  document.querySelector(".songtime").innerHTML =
    `${secondsToMinutesSeconds(currentsong.currentTime)}/${
      secondsToMinutesSeconds(currentsong.duration)}`;
  document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
});

// Seekbar functionality
document.querySelector(".seekbar").addEventListener("click", e => {
  let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
  document.querySelector(".circle").style.left = percent + "%";
  currentsong.currentTime = (currentsong.duration * (percent)) / 100;
});

const play = document.getElementById("play");
const previous = document.getElementById("previous");
const next = document.getElementById("next");

// Add event listener to previous and next
previous.addEventListener("click", () => {
  console.log("Previous clicked");
  const currentTrack = currentsong.src.split("/").pop();
  const index = tracks.findIndex(song => song.filename === currentTrack);

  if (index > 0) {
    playmusic(tracks[index - 1].filename);
  }
});

next.addEventListener("click", () => {
  console.log("Next clicked");
  const currentTrack = currentsong.src.split("/").pop();
  const index = tracks.findIndex(song => song.filename === currentTrack);

  if (index < tracks.length - 1) {
    playmusic(tracks[index + 1].filename);
  }
});

// Add event listener to volume
document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
  console.log(e, e.target, e.target.value);
  currentsong.volume = parseInt(e.target.value) / 100;
});

// Click event to hide/unhide sections
const libraryButton = document.getElementById('librarybutton');
const lboxes = document.querySelector('.lboxes');
const links = document.querySelector('.links');
const eng = document.querySelector('.eng');
const Cookies = document.querySelector('.Cookies');
const songslist = document.querySelector('.songslist');
const csong=document.querySelector('.csong') ;
const ctwo=document.querySelector('.ctwo');


libraryButton.addEventListener("click", () => {
  console.log("Library button clicked!");
  
  // Hide non-library sections
  lboxes.classList.add("hidden");
  links.classList.add("hidden");
  eng.classList.add("hidden");
  Cookies.classList.add("hidden");
  songslist.classList.remove("hidden");

});

// Play, pause, previous, next functionality
play.addEventListener("click", () => {
  if (currentsong.paused) {
    currentsong.play();
    play.src = "pause.png";
  } else {
    currentsong.pause();
    play.src = "play.png";
  }
});

// Click event to show songs on left
document.getElementById("c1").addEventListener("click", () => {
  // Hide non-library sections
  lboxes.classList.add("hidden");
  links.classList.add("hidden");
  eng.classList.add("hidden");
  Cookies.classList.add("hidden");
  songslist.classList.add("hidden");
  csong.classList.remove("hidden");

});

document.getElementById("c2").addEventListener("click", () => {
  console.log("card2 clicked");
  // Hide non-library sections
  lboxes?.classList.add("hidden");
  links?.classList.add("hidden");
  eng?.classList.add("hidden");
  Cookies?.classList.add("hidden");
  songslist?.classList.add("hidden");
  csong?.classList.add("hidden");
  ctwo?.classList.remove("hidden");
});




document.addEventListener("DOMContentLoaded", function () {
  const card2 = [
      { filename: "A-Sky-Full-Of-Stars.mp3", name: "A Sky Full of Stars", arname: "Coldplay", img:"https://i.scdn.co/image/ab67616d00001e026b01530825529db0bee75515"  },
      { filename: "Hymn-for-the-Weekend.mp3", name: "Hymn for the Weekend", arname: "Coldplay", img:"https://i.scdn.co/image/ab67616d00001e026b01530825529db0bee75515"   },
      { filename: "Viva-La-Vida.mp3", name: "Viva La Vida", arname: "Coldplay", img:"https://i.scdn.co/image/ab67616d00001e026b01530825529db0bee75515"  },
      { filename: "yellow.mp3", name: "Yellow", arname: "Coldplay", img: "https://i.scdn.co/image/ab67616d00001e026b01530825529db0bee75515" }
  ];

  const ctwo = document.querySelector(".ctwo ul");
  
  card2.forEach(song => {
      const li = document.createElement("li");
      li.innerHTML = `
          <img src="${song.img}" alt="${song.name}" width="50" height="50">
          <div>
              <p><strong>${song.name}</strong></p>
              <p>${song.arname}</p>
          </div>
          <button class="play" data-src="${song.filename}">▶</button>
      `;
      ctwo.appendChild(li);
  });


  
  const playCard2Music = (songFile, pause = false) => {
    if (typeof songFile !== "string") {
      console.error("Invalid song file:", songFile);
      return;
    }
  
    let card2Audio = new Audio(`./card2/${encodeURIComponent(songFile)}`);
    card2Audio.load();
  
    card2Audio.onerror = () => {
      console.error("Error loading track from card2 folder:", songFile);
    };
  
    if (!pause) {
      card2Audio.play()
        .then(() => console.log("Playing:", songFile))
        .catch(err => console.error("Playback error:", err));
    }
  
    document.querySelector(".songinfo").innerHTML = songFile.replace(/-\d+/, "");
    document.querySelector(".songtime").innerHTML = "00:00/00:00";
  };

  




  document.querySelector(".ctwo ul").addEventListener("click", function (e) {
    if (e.target.classList.contains("play")) {
      const filename = e.target.getAttribute("data-src");
      console.log("Playing card2 song:", filename);
      playCard2Music(filename);
    }
  });
  
});



















