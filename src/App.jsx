import { useState, useEffect } from "react"
import { getJokes, addJoke } from "./services/jokeService.js"
import "./App.css"


export const App = () => {
  const [allJokes, setAllJokes] = useState([])
  const [newJoke, setNewJoke] = useState("")


  useEffect(() => {
    getAllJokes()
  }, [])

  const getAllJokes = () => {
    getJokes().then(jokesArray => {
      setAllJokes(jokesArray)
    })
  }

  const handleAddJoke = () => {

    if (newJoke) {
      const jokeToSave = {
        id: allJokes.length > 0 ? Math.max(...allJokes.map(joke => joke.id)) + 1 : 1,
        text: newJoke,
        told: false
      }

      addJoke(jokeToSave).then(() => {
        setNewJoke("")
        getAllJokes()
      })
    }
    }

  return (
    <div className="app-container">
      <div className="app-heading">
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
      <h2>Add Joke</h2>
      <div className="joke-add-form">
        <input 
          className="joke-input" 
          type="text" 
          value={newJoke}
          placeholder="New One Liner" 
          onChange={(event) => {
            setNewJoke(event.target.value)
        }} />

        <button 
          className="joke-input-submit" 
          onClick={handleAddJoke}>Add</button>

      </div>
    </div>
  )
}
