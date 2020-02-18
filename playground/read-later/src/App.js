import React, {useState}  from 'react'
import List from './components/list.js'
import LinkForm from './components/form.js'

import "./App.scss"

const links = [
  {
    id: 1,
    url: "google.com",
    description: "Google",
    timestamp: new Date().toLocaleString(),
    read: false
  },
  {
    id: 2,
    url: "example.com",
    description: "Example",
    timestamp: new Date().toLocaleString(),
    read: true
  },
]
//const links = [];

const App = () => {
  const [list,setList] = useState(links)

  const addLink = link => {
    link.id = list.length + 1
    link.timestamp = new Date().toLocaleString()
    setList([...list, link])
  }
  const deleteLink = id => {
    setList(list.filter(link => link.id !== id ))
  }

  const updateLink = updatedLink => {
    setList(list.map(link => (link.id === updatedLink.id ? updatedLink : link)))
    //let read = event.target.innerHTML;
    //console.log(event);
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
