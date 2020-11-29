import React, {useEffect, useState} from 'react';

import { API_URL } from '../config';

import UploadingTrack from './UploadingTrack';
import pen from '../images/pen.png';
import deleteX from '../images/deleteX.png';


const Tracklist = (props) => {

  const [trackEditState, setTrackEditState] = useState(false);

  function toggleTrackEditState(){
    const newState = !trackEditState;
    setTrackEditState(newState);
  }

  //---------Get-Current_User--------------
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {

    const getCurrentUser = async () => {
      const token = window.localStorage.getItem('auth_token')
      const response = await fetch(`${API_URL}/users/token`, {
        method: "GET",
        mode: "cors",
        headers: { "Authorization": `Bearer ${token}` },
      })
      if (!response.ok) {
        console.log("getCurrent user response failed in Uploading.js");
      } else {
        const json = await response.json();
        setCurrentUser(json);
        console.log(json)
      }
    }
    getCurrentUser();
    console.log("user=======>", currentUser.id)
  }, [])
// ----------------------------------------------

// ---------------------Get-Users-Tracks----------
  const [trackArrayState, setTrackArrayState] = useState([])
  const [refreshTrackState, setRefreshTrackState] = useState(1)
  const [organiseByState, setOrganiseByState] = useState("id")

  useEffect(() => {
    const token = window.localStorage.getItem('auth_token');

    if (organiseByState === "id") {

    const getUserTracks = async () => {
      const response = await fetch(`${API_URL}/tracks/user/${currentUser.id}`, {
        method: "GET",
        mode: "cors",
        headers: { "Authorizaion": `Bearer ${token}` }
      })
      if (!response.ok) { console.log("error in getUserTracks") }
      else {
        const json = await response.json();
        setTrackArrayState(json.reverse());
      }
    }
    getUserTracks();

    } else if (organiseByState === "trackartist") {

      const getUserTracks = async () => {
        const response = await fetch(`${API_URL}/tracks/user/trackartist/${currentUser.id}`, {
          method: "GET",
          mode: "cors",
          headers: { "Authorizaion": `Bearer ${token}` }
        })
        if (!response.ok) { console.log("error in getUserTracks") }
        else {
          const json = await response.json();
          setTrackArrayState(json);
        }
      }
      getUserTracks();

    } else if (organiseByState === "trackrating") {

      const getUserTracks = async () => {
        const response = await fetch(`${API_URL}/tracks/user/trackrating/${currentUser.id}`, {
          method: "GET",
          mode: "cors",
          headers: { "Authorizaion": `Bearer ${token}` }
        })
        if (!response.ok) { console.log("error in getUserTracks") }
        else {
          const json = await response.json();
          setTrackArrayState(json);
        }
      }
      getUserTracks();

    } else if (organiseByState === "trackname") {

      const getUserTracks = async () => {
        const response = await fetch(`${API_URL}/tracks/user/trackname/${currentUser.id}`, {
          method: "GET",
          mode: "cors",
          headers: { "Authorizaion": `Bearer ${token}` }
        })
        if (!response.ok) { console.log("error in getUserTracks") }
        else {
          const json = await response.json();
          setTrackArrayState(json);
        }
      }
      getUserTracks();

    } else if (organiseByState === "trackgenre") {

      const getUserTracks = async () => {
        const response = await fetch(`${API_URL}/tracks/user/trackgenre/${currentUser.id}`, {
          method: "GET",
          mode: "cors",
          headers: { "Authorizaion": `Bearer ${token}` }
        })
        if (!response.ok) { console.log("error in getUserTracks") }
        else {
          const json = await response.json();
          setTrackArrayState(json);
        }
      }
      getUserTracks();

    }
    
  }, [currentUser, refreshTrackState, organiseByState])
// -----------------------------------------------------
// ---------------Update-Track-Rating--------------------
function updateTrackRating(e) {
  // console.log("Before newName--------->", e.target.firstChild)
  const inputRating = e.target.firstChild.value;
  const trackId = e.target.name
  // console.log("key****************************>",key)
  const newRating = async () => {
    const trackData = { id: trackId, rating: inputRating}
    // console.log("trackData======>",trackData)
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackData),
    }
    fetch(`${API_URL}/tracks/track_rating`, options)
    setRefreshTrackState(refreshTrackState + 1)
    setTrackEditState(false)
  }
  newRating();

}
// -----------------------------------------------------
// ---------------Update-Track-Name--------------------
function updateTrackName(e) {
  const inputName = e.target.firstChild.value;
  const trackId = e.target.name
  const newTrackName = async () => {
    const trackData = { id: trackId, rating: inputName}
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackData),
    }
    fetch(`${API_URL}/tracks/track_name`, options)
    setRefreshTrackState(refreshTrackState + 1)
    setTrackEditState(false)
  }
  newTrackName();
}
// -----------------------------------------------------
// ---------------Update-Artist-Name--------------------

  function updateTrackArtistName(e) {

    const newName = e.target.firstChild.value;
    const key = e.target.name
    const newTrack = async () => {
      const trackData = { id: key, name: newName}
      console.log("trackData======>",trackData)
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackData),
      }
      fetch(`${API_URL}/tracks/artist_name`, options)
      setRefreshTrackState(refreshTrackState + 1)
      setTrackEditState(false)
    }
    newTrack();
  }
// ------------------------------------------------------
// ---------------Update-Track-Genre--------------------

function updateTrackGenre(e) {

  const newName = e.target.firstChild.value;
  const key = e.target.name
  const newTrack = async () => {
    const trackData = { id: key, genre: newName}
    console.log("trackData======>",trackData)
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackData),
    }
    fetch(`${API_URL}/tracks/genre`, options)
    setRefreshTrackState(refreshTrackState + 1)
    setTrackEditState(false)
  }
  newTrack();
}
// ------------------------------------------------------
// ---------------Delete-Track-------------------------
  function deleteTrack(trackId){
    const trackData = {id: trackId}
    const options = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(trackData)
    }
    fetch(`${API_URL}/tracks/delete`, options)
    setRefreshTrackState(refreshTrackState + 1)
    setTrackEditState(false)
  }
// ----------------------------------------------------
  
  return(
    <>

    <div id={"playlist-border"}>
    {/* <img id={"playlist-border__texture"} src={texture} alt=""/> */}
      <div id={"playlist-c"} >
        <div id={"playlist-c__top-c"}>
          <div id={"playlist-c__top-c__rating"}><h2 onClick={()=>{setOrganiseByState("trackrating")}}>Rating</h2></div>
          <div id={"playlist-c__top-c__name"}  >
            <UploadingTrack/>
            <div id={"playlist-name-c"} >
              <h2 onClick={()=>{setOrganiseByState("trackname")}}>Name</h2>
            </div> 
            <img className={`tracklist-edit-pen ${trackEditState ? "pen--on":""}`} src={pen} alt={""} onClick={toggleTrackEditState} />
          </div>
          <div id={"playlist-c__top-c__artist-name"}><h2 onClick={()=>{setOrganiseByState("trackartist")}}>Artist</h2></div>
          <div id={"playlist-c__top-c__artist-duration"}><h2 onClick={()=>{setOrganiseByState("tracktime")}}>Time</h2></div>
          <div id={"playlist-c__top-c__genre-name"}><h2 onClick={()=>{setOrganiseByState("trackgenre")}}>Genre</h2></div>
        </div>
        <ul id={"track-ul"}>
        {trackArrayState ? trackArrayState.map((audio, index) => {
            return (
              <li className={"track-ul__li"} key={index}>
                <div className={`track-ul__li__rating ${index % 2 === 1 ? "dark": "light"}`}>
                {trackEditState ? 
                  <form name={audio.id} onSubmit={e=> {e.preventDefault(); updateTrackRating(e)}}> 
                    <input 
                      type={"text"}
                      className={"track-genre-input"} 
                      maxLength={100} 
                      placeholder={audio.trackrating ? audio.trackrating : "🎵"} 
                    />
                    <input className={"track-artist-name-submit"} type={"submit"} />
                  </form>  :
                  <span className={"track-artist-rating-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.tracklocation)}} >{audio.trackrating ? audio.trackrating : "🎵"} </span>
                }
                </div>
                <div className={`track-ul__li__name ${index % 2 === 1 ? "dark": "light"}`} >
                  {trackEditState ? 
                  <>
                    <form className={"tracklist-form"} name={audio.id} onSubmit={e=> {e.preventDefault(); updateTrackName(e)}}> 
                      <input 
                        type={"text"}
                        className={"track-artist-name-input"} 
                        maxLength={100} 
                        placeholder={audio.trackname ? audio.trackname : "🎵"} 
                      />
                      <input className={"track-artist-name-submit"} type={"submit"}  />
                    </form>
                    <img name={audio.id} className={"deleteX"} src={deleteX} alt={""} onClick={e=>{deleteTrack(e.target.name)}}/>
                  </> :
                  <span className={"track-artist-name-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.tracklocation)}} >{audio.trackname ? audio.trackname : "🎵"} </span>
                  }
                  </div>
                <div className={`track-ul__li__artist ${index % 2 === 1 ? "dark": "light"}`} >
                {trackEditState ? 
                  <form name={audio.id} onSubmit={e=> {e.preventDefault(); updateTrackArtistName(e)}}> 
                    <input 
                      type={"text"}
                      className={"track-artist-name-input"} 
                      maxLength={100} 
                      placeholder={audio.trackartist ? audio.trackartist : ""} 
                      // value={`${audio.trackartist ? audio.trackartist : ""}`}
                    />
                    <input className={"track-artist-name-submit"} type={"submit"} />
                  </form> :
                  <span className={"track-artist-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.tracklocation)}} >{audio.trackartist ? audio.trackartist : ""} </span>
                }
                </div>
                <div className={`track-ul__li__duration ${index % 2 === 1 ? "dark": "light"}`}><span>{audio.tracktime ? audio.tracktime : "🎵"}</span></div>
                <div className={`track-ul__li__genre ${index % 2 === 1 ? "dark": "light"}`}>
                {trackEditState ? 
                  <form name={audio.id} onSubmit={e=> {e.preventDefault(); updateTrackGenre(e)}}> 
                    <input 
                      type={"text"}
                      className={"track-artist-name-input"} 
                      maxLength={100} 
                      placeholder={audio.trackgenre ? audio.trackgenre: ""} 
                    />
                    <input className={"track-artist-name-submit"} type={"submit"} />
                  </form> :
                  <span className={"track-genre-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.tracklocation)}} >{audio.trackgenre ? audio.trackgenre: ""} </span>
                }
                  </div>
            </li>)
          }): null}
        </ul>
      </div>
    </div>
    
    {/* <ul id="playlist">
      <li className="track" onClick={()=>{props.setTrack(CanWeHaveFun)}}><span>Can We Have Fun</span></li>
      <li className="track" onClick={()=>{props.setTrack(Natures_Joint)}}><span>Natures Joint</span></li>
      <li className="track" onClick={()=>{props.setTrack(Tears)}}><span>Tears</span></li>
      <li className="track" onClick={()=>{props.setTrack(psychoTantricJuju)}}><span>Psycho Tantric Juju Jazz</span></li>
      <li className="track" onClick={()=>{props.setTrack(Ritual)}}><span>Ritual</span></li>
      <li className="track" onClick={()=>{props.setTrack(Hyperreal)}}><span>Hyperreal</span></li>
      <li className="track" onClick={()=>{props.setTrack(Afterimage)}}><span>Afterimage</span></li>
    </ul> */}
    </>
  )
}
export default Tracklist;