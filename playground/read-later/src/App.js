//TODO: User auth
//TODO: Reformat data display + add functionality
//TODO: Styling read state
//TODO: Grouping items
//TODO: Reminders + scheduling
//TODO: Types?

import React, { useState, useEffect }  from 'react'
import firebase, { auth, provider } from './firebase.js'
import { Button, Container, Heading, Toast, Flyout, Layer, Modal, Box } from 'gestalt'

import List from './components/list.js'
import LinkForm from './components/form.js'
import User from './components/user.js'
import 'gestalt/dist/gestalt.css';
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
  const [groupList,setGroupList] = useState([])
  const [filter,setFilter] = useState(null)
  const [add,toggleAdd] = useState(false)
  const [loaded,setLoaded] = useState(false)

  const keys = ['timestamp','group','description']

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
      //setLoaded(false)
      let linksRef = ''
      if(filter){linksRef = firebase.database().ref('links/' +user.uid).orderByChild('group').equalTo(filter)}
      else{linksRef = firebase.database().ref('links/' +user.uid).orderByChild('group')}
      let linkDb = []
      let groups = []
      let keys = []
      linksRef.on('value', function(snapshot) {
        linkDb = []
        snapshot.forEach(function(link){
          link.id = link.key
          linkDb.push(link.val())
          //console.log(link.key)
          groups.push(link.child('group').val())
          for (let key in link.val()){
            //console.log(key)
            keys.push(key)
          }
        })
        groups = [...new Set(groups)]
        keys = [...new Set(keys)]
        //setKeys(keys)
        if(!filter){setGroupList(groups)}
        setList(linkDb) 
        setLoaded(true) 
      })
    }
    else{
      setList(links)
    }
    
  },[user,filter])


  const _addLink = link => {    
    setLoaded(false)
    link.timestamp = new Date().toLocaleString()
    setList([...list, link])
    const newKey = firebase.database().ref(`links/${user.uid}`).push().key
    link.id = newKey
    console.log(newKey)
    const linksRef = firebase.database().ref(`links/${user.uid}/${newKey}`)
    linksRef.update(link)    
    toggleAdd(false)    
    setLoaded(true) 
  }
  const _deleteLink = link => {    
    setLoaded(false)
    const linksRef = firebase.database().ref(`/links/${user.uid}/${link.id}`)
    linksRef.remove()
    let newList = list.filter(row => row.id !== link.id )
    setList(newList)    
    setLoaded(true) 
  }

  const _updateLink = updatedLink => {        
    setLoaded(false)
    updatedLink.timestamp = new Date().toLocaleString()
    //setList(list.map(row => (row.id === updatedLink.id ? updatedLink : row)))  
    setList(list.map(row => (row.id.match(updatedLink.id) ? updatedLink : row)))   
    //console.log([list,updatedLink])    
    const linksRef = firebase.database().ref(`/links/${user.uid}`).child(updatedLink.id)
    let key = linksRef.key
    //console.log(linksRef.key)
    linksRef.update(updatedLink)
    toggleAdd(false)    
    setLoaded(true) 
  }

  const _newForm = () => {
      toggleAdd(add => !add)    
      console.log(add)
  }
  
  const _logout = () => {
    auth.signOut()
      .then(() => {
        setUser(null)
      })
  }
  const _login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        setUser(user)
      })
  }

  const _edit = link => {
    setEditLink(link)
    _newForm()
  }

  const _filtering = event => {
    setFilter(event)
  }

  return (
    <div className="App">
      <Container>
        <header className="App-header">
          <User login={_login} logout={_logout} user={user} />
        </header>      
      </Container>
      <Heading size="md">ReadL8r</Heading>
      <Box max-width="100%">
      <div className="container mainContainer">
        <div className="column">  
        { user ?
            <>
            <List data={list} update={_updateLink} edit={_edit} delete={_deleteLink} user={user} groups={groupList} keys={keys} filtering={_filtering} loaded={loaded} />
            <Button onClick={_newForm} text="Add New Link" inline />
            </>
          :
          <h4>Log in to see your list!</h4>
        }
        </div>
        {add && (          
          <Layer>
            <Modal 
              accessibilityCloseLabel="close"
              accessibilityModalLabel="View random images"
              heading={editLink ? 'Edit' : 'Add'} 
              onDismiss={_newForm} 
              size="lg">
                <Box padding={10}>
              <div className="column">
                {editLink ? 
                  <LinkForm add={_addLink} user={user} link={editLink} update={_updateLink} groups={groupList}/>
                :
                  <LinkForm add={_addLink} user={user} groups={groupList}/>
                }
              </div>
              </Box>
            </Modal>
          </Layer>
        )}
      </div>
      </Box>
    </div>    
  );
}

export default App;
