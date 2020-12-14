const button = document.querySelector("button");
const login = document.getElementById("login");
const allAudio = document.querySelectorAll("audio");
const options = document.getElementsByClassName("option");
localStorage.email = 'none';
let chapter = 0;
let day = 0;
for(let x=0; x<allAudio.length; x++){
 allAudio[x].volume = 0.2; 
}
let audio = document.getElementById("login-music");
let musicOn = true;
const gun = document.getElementById("Gunshot");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    /* DO SOMETHING ELSE */
}

button.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    musicOn = true;
    
  } else {
    musicOn = false;
    audio.pause();
  }
});

login.addEventListener("click", ()=>{
    login.style.transform = "translateX(-200%)";
    gun.play();
    if(musicOn)
    audio.play();
});

let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});

window.addEventListener("load", function() {
  document.body.classList.remove("preload");
});

const sound = document.getElementById("Selected");
const sound2 = document.getElementById("Selected2");
const sound3 = document.getElementById("Selected3");
const sound4 = document.getElementById("Selected4");
const sound5 = document.getElementById("Selected5");
const soundArray = [sound,sound2,sound3,sound4,sound5];
const soun = document.getElementById("Selecting");
const soun2 = document.getElementById("Selecting2");
const soun3 = document.getElementById("Selecting3");
const soun4 = document.getElementById("Selecting4");
const soun5 = document.getElementById("Selecting5");
const sounArray = [soun,soun2,soun3,soun4,soun5];
let currentIndex = 0;
let currenIndex = 0;
for (var i = 0; i < options.length; i++) {
    options[i].addEventListener('click', function(){
      soundArray[currentIndex].play();  
      currentIndex++;
      if(currentIndex===soundArray.length){
        currentIndex=0;
      }
    });
    options[i].addEventListener('mouseover', function(){
        sounArray[currenIndex].play(); 
      currenIndex++;
      if(currenIndex===sounArray.length){
        currenIndex=0;
      }
    });
}