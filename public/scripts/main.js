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
let mobile = window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

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
  $(".player-menu").css("transform", "translateY(0%)");
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
  $("#login-message").html(player.ultimateName.substring(21))
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