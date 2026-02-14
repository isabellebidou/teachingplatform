import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { fetchUserAudios } from "../../actions";
import axios from "axios";
import AudioPlayer from "../AudioPlayer";







function AudioList({ audios, fetchUserAudios }) {

  useEffect(() => {
    fetchUserAudios();
  }, [fetchUserAudios]);

  const [visibility, setVisibility] = useState("hidden");
  const [editMode, setEditMode] = useState(false);
  const [selectedAudios, setSelectedAudios] = useState([]);
  // Remove duplicates by audio id
  const uniqueAudios = Array.from(new Set(audios.map(a => a.id)))
                           .map(id => audios.find(a => a.id === id));
  
  
  const handleEditButtonToggleText = () => {
    return editMode ? 'Disable edit' : 'Enable edit';
  }
  const toggleEditMode = () => {
    setEditMode(!editMode)
    setVisibility(visibility === 'visible' ? 'hidden' : 'visible');
    fetchUserAudios();
  }
  const deleteAudios = async () => {
    console.log("deleteAudios from AudioList.js " +selectedAudios)

    try {
      await axios.delete("/api/user_audios/delete", {
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

                  {uniqueAudios.map((audio,i) => (
                      <div key={audio._id} className="item photoThumbnail">

                        <AudioPlayer src={audio.url} />

                        <input
                          type="checkbox"
                          value={audio._id}
                          style={{ visibility }}
                          onChange={handleSelected}
                        />
                        <p className="item">
                          audio sent on:{" "}
                          {new Date(audio.createdAt).toLocaleDateString()}
                        </p>
                        <p className="item">
                          audio id:{" "}
                          {audio._id}
                        </p>
                        <p className="item">
                          audio index:{" "}
                          {i}
                        </p>
                      </div>
                    ))}
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
            <button id="editaudios" className="editaudios" onClick={toggleEditMode}>{handleEditButtonToggleText()}</button>
            <button id="deleteaudios" className="deleteaudios" onClick={deleteAudios} style={{ visibility }} >Delete Selected</button>
          </>
        }
      </fieldset>
    </section>
  );
}


    
function mapStateToProps(state) {
  return { audios: state.audios };
}
export default connect(mapStateToProps, { fetchUserAudios })(AudioList);