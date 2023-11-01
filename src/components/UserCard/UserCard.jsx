import React from 'react'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import user_image from "../../assets/user.jpg"
import "./userCard.css"
import { UserInfo } from '../UserInfo/UserInfo'
import {OrderInfo } from '../OrderInfo/OrderInfo'
import { ModalPortal } from '../modal/modal'
import Upload from '../Upload/Upload'
import { useSessionStorage } from '../../hooks/useSessionStorage'

function UserCard({user}) {
    const [showModal, setShowModal] = useState(false);
    const [tab, setTab] = useSessionStorage("tab", 0)
    const tabs = [
        "Profile Settings",
        "Orders Lists"
    ]

    const handleClick = (e)=>{
       e.preventDefault();
       setTab(e.target.id)  
    }
   
    const showModalPortal = (e)=>{
         setShowModal(true)
    }

  return (
        <div className="profile__info">
            {showModal && <ModalPortal setShowModal={setShowModal}><Upload/></ModalPortal>}
            <div className="usercard">
               <div className="user__info"> 
                      <div className="usercard__imgcontainer">
                          <img src={user.image ? user.image : user_image} onClick={showModalPortal} className="usercard__img" alt="" />
                      </div>
                      <div className="usercard__data">
                         <h2 className="usercard__username">{user.username}</h2>
                         <h2 className="usercard__email">{user.email}</h2>
                         <span className="usercard__date">Joined in {format(new Date(user.createdAt), 'dd-MM-yy')}</span>
                      </div>
               </div>
               <ul className="cardtabs">
                     {tabs.map((title, idx)=>(
                        <li onClick={handleClick} key={title} id={idx} className={'cardtabs__title' + `${tab == idx ? ' cardtab__selected' : ''}`}>
                            <span className="cardtabs__text" id={idx}>{title}</span>
                        </li>
                     ))}
               </ul>
            </div>
            <div className="profileinfo__container">
                     {(tabs[tab] === "Profile Settings") && <UserInfo/>}
                     {(tabs[tab] === "Orders Lists") && <OrderInfo id={user._id}/>}
            </div>
        </div>

  )
}

export default UserCard