//TODO: User auth
//TODO: Reformat data display + add functionality
//TODO: Styling read state
//TODO: Grouping items
//TODO: Reminders + scheduling
//TODO: Types?

import React, {useState, useEffect}  from 'react'
import firebase from './firebase.js'
import List from './components/list.js'
import LinkForm from './components/form.js'
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
 
  useEffect(() => {  
    const linksRef = firebase.database().ref('links')
    let linkDb = [];
    linksRef.on('value', (snapshot) => {
      let db = snapshot.val()
      linkDb = [];
      for(let link in db){
        linkDb.push({
          id:link,
          url:db[link].url,
          description:db[link].description,
          timestamp:db[link].timestamp,
          read:db[link].read
        })
      }
      setList(linkDb)        
    })    
  },[])


  const addLink = link => {
    link.id = list.length + 1
    link.timestamp = new Date().toLocaleString()
    setList([...list, link])
    const linksRef = firebase.database().ref('links')
    linksRef.push(link)    
  }
  const deleteLink = id => {
    let newList = list.filter(link => link.id !== id )
    setList(newList)
    const linksRef = firebase.database().ref(`/links/${id}`)
    linksRef.remove()
  }

  const updateLink = updatedLink => {
    setList(list.map(link => (link.id === updatedLink.id ? updatedLink : link)))    
    const linksRef = firebase.database().ref(`/links/${updatedLink.id}`)
    linksRef.update({read: updatedLink.read})
  }
  

  return (
    <div className="App">

      <header className="App-header">
      </header>

      <p>Hello World!</p>

      <div className="container">
        <div className="column">
          <p>All Links</p>
          <List data={list} update={updateLink} delete={deleteLink}/>
        </div>
        <div className="column">
          <p>New Link</p>
          <LinkForm add={addLink}/>
        </div>
      </div>

    </div>
  );
}

export default App;
