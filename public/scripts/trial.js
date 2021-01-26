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

$("#dawnSong").prop("volume", 0.2);

$("body").on("click",()=>{
    dawnSong.play();
})