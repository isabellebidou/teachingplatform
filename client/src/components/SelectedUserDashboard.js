import React from "react";
import SelectedUserReadingList from './readings/SelectedReadingList';
import SelectedUserUserData from './SelectedUserData';


class SelectedUserDashboard extends React.Component{



   render() {
    return(
        <div className="page">
            <SelectedUserReadingList />
            <SelectedUserUserData />
          
        </div>
    )

   }

}

export default SelectedUserDashboard;


