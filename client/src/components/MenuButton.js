

import { AiOutlineMenu } from "react-icons/ai";
import $ from 'jquery';


function MenuButton(){


    const menuClick=()=>{
        $("#mobilemenu").slideToggle();
    }
    const renderButton =()=>{

        return (
            <button id="menubutton" onClick={menuClick}><AiOutlineMenu
            style={{ color: "#7f5f87" }}
            key={'AiOutlineMenu'}
        /></button>
        )

    }

        return (
            <div>
                {renderButton()}
            </div>
        );


}


export default MenuButton;