var global_index=0;
var Boxes_flipped=0;
var array=[];
var t_tiles=0;
var s_count=3;
var move=0;
var t_count=1;
var id;
var outerBox=document.getElementById("outerBox");

var inner_boxes_array=['&#9742','&#9742','&#9749','&#9749','&#9775','&#9775','&#9785',
'&#9785','&#9855','&#9855','&#9889','&#9889','&#9917','&#9917',' &#9940',' &#9940'];
//array containing elements

var popUp=document.getElementById("popUp");
popUp.setAttribute("style","visibility:hidden");

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var timer=document.getElementById("timer");

function startTimer()	//function to add timer
{

var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

}
var star1=document.getElementById("star1");
var star2=document.getElementById("star2");
var star3=document.getElementById("star3");

star1.innerHTML="&#9733";
star2.innerHTML="&#9733";
star3.innerHTML="&#9733";
var moves=document.getElementById("moves");
moves.innerHTML=0;
inner_boxes_array=shuffle(inner_boxes_array);

function shuffle(array) {											// Function to shuffle the array elements
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
for(var i=0;i<inner_boxes_array.length;i++)
{
	addToOuterBox(i);
}


function addToOuterBox(index)
{
	var innerBox=document.createElement("div");
	innerBox.id=index;
	outerBox.appendChild(innerBox);
	innerBox.addEventListener("click",function(event)
		{	if(Boxes_flipped==2)
			{
				Boxes_flipped=0;
			}
			if(t_count==1)
			{
				startTimer();
				t_count++;
			}
			Boxes_flipped++;
			changeInnerBox(innerBox,index,array,Boxes_flipped);
		});
}
function changeInnerBox(innerBox,index,array,Boxes_flipped){
	array[global_index]=inner_boxes_array[index];
	if(Boxes_flipped==1)
	{
	 id=index;
	innerBox.style.pointerEvents = 'none';	//disabling click on div
	global_index++;
	innerBox.style.background="pink";
	innerBox.style.transition="0.5s";
	innerBox.innerHTML=inner_boxes_array[index];

	}
	else if(Boxes_flipped==2)
	{
	innerBox.style.pointerEvents = 'none';	//disabling click on div
	if(array[global_index]==array[global_index-1])	//if both matches then they stay as it is
	{
	t_tiles+=2;	// Keeping track of number of tiles which are flipped.
	move++;			// moves which user has made

	document.getElementById(id).style.background="lime";
	innerBox.style.background="lime";
	innerBox.style.transition="0.5s";
	innerBox.innerHTML=inner_boxes_array[index];

	setTimeout(display,700);
	function display()
	{
		document.getElementById(id).style.background="yellow";
		innerBox.style.background="yellow";
	}
}
	else                  //if they don't match then flip down both
	{
    	move++;
		document.getElementById(id).style.pointerEvents='auto'; /* enabling click on both * the divs */
		innerBox.style.pointerEvents='auto';
		innerBox.style.background="#ADFF2F";
		innerBox.style.transition="0.5s";				//firstly show that div then check
		innerBox.innerHTML=inner_boxes_array[index];

		document.getElementById(id).style.background="#ADFF2F";
		setTimeout(shake,500);
		setTimeout(flipBack,700);
		function flipBack()
		{
    		innerBox.style.background="black";	//flipping down current box
    		innerBox.innerHTML="";
    		innerBox.style.transition="0.5s";

    		var previous_Box=document.getElementById(id);//flipping down previous box;
    		previous_Box.style.background="black";
    		previous_Box.innerHTML="";
    		previous_Box.style.transition="0.5s";
	  }
	}
		if(move>8 && move<14)
		{
			star3.innerHTML="&#9734";
			s_count=2;
		}
		else if(move>17)
		{
			star2.innerHTML="&#9734";
			s_count=1;
		}
    moves.innerHTML=move;
		global_index=0;
		array=[];
		if(t_tiles==16)
	{
		setTimeout(Display_Message,500);	//Display Congratulation message if user completes the game
	}
	}
}

function Display_Message()		// Function to display congratulation message with total moves and the rating...
{
	outerBox.parentNode.removeChild(outerBox);
	var updiv=document.getElementById("UpperDiv");
	updiv.parentNode.removeChild(updiv);
	popUp.setAttribute("style","visibility:visible");
	var img=document.createElement("img");
	img.src="images/check.png";
	img.class="img";
	document.getElementById("img").appendChild(img);
	var total_Moves=document.getElementById("move");
	total_Moves.innerHTML=move;
	document.getElementById("minute").innerHTML=minutesLabel.innerHTML;
	document.getElementById("second").innerHTML=secondsLabel.innerHTML;
	document.getElementById("Stars2").innerHTML=s_count;

	var playAgain=document.createElement('Button');
	playAgain.innerHTML="Play Again";
	document.getElementById("button").appendChild(playAgain);
	playAgain.addEventListener("click",function(event)
		{
			window.location.href="Index.html";
		});
}

function reload()		// reloading the Game again
{
	window.location.href="Index.html";
}

function shake(innerBox)			//Shaking the box using Jquery....
{
	$(document).ready(function() {
		$("#outerBox").effect( "shake", {times:4}, 1000 );
            });
}
