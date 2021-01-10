const button = document.querySelector("button");
const login = document.getElementById("login");
const loginMessage = document.getElementById("login-message");
const registration = document.getElementById("registration");
const registerText = document.getElementById("register-text");
const registrationText = document.getElementById("registration-text");
const registrationMessage = document.getElementById("registration-message");
const loginButton = document.getElementById("login-button");
const allAudio = document.querySelectorAll("audio");
const options = document.getElementsByClassName("option");
const gamemasterMenu = document.getElementById("gamemaster-menu");
const start = document.getElementById("start");
const musicButton = document.getElementById("music");
const createCharacter = document.getElementById("new-player-button");
let mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

/* Test if Player and Gamemaster Exist */
if(player)
player = JSON.parse(player.replace("[","").replace("]",""));
if(gamestate)
gamestate = JSON.parse(gamestate);

const playSound = function(){

}

const playerMenuState = function(){
  $(".svg-container").css("right", "-1%");
  $(".svg-container").css("top", "15%");
  $("#gun-container").css("transform", "perspective(400px) rotatex(10deg) rotatey(-10deg)")
  $("#circle-container").css("transform", "perspective(400px) rotatex(10deg) rotatey(-10deg) translate(-3vw,-3.35vh)")
  $("#smallcircle-container").css("transform", "perspective(400px) rotatex(10deg) rotatey(-10deg) translate(-1.65vw,-1.75vh)")
  if(!mobile)
  $(".player-menu").css("transform", "translateY(0%)");
  else
  $(".player-menu").css("transform", "translateY(-50%)");
}

const loginState = function(){
  $(".svg-container").css("right", "");
  $(".svg-container").css("top", "");
  $("#gun-container").css("transform", "")
  $("#circle-container").css("transform", "translate(-3vw,-3.35vh)")
  $("#smallcircle-container").css("transform", "translate(-1.65vw,-1.75vh)")
  $(".player-menu").css("transform", "translateY(1000%)");
}

const logoutFunction = function(){
  $.ajax({
    method: "POST",
    url: "/logout",
    success: function(res){
      $(".bottomright-text").css("transform", "translateX(1000%)");
      $(".menu").css("transform", "translate(0%,1000%)");
      $("#start").css("transform", "translate(0%)");
      $("#register-text").css("transform", "translate(0%)");
      $("#register-text").html("Logged Out");
      $("#nav-buttons").css("transform", "translateX(-88%)");
      $("#topright-text").html("Login Screen");
      $("#continue").unbind("click");
      loginState();
    }
  })
}

$("audio").prop("volume", 0.2);

let musicOn = true;
const gun = document.getElementById("Gunshot");
let audio = document.getElementById("login-music");
const logout = document.getElementById("logout");

$("#player-create").submit(function(event){
  event.preventDefault();
  const formData = $(this).serialize();
  $.ajax({
    method: "POST",
    url: "/players",
    data: formData,
    success: function(res){
      $("#player-create").css("transform", "translateY(1000%)");
      $("#gamemaster-menu").css("transform", "translateX(0%)");
    }
  })
})

$(".player-choice").click(function(e){
  $.ajax({
    method: "GET",
    url: "/players",
    data: {player: e.target.id},
    success: function(res){
      playerLogin(res);
    }
  })
})

const playerLogin = function(res){
  ($(".menu").css("transform", "translate(0%,1500%)"));
      loginMessage.style.transform = "translateX(0%)";
      if(!mobile){
      $("#nav-buttons").css("transform","translateX(0%)");
      $("#login-message").html(res.ultimateName);
      }
      else{
      $("#nav-buttons").css("transform","translateX(-66%)");
      $("#login-message").html(res.ultimateName.substrring(20));
      }
      $("#topright-text").html(res.characterName);
      player = res;
      $(".svg-container").addClass("svg-container-2");
      playerMenuState();
      $("#continue").on("click", ()=>{
        window.open(`/story/${gamestate.currentChapter}/${gamestate.currentDay}/${gamestate.currentTime}/${player._id}`,'_self',false);
      })
}

/* createCharacter.addEventListener("click", ()=>{
  $("#player-create").css("transform", "translateY(0%)");
  $("#gamemaster-menu").css("transform", "translateX(-1000%)");
}) */

$("#return-login").on("click", ()=>{
  logoutFunction();
})

logout.addEventListener("click", ()=>{
  logoutFunction();
})

const error = function(){
  $("#right").css("background-color", "red");
  setTimeout(()=>{
    $("#right").css("background-color", "white");  
  }, 500)
}

if(player){
  $("#continue").on("click", ()=>{
    window.open(`/story/${gamestate.currentChapter}/${gamestate.currentDay}/${gamestate.currentTime}/${player._id}`,'_self',false);
  })
  start.style.transform = "translateX(-1000%)";
  //playerMenu.style.transform = "translateY(0%)";
  loginMessage.style.transform = "translateX(0%)";
  if(!mobile){
  $("#nav-buttons").css("transform","translateX(0%)");
  $("#login-message").html(player.ultimateName);
  }
  else{
  $("#nav-buttons").css("transform","translateX(-66%)");
  $("#login-message").html(player.ultimateName.substring(20))
  }
  $("#topright-text").html(player.characterName);
  playerMenuState();
  //Add a button to return to gamemaster screen if gamemaster
}
else if(user){
      start.style.transform = "translateX(-1000%)";
      gamemasterMenu.style.transform = "translateY(0%)";
      loginMessage.style.transform = "translateX(0%)";
      $("#nav-buttons").css("transform","translateX(-66%)");
      $("#login-message").html("Gamemaster Screen");
      $("#topright-text").html(username.replace(/['"]+/g, ''));
}


$("#registration").submit(function(event){
  event.preventDefault();
  const formData = $(this).serialize();
  $.ajax({
    method: "POST",
    url: "/register",
    data: formData,
    success: function(res){
      $("#registration-message").html(res);
      registrationText.style.transform = "translateX(-1000%)"
      registrationMessage.style.transform = "translateX(0%)";
      if(res==="Registration Successful!"){
        login.style.transform = "translateX(0%)";
        registration.style.transform = "translateY(1000%)";
      }
      else{
        error();
      }
    }
  }) 
})

$("#login").submit(function(event){
  event.preventDefault();
  const formData = $(this).serialize();
  $.ajax({
    method: "POST",
    url: "/login",
    data: formData,
    success: function(res){
      $("#login-message").html(res.displayText);
      $("#nav-buttons").css("transform","translateX(-66%)");
      registerText.style.transform = "translateX(-1000%)"
      loginMessage.style.transform = "translateX(0%)";
      if(res.displayText!=="That username doesn't exist!"&&res.displayText!=="Password Invalid"){
        login.style.transform = "translateX(-1000%)";
        if(res.type==="Gamemaster"||res.type==="Observer")
        gamemasterMenu.style.transform = "translateX(0%)";
        else{
          console.log(res);
          playerLogin(res.player);
        }
      }
      else{
        error();
      }
    }
  }) 
})

registerText.addEventListener("click", ()=>{
    registerText.style.transform = "translateX(-500%)"
    registrationText.style.transform = "translateX(0%)"
    login.style.transform = "translateX(-1000%)";
    registration.style.transform = "translateY(0%)";
})

window.addEventListener("load", function() {
  document.body.classList.remove("preload");
});

musicButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    musicOn = true;
    
  } else {
    musicOn = false;
    audio.pause();
  }
});

$("#start").on("click", ()=>{
  $("#start").css("transform", "translateX(-1000%)");
  $("#login").css("transform", "translateY(0%)");
  $("#register-text").css("transform", "translateX(0%)")
  $("")
    gun.play();
    if(musicOn)
    audio.play();
});

/* Stop Animation When Resizing */
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});

/* Sound Stuff */
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