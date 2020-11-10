import React, {useState, useEffect, useRef} from 'react';
import psychoTantricJuju from '../media/TrillianGreen-PsychoTantricJujuJazz-01-BhenPaUlRaga.wav'
import playButton from '../images/playButton.svg'
import pauseButton from '../images/pauseButton.png'
import fastForward from '../images/fastForward.png'




const MainPage = () => {
const media = document.querySelector('audio');
const controls = document.querySelector('.controls');
const play = document.querySelector('.play');
const stop = document.querySelector('.stop');

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.audio__bottom__playhead__left');

const [timeState, setTimeState] = useState(":");



useEffect(()=>{
  setInterval(() => {
    console.log("wooop")
    
    if (media){
      let minutes = Math.floor(media.currentTime / 60);
      let seconds = Math.floor(media.currentTime - minutes * 60);
   
      let minuteValue;
      let secondValue;
    
      if (minutes < 10) {
        minuteValue = '0' + minutes;
      } else {
        minuteValue = minutes;
      }
    
      if (seconds < 10) {
        secondValue = '0' + seconds;
      } else {
        secondValue = seconds;
      }
    
      let mediaTime = minuteValue + ':' + secondValue;
      setTimeState(mediaTime)
      // currentTime = mediaTime;
      // currentTime += 1;
      // timer.textContent = mediaTime;
      let barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
      timerBar.style.width = barLength + 'px';
    }
  }, 500);
}, [timeState])


// ---------------Play/Pause-Button---------------
function playPauseMedia() {
  setTimeState("00:00")
  // updateTime();
  // rwd.classList.remove('active');
  // fwd.classList.remove('active');
  // clearInterval(intervalRwd);
  // clearInterval(intervalFwd);
  if(media.paused) {
    // play.setAttribute('data-icon','u');
    play.src = pauseButton;
    media.play();
  } else {
    // play.setAttribute('data-icon','P');
    play.src = playButton;
    media.pause();
  }
}
// --------------------------------------------------
// ---------------Stop-Button---------------------------
function stopMedia() {
  media.pause();
  media.currentTime = 0;
  // play.setAttribute('data-icon','P');
  play.src = playButton;
  // rwd.classList.remove('active');
  // fwd.classList.remove('active');
  // clearInterval(intervalRwd);
  // clearInterval(intervalFwd);
}
// -----------------------------------------------



  return (
    <>
      <div id={"main-page"}>
        <h1 id={"main-page__title"} >Formless Audio Player</h1>
        <div id={"audio"} >
          <audio
            id={"audio"}
            // controls
            src={psychoTantricJuju}
            // autoPlay
            loop={true}
            >            
            Your browser does not support the
            <code>audio</code> element.
          </audio>
          <div id={"audio__top"} >
            <p id={"audio__top__song-name"}>Song Name</p>
          </div>
          <div  id={"audio__middle"}>
            <div className={"controls"}>
              <img className={"fast-forward"} src={fastForward} alt={""} ></img>
        
              <img className={"play"} src={playButton} alt={""} onClick={playPauseMedia} ></img>
            
              <div id={"audio__volume"}></div>
              <div className={"stop"} onClick={stopMedia} ></div>
              <img className={"rewind"} src={fastForward} alt={""} ></img>
            </div>
          </div>
          <div id={"audio__bottom"} > 
            <div className="timer">
              {/* <div></div> */}
              <span
              //  ref={playTime} 
               id={"audio__bottom__time__start"} >{timeState}</span>
            </div>
            {/* <span id={"audio__bottom__time__end"} >{timeState}</span> */}
            <div id={"audio__bottom__playhead"} >
              <div  className={"audio__bottom__playhead__left"} ></div>
            </div>

          </div>
          
        </div>
      </div>
    </>
  )
}
export default MainPage;