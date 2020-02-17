import React from 'react'
import List from './components/list.js'

const App = () => {

  const links = [
    {
      url: "google.com",
      description: "Google",
      read: false
    },
    {
      url: "example.com",
      description: "Example",
      read: true
    },
  ]

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <p>Hello World!</p>
      <List data={links} />
    </div>
  );
}

export default App;
