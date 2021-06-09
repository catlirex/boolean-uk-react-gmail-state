import Header from './components/Header'
import initialEmails from './data/emails'
import './App.css'
import { useState } from 'react'


function App() {
  // Use initialEmails for state
  
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentSection, setSection] = useState("inbox")
  const [searchValue, setSearchValue] = useState("")

  const unreadCount = emails.filter(email => !email.read).length
  const starCount = emails.filter(email => email.starred).length

  let emailToRender = [...emails].reverse()
  console.log("emailToRender", emailToRender);
  console.log("emails", emails);
  if(currentSection === "starred") emailToRender = emailToRender.filter(email=>email.starred)
  if(hideRead)emailToRender = emailToRender.filter(email=> !email.read)
  if(searchValue !== "") emailToRender = emailToRender.filter(email =>
    ['title', 'sender'].some(key => email[key].toLowerCase().includes(searchValue.toLowerCase())
  ))
  

  // const emailToRender = currentSection === "inbox"? hideRead? emails.filter(email=> !email.read) : emails: hideRead? emails.filter(email=> email.starred && !email.read) : emails.filter(email=>email.starred)

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
      <header className="header">
      <div className="left-menu">
        <svg className="menu-icon" focusable="false" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
        </svg>

        <img
          src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png"
          alt="gmail logo"
        />
      </div>

      <div className="search">
        <input className="search-bar" placeholder="Search mail" onChange={(event)=>setSearchValue(event.target.value)}/>
      </div>
    </header>
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
      }
      
      <section className="email-form-container">
        <div className="avatar"></div>
        <form id="email-form" onSubmit={function(event){
          event.preventDefault()
          let newEmail={
            id: emails[emails.length -1].id +1,
            sender : event.target[0].value,
            title: event.target[1].value,
            starred: false,
            read: false
          }
          setEmails([...emails, newEmail])
        }}>
          <header className="form-header">
            <div>
            <img className="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAABEElEQVR42mNgGLyAnzLtGQx5lGn/x1BAvvZ0hn8M/8k3IA2snWwDYNrJNCAVrp0sA5C1/2doY2AhTXsKinYQ/MZwiKGTwY+BnTztCPiSoZlBCr/2ZDzaIfAXwwIGEVzakwhqh8BXDGGUaIfA5ZghMocE7SC4m4EL1QAmhnkkGnGEgY9SI9aie4N0I7IoNeI7gw4hI2YzxDOUMnQzLGTYznARS0ztwoxQVCNQM5MEQzrDDoafKEY44jeiAGs5GcVwDa7iBLZkhTACV3ZmY6iHu0QTnxH4ygMNhkNgNVXYpSFG4C9QGBmaGP4znMIlDTKCcIk0heEfgwxuI9QIGsDEsIohm7Lqh42hktIKkGPg62AActUwumHce/0AAAAASUVORK5CYII=" alt="reply button"/>
            <div className="email-info-container">
              <label htmlFor="sender">Sender: </label>
              <input id="sender" className="sender-email" type='text' defaultValue='Freepik Company'/>
              <label htmlFor="subject">Subject: </label>
              <input id="subject" className="email-subject" type='text' defaultValue='RE: React is not that easy'/>
            </div>
            </div>
          <img className="icon" src='https://www.gstatic.com/images/icons/material/system/1x/open_in_new_black_18dp.png' alt="expandIcon" />
          </header>
          <textarea name="email-reply" form="email-form" rows="5"></textarea>
          <img className="icon" src="https://www.gstatic.com/images/icons/material/system/1x/more_horiz_black_20dp.png"></img>
        <div className="action-bar">
            <div className="left-bar">
            <button className="button">Send</button>
          <img className="icon button" src="https://www.gstatic.com/images/icons/material/system/1x/arrow_drop_down_white_20dp.png"></img>
          <img className="icon" src="https://www.gstatic.com/images/icons/material/system/1x/text_format_black_20dp.png"></img>
          <img className="icon" src="https://www.gstatic.com/images/icons/material/system/1x/attach_file_black_20dp.png"></img>
          <img className="icon" src="https://www.gstatic.com/images/icons/material/system/1x/insert_link_black_20dp.png"></img>
          <img className="icon" src="https://www.gstatic.com/images/icons/material/system/1x/insert_emoticon_black_20dp.png"></img>
          <img className="icon" src="https://www.gstatic.com/images/icons/material/system/1x/drive_black_20dp.png"></img>
          <img className="icon" src="https://www.gstatic.com/images/icons/material/system/1x/insert_photo_black_20dp.png"></img>
          <img className="icon" src="https://www.gstatic.com/images/icons/material/system/1x/lock_clock_black_20dp.png"></img>
          <img className="icon" src="https://www.gstatic.com/images/icons/material/system/1x/ink_pen_black_20dp.png"></img>
          </div>

          <div className="right-bar">
          <img className="icon" src="https://www.gstatic.com/images/icons/material/system/1x/more_vert_black_20dp.png"></img>
          <img className="icon" src="https://www.gstatic.com/images/icons/material/system/1x/delete_black_20dp.png"></img> 
          </div>

        </div>
        </form>
      </section>

      </main>
    </div>
  )
}

export default App
