const dawnSong = document.getElementById("dawn");
$(".truth-bullet").hover(function(){
 $(this).find(".Bullet1").attr("src","/visuals/Bullet1.png");
 $(this).find(".Bullet3").attr("src","/visuals/Bullet3.png");
 $(this).find(".bullet-text").css("background-image", "url('/visuals/Bullet2.png')")
 $(this).css("transform", "scale(1.1,1.1)")
}, function(){
    $(this).find(".Bullet1").attr("src","/visuals/Bullet1Unselected.png");
    $(this).find(".Bullet3").attr("src","/visuals/Bullet3Unselected.png"); 
    $(this).find(".bullet-text").css("background-image", "url('/visuals/Bullet2Unselected.png')")
    $(this).css("transform", "scale(1,1)")
})

dawnSong.volume = 0.2;

$("body").on("click",()=>{
    dawnSong.play();
})


let song = document.getElementById("morning");
const button = document.querySelector("button");
const allAudio = document.querySelectorAll("audio");
let listenerAdded = false;

$("body").on("keydown", function(e){
  if(e.keyCode == 17){
    nextLine();
  }
})
$("body").on("keypress", function(e){
  if(e.keyCode == 13){
    nextLine();
  }
})

let story = $("#story").text().replace(/(\r\n|\n|\r)/gm, "").substring(6);
let chapter = $("#chapter").text();
let day = $("#day").text();
let time = $("#time").text();
let player = $("#player").text();

let storyArray = story.split(",,");
let text = storyArray;
let index = -1;
for(let x=0; x<allAudio.length; x++){
 allAudio[x].volume = 0.2; 
}

const nextLine =  async function(){
  let returnedText= await addText();
$("#bottom").append(returnedText);

if(!listenerAdded){
  if($("#user-input").length){
    $("#user-input").submit(function(event){
      index--;
      index--;
      listenerAdded = false;
      event.preventDefault();
      let formData = $(this).serialize();
      formData = formData.substring(11);
      if(formData)
      $.ajax({
        method: "POST",
        url: `/story/gamemaster/${chapter}/${day}/${time}/${player}/${formData}`,
        success: function(res){
          text.push(res);
          nextLine();
          $("#user-input").remove();
        }
      })
      else{
        $("#user-input").unbind('submit');
        index=text.length+1;

      }
    })
  listenerAdded = true;
  }
}
$("#textbox").scrollTop($("#textbox").prop("scrollHeight"));
}

$("#textbox").on("click",nextLine)

const addText = function(){
  if(index<=text.length){
  index++;
  }
  if(index==text.length){
    return `<form id="user-input"><input type="text" name="user-input" class="boxtext" action="/story/gamemaster/${chapter}/${day}/${time}/${player}" method="POST"><input type="submit" value="Submit" id="submit"></form>`
  }
  else if(index<text.length){
    if(!text[index].startsWith("<")){
        return `<p class='boxtext'>${text[index]}</p>`;
    }
    else{
        return specialCommand(text[index]);
    }
  } 
}

const specialCommand = async function(text){

}


