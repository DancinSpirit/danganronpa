let song = document.getElementById("morning");
const button = document.querySelector("button");
const allAudio = document.querySelectorAll("audio");

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

let story = $("#hidden-text").text().replace(/(\r\n|\n|\r)/gm, "").substring(4);
let storyArray = story.split(",,");
let text = storyArray;
let index = -1;
for(let x=0; x<allAudio.length; x++){
 allAudio[x].volume = 0.2; 
}
let music = true;
button.addEventListener("click",()=>{
  if(song.paused){
  music=true;
  song.play(); 
  }
  else{
  music=false;
  song.pause();
  }
})
//I learned jquery after this point so there goes consistency! Woo!

const nextLine =  async function(){
  if(song.paused&&music){
    song.play();
  }
  let text= await addText();
$("#bottom").append(text);
$("#textbox").scrollTop($("#textbox").prop("scrollHeight"));
}

$("#textbox").on("click",nextLine)

const addText = function(){
  index++;
  if(!text[index].startsWith("<")){
      return `<p class='boxtext'>${text[index]}</p>`;
  }
  else{
      return specialCommand(text[index]);
  } 
}

const specialCommand = async function(text){
  if(text.startsWith("<OPTION>")){
    let optionText = text.replace("<OPTION>","");
    if(optionText.startsWith("<OPEN>")){
      optionText = optionText.replace("<OPEN>","").split("|");
    }
    if(optionText.startsWith("<CHOSEN>")){
      optionText = optionText.replace("<CHOSEN>","").split("|");
      console.log(optionText);
      returnText= `<p class='boxtext optionquestion'> ${optionText[0]}</p><p class = 'boxtext option'>`;
      for(let x=1; x<optionText.length; x++){
        if(optionText[x].startsWith(">")){
          returnText = returnText + `<choice>${optionText[x]}</choice> `;
        } 
        else{
          returnText = returnText + `|${optionText[x]}| `
        }
      }
      return returnText + "</p>";
    }
  }
  if(text.startsWith("<MUSIC>")){
    song.pause();
    song = document.getElementById(text.replace('<MUSIC>',""));
    if(music)
    song.play();
    nextLine();
    return "";
  }
  if(text.startsWith("<SCENE TRANSITION>")){
    await $("body").css("background-image", `url('/visuals/${text.replace('<SCENE TRANSITION>',"")}')`);
    console.log(text);
    nextLine();
    return "";
  }
}

