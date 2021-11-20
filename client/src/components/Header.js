import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom"
import "../styles/header.css"
import {Link} from "react-router-dom"
import { isLoggedIn, logout } from "../utils/auth";
import axios from "axios";
import { config } from "../utils/header-config";
const MINUTE_MS = 1000;

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const history = useHistory()
    
    const handleLogoutUser = () => {
        logout()
        setLoggedIn(false)
        history.push("/")
    }

    useEffect(() => {
        const interval = setInterval(() => {
          if(isLoggedIn()){
              getUser()
              clearInterval(interval)
          }
        }, MINUTE_MS);
        return () => clearInterval(interval); 
      }, [history, loggedIn])

      const getUser = async() => {
        if(isLoggedIn){
            const {data} = await axios.get("api/users/me", config)
            if(data){
                setUser(data)
                setLoggedIn(true)
            }
        }
      }

    return (
        <React.Fragment>
            <header>
                <div className="container">
                    <nav>
                        <div className="nav-left">
                            <h1><Link to={"/"}>TASK APP</Link></h1>
                        </div>
                        <div className="nav-right">
                            {loggedIn && (
                                <div className="nav-right">
                                <span>{user?.name}</span>
                                <button className="btn-create-task"><Link to={"/task/new"}>Create Task</Link></button>
                                <p className="logout" onClick={handleLogoutUser}>Logout</p>
                                </div>
                            )}
                            {!loggedIn && (
                                <div className="nav-right">
                                <p><Link to={"/login"}>Login</Link></p>
                                <p><Link to={"/register"}>Register</Link></p>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Header
