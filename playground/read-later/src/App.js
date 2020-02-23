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
  const [editLink,setEditLink] = useState(null)
  const [groups,setGroups] = useState([])
  const [order,setOrder] = useState('timestamp')
  const [keys,setKeys] = useState([])
  const [filter,setFilter] = useState()

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
      let linksRef = ''
      if(order){linksRef = firebase.database().ref('links/' +user.uid).orderByChild(order)}
      else{linksRef = firebase.database().ref('links/' +user.uid).orderByChild(order)}
      let linkDb = []
      let groups = []
      let keys = []
      linksRef.on('value', function(snapshot) {
        linkDb = []
        snapshot.forEach(function(link){
          linkDb.push(link.val())
          groups.push(link.child('group').val())
          for (let key in link.val()){
            //console.log(key)
            keys.push(key)
          }
        })
        groups = [...new Set(groups)]
        keys = [...new Set(keys)]
        setKeys(keys)

        setGroups(groups)
        setList(linkDb) 
        console.log(keys)
      }) 
    }
    else{
      setList(links)
    }
    
  },[user,order])


  const addLink = link => {
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
    updatedLink.timestamp = new Date().toLocaleString()
    setList(list.map(link => (link.id === updatedLink.id ? updatedLink : link)))    
    const linksRef = firebase.database().ref(`/links/${user.uid}/${updatedLink.id}`)
    linksRef.update(updatedLink)
  }
  
  const logout = () => {
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
      })
  }

  const edit = link => {
    setEditLink(link)
  }

  const ordering = event => {
    setOrder(event)
  }

  return (
    <div className="App">
      <header className="App-header">
        <User login={login} logout={logout} user={user} />
      </header>
      <h1>ReadL8r</h1>
      <div className="container">
        <div className="column">          
          <List data={list} update={updateLink} edit={edit} delete={deleteLink} user={user} groups={groups} orders={keys} ordering={ordering} />
        </div>
        <div className="column">
          {editLink ? 
            <LinkForm add={addLink} user={user} link={editLink} update={updateLink} groups={groups}/>
          :
            <LinkForm add={addLink} user={user} groups={groups}/>
          }
        </div>
      </div>

    </div>
  );
}

export default App;
