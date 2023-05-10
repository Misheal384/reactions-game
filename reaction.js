const clickArea = document.querySelector(".click-area");  //selcting the css properties with queryselector
const displayText = document.querySelector(".display-text");//so the ones in the bracket are the css properties been selcted
const scoreElements = document.querySelectorAll(".score"); //queryselectorall because it has multiple score elements



const scoreHistory=[];//this is an empty array to hold the score history of a user


const MININMUM_MS_TILL_CHANGE = 3000;  //for the maximum and minnium time taken for the user to click on the area
const MAXIMUM_MS_TILL_CHANGE = 10000;

let mSinceEpochOnTimeout = 0;  //meaning for a particular period of time
let waitingForClick = false; //waiting for a click

//writing a function to generate random numbers for changing the color
//math.floor for rounding up numbers and returning the largest number
//math.random for generating random numbers 

function play() {
    const msTillChange = Math.floor(Math.random() * (MAXIMUM_MS_TILL_CHANGE - MININMUM_MS_TILL_CHANGE)) + MININMUM_MS_TILL_CHANGE;
     
    //revert the color back to red,beacause of the null it goes back to the default color set in the css so here DOM was used here
    clickArea.style.backgroundColor = null;


    displayText.textContent = "";  //to remove the text showing in the box

    //it allows us to run some code after a set amount of milli seconds
    setTimeout(() => {
        mSinceEpochOnTimeout = Date.now();//the epochon..is to set the epochon timeout and for the date.now ot os going to give you the milli seconds from the date set

        
        clickArea.style.backgroundColor = "#009578"; //to cahnge the backgorund color
        waitingForClick = true;

    },msTillChange);

    }

    function addScore(score) {
        // to add score the the empty array
        scoreHistory.unshift(score);
      
        for (let i = 0; i < Math.min(scoreHistory.length, 5); i++) {
          const score = scoreHistory[i];
      
          scoreElements[i].textContent = `${score} ms`;
        }
      }
      
    
    

    //adding event listner when the uer clickd on the area
    clickArea.addEventListener("click",()=>{ //when on click 
        if (waitingForClick){  //waiting fo the user to click on the area or else
            const score = Date.now() -  mSinceEpochOnTimeout;
            waitingForClick = false;
            displayText.textContent = `Your time was ${score} ms! Click to play again.`;
        
            addScore(score);
        }
        else{ //if they are not playing we can call on the play function 
            play();

        }
        
    })
  