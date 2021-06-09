import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'
import { useState } from 'react'


function App() {
  // Use initialEmails for state
  
  const [emails, setEmails] = useState(initialEmails)
  const [displayEmail, setDisplay] = useState(emails)
  const [hideRead, setHideRead] = useState(false)
  const [currentSection, setSection] = useState("inbox")
  const [unreadCount, setUnreadCount] = useState(3)
  const [starCount, setStarCount] = useState(2)

  function updateUnreadCount(emailList){
    let unreadEmailList = emailList.filter(target=> target.read === false)
    setUnreadCount(unreadEmailList.length)
  }

  function updateStarCount(emailList){
    let starredEmailList = emailList.filter(target=> target.starred === true)
    setStarCount(starredEmailList.length)
  }

  function displayUnread(event){
    if(event.target.checked === true){
    setHideRead(true)
    setDisplay(displayEmail.filter(email=> email.read===false))
    }
    else{
    setHideRead(false)
      if (currentSection === "starred") filterStarredEmail()
      if (currentSection === "inbox") setDisplay(emails)
    }
  }

  function filterStarredEmail (){
    let starredEmail = emails.filter(email=> email.starred===true)
    setDisplay(starredEmail)
    setSection("starred")
  }

  function updateRead(event, email){
    let updatedEmail = {...email, read: event.target.checked}
    let emailIndex = emails.findIndex((target)=> email.id===target.id)
    let newEmailList = [...emails]
    newEmailList.splice(emailIndex, 1 , updatedEmail)
    setEmails([...newEmailList])

    let displayIndex = displayEmail.findIndex((target)=> email.id===target.id)
    let newDisplayEmailList = [...displayEmail]
    newDisplayEmailList.splice(displayIndex, 1 , updatedEmail)
    setDisplay([...newDisplayEmailList])

    updateUnreadCount(newEmailList)
  }

  function updateStarred(email){
    let updatedStar = !email.starred
    let updatedEmail = {...email, starred: updatedStar}

    let emailIndex = emails.findIndex((target)=> email.id===target.id)
    let newEmailList = [...emails]
    newEmailList.splice(emailIndex, 1 , updatedEmail)
    setEmails([...newEmailList])

    let displayIndex = displayEmail.findIndex((target)=> email.id===target.id)
    let newDisplayEmailList = [...displayEmail]
    newDisplayEmailList.splice(displayIndex, 1 , updatedEmail)
    setDisplay([...newDisplayEmailList])
    updateStarCount(newEmailList)
  }

  

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={"item "+ (currentSection === "inbox"? 'active' : '')}
            onClick={() => {
              setDisplay(emails)
              setSection("inbox")
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadCount}</span>
          </li>
          <li
            className={"item "+ (currentSection === "starred"? 'active' : '')}
            onClick={() => {filterStarredEmail()}}
          >
            <span className="label">Starred</span>
            <span className="count">{starCount}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={(event)=>displayUnread(event)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{
      <ul>
      
       {displayEmail.map(email => (
        <li className={"email " + (email.read? 'read' : 'unread')}>
        <input id="read" type="checkbox" onChange={(event)=>updateRead(event, email)} checked={email.read}/>
        
        <img class="star" 
        src={(email.starred? 'https://www.gstatic.com/images/icons/material/system/1x/star_googyellow500_20dp.png' : 'https://www.gstatic.com/images/icons/material/system/1x/star_border_black_20dp.png')}
        onClick={()=>updateStarred(email)}/>
        
        <span>{email.sender}</span>
        <span class="title">{email.title}</span>
      </li>
      ))} 
    </ul>
      }</main>
    </div>
  )
}

export default App
