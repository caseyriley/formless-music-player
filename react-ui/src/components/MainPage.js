import React, {useState} from 'react';
import psychoTantricJuju from '../media/TrillianGreen-PsychoTantricJujuJazz-01-BhenPaUlRaga.wav'
import playButton from '../images/playButton.svg'

const MainPage = () => {

  const [timeState, setTimeState] = useState("0:00");

  // function play(){
  //   const audio = document.getElementById("audio");
  //   audio.audioTracks[0].enabled = true;
  // }

  return (
    <>
      <div id={"main-page"}>
        <h1 id={"main-page__title"} >Formless Audio Player</h1>
        <div id={"audio"} >
          <audio
            id={"audio"}
            controls
            src={psychoTantricJuju}
            autoPlay
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
              <div id={"audio__play-circle"}>
                <div id={"audio__play-circle__inner"}>
                  <img className={"play"} src={playButton} alt={""} ></img>
                </div>
              </div>
              <div id={"audio__volume"}></div>
              <div className={"stop"} ></div>
            </div>
          </div>
          <div id={"audio__bottom"} > 
            <div class="timer">
              {/* <div></div> */}
              <span id={"audio__bottom__time__start"} >{timeState}</span>
            </div>
            {/* <span id={"audio__bottom__time__end"} >{timeState}</span> */}
            <div id={"audio__bottom__playhead"} >
              <div id={"audio__bottom__playhead__left"} ></div>
            </div>

          </div>
          
        </div>
      </div>
    </>
  )
}
export default MainPage;