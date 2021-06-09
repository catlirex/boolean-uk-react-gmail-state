import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'
import { useState } from 'react'


function App() {
  // Use initialEmails for state
  
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentSection, setSection] = useState("inbox")

  const unreadCount = emails.filter(email => !email.read).length
  const starCount = emails.filter(email => email.starred).length
  const emailToRender = currentSection ==="inbox"? hideRead? emails.filter(email=> !email.read) : emails: hideRead? emails.filter(email=> email.starred && !email.read) : emails.filter(email=>email.starred)

  function updateRead(email){
    let newEmailsList = emails.map(function(target){
      if(target.id === email.id) return {...email, read: !email.read}
      return target
    })
    setEmails(newEmailsList)
  }

  function updateStarred(email){
   let newEmailsList = emails.map(function(target){
     if(target.id === email.id) return {...email, starred: !email.starred}
     return target
   })
   setEmails(newEmailsList)
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={"item "+ (currentSection === "inbox"? 'active' : '')}
            onClick={() => {
              setSection("inbox")
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadCount}</span>
          </li>
          <li
            className={"item "+ (currentSection === "starred"? 'active' : '')}
            onClick={() => { setSection("starred")}}
          >
            <span className="label">Starred</span>
            <span className="count">{starCount}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={(event)=>setHideRead(event.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{
      <ul>
      
       {emailToRender.map(email => (
        <li key={email.id} className={"email " + (email.read? 'read' : 'unread')}>
        <input id="read" type="checkbox" onChange={()=>updateRead(email)} checked={email.read}/>
        <input className="star-checkbox" id="star" type="checkbox" onChange={()=>updateStarred(email)} checked={email.starred}/>
        
        <span>{email.sender}</span>
        <span className="title">{email.title}</span>
      </li>
      ))} 
    </ul>
      }</main>
    </div>
  )
}

export default App
