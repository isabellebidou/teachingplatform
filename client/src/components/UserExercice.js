
import { fetchGrammarTopics } from "../actions";
import SelectTopic from "./SelectTopic";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import QuestionBundle from "./exercice/QuestionBundle";
import axios from "axios";



function UserExercice({ grammarTopics = [],fetchGrammarTopics}){
  
    const [selectedTopic, setSelectedTopic] = useState(null);

    useEffect(() => {
        fetchGrammarTopics();
      }, [fetchGrammarTopics]);
    
      useEffect(() => {
        if (grammarTopics.length > 0) {
          setSelectedTopic(grammarTopics[0]);
        }
      }, [grammarTopics]);
    
   const handleClick = async (e) => {
    e.preventDefault();


    try {
      const res = await axios.post("/api/exercice", { selectedTopic });
      
    } catch (err) {
      console.error("Error generating exercice:", err);
      
    } finally {
  
    }
  };
    
    return (

        <div className="page" >

                  <SelectTopic
                    topics={grammarTopics}
                    selectedTopic={selectedTopic}
                    onChange={setSelectedTopic}
                  />
                  <button onClick={handleClick}
                  >Generate Exercice</button>
                  {/* once exercice is generated */}
                  <button>Start</button>
                  {/* display quizz once start is pressed */}
              


        </div>
    );

}
function mapStateToProps(state) {
    console.log("mapStateToProps topics:", state.grammarTopics);
  
  return { grammarTopics: state.grammarTopics };
}
export default connect(mapStateToProps, { fetchGrammarTopics })(UserExercice);