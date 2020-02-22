//TODO: User auth
//TODO: Reformat data display + add functionality
//TODO: Styling read state
//TODO: Grouping items
//TODO: Reminders + scheduling
//TODO: Types?

import React, {useState, useEffect}  from 'react'
import firebase, { auth, provider } from './firebase.js'
import List from './components/list.js'
import LinkForm from './components/form.js'
import User from './components/user.js'
import "./App.scss"

/*const links = [
  {   
    url: "google.com",
    description: "Google",
    timestamp: new Date().toLocaleString(),
    read: false
  }
]*/
const links = [];

const App = () => {
  const [list,setList] = useState(links)
  const [user,setUser] = useState(null)
  
  useEffect(() => {  
    auth.onAuthStateChanged((user) => {
      if(user){
        setUser(user)
      }  
    })  
  })   

  useEffect(() => {    
    //updateList(user)
    if(user) {
      const linksRef = firebase.database().ref(`links/${user.uid}`)
      let linkDb = [];
      linksRef.on('value', snapshot => {
        let db = snapshot.val()
        linkDb = [];
        for(let link in db){
          linkDb.push({
            id:link,
            url:db[link].url,
            description:db[link].description,
            timestamp:db[link].timestamp,
            read:db[link].read,
            uid:db[link].uid
          })
        }
        setList(linkDb)   
        console.log(linkDb)     
      }) 
    }
    else{
      setList(links)
    }
  },[user])


  const addLink = link => {
    link.id = list.length + 1
    link.timestamp = new Date().toLocaleString()
    setList([...list, link])
    const linksRef = firebase.database().ref(`links/${user.uid}`)
    linksRef.push(link)    
  }
  const deleteLink = id => {
    let newList = list.filter(link => link.id !== id )
    setList(newList)
    const linksRef = firebase.database().ref(`/links/${user.uid}/${id}`)
    linksRef.remove()
  }

  const updateLink = updatedLink => {
    setList(list.map(link => (link.id === updatedLink.id ? updatedLink : link)))    
    const linksRef = firebase.database().ref(`/links/${user.uid}/${updatedLink.id}`)
    linksRef.update({read: updatedLink.read})
  }
  
  const logout = () => {
    //console.log(user)
    auth.signOut()
      .then(() => {
        setUser(null)
      })
  }
  const login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        setUser(user)
        //console.log(user)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <User login={login} logout={logout} user={user} />
      </header>
      <h1>ReadL8r</h1>
      <div className="container">
        <div className="column">
          <p>All Links</p>
          <List data={list} update={updateLink} delete={deleteLink} user={user}/>
        </div>
        <div className="column">
          <p>New Link</p>
          <LinkForm add={addLink} user={user}/>
        </div>
      </div>

    </div>
  );
}

export default App;
