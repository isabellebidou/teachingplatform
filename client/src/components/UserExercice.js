
import { fetchGrammarTopics } from "../actions";
import SelectTopic from "./SelectTopic";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";





function UserExercice({ grammarTopics = [],fetchGrammarTopics}){
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedTopic, setSelectedTopic] = useState(null);

    useEffect(() => {
        fetchGrammarTopics();
      }, [fetchGrammarTopics]);
    
      useEffect(() => {
        if (grammarTopics.length > 0) {
          setSelectedTopic(grammarTopics[0]);
        }
      }, [grammarTopics]);
    
      const triggerRefresh = () => {
        setRefreshKey(prev => prev + 1);
      };
    
    return (

        <div className="page" >
                    <SelectTopic
                    topics={grammarTopics}
                    selectedTopic={selectedTopic}
                    onChange={setSelectedTopic}
                  />
                  <button>Generate Exercice</button>
                  <button>Start</button>




        </div>
    );

}
function mapStateToProps(state) {
    console.log("mapStateToProps topics:", state.grammarTopics);
  
  return { grammarTopics: state.grammarTopics };
}
export default connect(mapStateToProps, { fetchGrammarTopics })(UserExercice);