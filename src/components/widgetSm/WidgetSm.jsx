import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState ,useEffect} from "react";
import {userRequest} from '../../requestMethods.js'

export default function WidgetSm() {

  //making a useState hook to fetch user data

  const [users , setUsers] = useState([])


  //using useEffect to make function in it and fetch data

  useEffect(() => {
     const getUsers = async()=>{
       try{
         //full route of users is http://localhost:5000/api/users/
           const res = await userRequest.get("/users/?new=true")
           //setUsers here to get data in users
           setUsers(res.data)
       }catch(err){
         console.log(err)
       }
     }

     //calling getUser function

     getUsers()
  }, []);
  


  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
      {users.map((user)=>
        <li className="widgetSmListItem" key={user._id}>
          <img
          //we are getting img from the state which we are mapping
            src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
      )}
        
       
      </ul>
    </div>
  );
}
