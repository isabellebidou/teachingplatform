import React, { useEffect, useState } from 'react';
import store from "./store";
import fieldsArray from "./userData/formFields";

function SelectedUserData() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    if (store.getState().selectedUser) {
      const userId = store.getState().selectedUser;
      const userData = await fetch(`/api/user_data/${userId}`);
      const items = await userData.json();
      setItems(items);
    }
  };

  return (
    <section>
      {
        items.map(data => (
          <form key={888}>
            <div className="col" key={'777'}>
              <div className="" key={1}>

                <label key={3333} htmlFor="fname">{(fieldsArray.find(f => f.name === 'fname')).label}</label>
                <input
                  name="fname"
                  key={1111}
                  type="text"
                  defaultValue={data.fname ? data.fname : ""}
                  onChange={(e) => {
                    this.updateStateValue(e.target.name, e.target.value);
                  }}
                />

                <label key={4433} htmlFor="lname">{(fieldsArray.find(f => f.name === 'lname')).label}</label>
                <input
                  name="lname"
                  key={111}
                  type="text"
                  defaultValue={data.lname ? data.lname : ""}
                  onChange={(e) => {
                    this.updateStateValue(e.target.name, e.target.value);
                  }}
                />
 
                <label key={14} htmlFor="comments">{(fieldsArray.find(f => f.name === 'comments')).label}</label>
                <input
                  name="comments"
                  key={124}
                  type="text"
                  defaultValue={data.comments ? data.comments : ""}
                  onChange={(e) => {
                    this.updateStateValue(e.target.name, e.target.value);
                  }}
                />

                <p key={63} >
                  <button className="rightbutton"
                    onClick={() => {
                      this.handleClick();
                    }}
                    type="submit"
                  >
                    edit
                  </button>
                </p>
              </div>
            </div>
          </form>
        ))
      }
    </section>
  );
}

export default SelectedUserData