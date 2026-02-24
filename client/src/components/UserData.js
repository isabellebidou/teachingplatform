import React, { useEffect, useState } from 'react';
import fieldsArray from "./userData/formFields";
import store from "./store";
import { Link } from "react-router-dom";

function UserData() {
  useEffect(() => {
    if (store.getState()) {
    }

    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const userData = await fetch(`/api/user_data/`);
    const items = await userData.json();
    setItems(items);

  };

  return (
    <section>
      <fieldset>
        <legend><h2> Information </h2></legend>
        
          {items.length > 0 &&
            <Link to="/userdata/edit" className="">
              <button className="actionupload">edit data</button>
            </Link>
          }

        {items.length > 0 &&
          items.map(data => (

            <div className="col" key={'col777'}>
              <dl className="userdatadl" key={'userdatadl'+1}>

                <dt key={'dt'+1} htmlFor="fname">{(fieldsArray.find(f => f.name === 'fname')).label}</dt>
                <dd
                  name="fname"
                  key={"dd"+111}>
                  {data.fname ? data.fname : ""}

                </dd>
                <dt key={1} htmlFor="lname">{(fieldsArray.find(f => f.name === 'lname')).label}</dt>
                <dd
                  name="lname"
                  key={111}>
                  {data.lname ? data.lname : ""}

                </dd>
                
                <dd
                  name="comments"
                  key={124} >{data.comments ? data.comments : ""}

                </dd>

              </dl>

            </div>

          ))
        }
        {items.length === 0 &&

        <div>
          <Link key={66}
            to={'/userdata/new'}
            className="actionupload button"
          >
            data needed
          </Link>
          <p className='itemp'>lorem ipsum </p>
          
          </div>

        }
      </fieldset>
    </section>
  );
}

export default UserData