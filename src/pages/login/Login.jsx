import { useState } from "react"
import {useDispatch} from 'react-redux'
import {login} from '../../redux/apiCalls'

const Login = ()=>{

    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")

    //using dispatch to get the user information

    const dispatch = useDispatch()
    //making a handleClick to send username and password

    const handleClick = (e)=>{
        e.preventDefault()
        //getting our login function from apiCalls in redux folder
        login(dispatch ,{username , password})
    }


 return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width:100 }}>
        Login
      </button>
    </div>
 )
}


export default Login