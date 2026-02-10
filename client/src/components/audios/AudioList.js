import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Audio from "./Audio";
import { fetchUserAudios } from "../../actions";
import axios from "axios";






function AudioList({ audios, fetchUserAudios }) {

  useEffect(() => {
    fetchUserAudios();
  }, [fetchUserAudios, audios]);

  const [visibility, setVisibility] = useState("hidden");
  const [editMode, setEditMode] = useState(false);
  const [selectedAudios, setSelectedAudios] = useState([]);

  
  
  const handleEditButtonToggleText = () => {
    return editMode ? 'Disable edit' : 'Enable edit';
  }
  const toggleEditMode = () => {
    setEditMode(!editMode)
    setVisibility(visibility === 'visible' ? 'hidden' : 'visible');
    fetchUserAudios();
  }
  const deleteAudios = async () => {

    try {
      await axios.delete("/api/user_eye_pics/delete", {
        data: { idsToDelete: selectedAudios }
      })
        .then(function (response) {
          // handle success
          setSelectedAudios([])
          fetchUserAudios();

        }).catch(function (error) {
          // handle error
          error(error)
        })
        .finally(function () {
          // always executed
        });
    } catch (error) {
      error(error)
    }

  }
  const handleSelected = (e) => {
    if (selectedAudios.includes(e.target.value)) {
      //remove item
      // find index
      var myIndex = selectedAudios.indexOf(e.target.value);
      var myArray = [...selectedAudios];
      myArray.splice(myIndex, 1);
      setSelectedAudios(myArray);
    } else {
      // add item
      setSelectedAudios([...selectedAudios, e.target.value]);
    }
  }

return (
    <section>
      <fieldset id="audios">
        <legend><h2>Audios</h2></legend>
 
        <div className="grid-container" >
          {audios.length > 0 &&
            audios.map((audio) => {
  
              return (
                <div  key={audio._id + '_container'} >
                  <div className="item photoThumbnail">

                    <Audio
                      id={audio._id}

                      dateSent={audio.dateSent}

                    />

                    <input type={'checkbox'} value={audio._id} style={{ visibility }} onChange={handleSelected}></input>
                    <p className="item">
                       audio sent on: {new Date(audio.dateSent).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })
          }

        </div>
        {audios.length < 1 &&
          <p className="itemp">
            You may record yourself
          </p>
        }
        {audios.length >= 1 &&
          <>
            <button id="editeyes" className="editeyes" onClick={toggleEditMode}>{handleEditButtonToggleText()}</button>
            <button id="deleteeyes" className="deleteeyes" onClick={deleteAudios} style={{ visibility }} >Delete Selected</button>
          </>
        }
      </fieldset>
    </section>
  );
}


    
function mapStateToProps({ audios }) {
  

  return { audios };
}
export default connect(mapStateToProps, { fetchUserAudios })(AudioList);