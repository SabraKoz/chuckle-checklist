import { useState, useEffect } from "react"
import { getJokes, addJoke, editJoke, deleteJoke } from "./services/jokeService.js"
import "./App.css"
import stevePic from "./assets/steve.png"


export const App = () => {
  const [allJokes, setAllJokes] = useState([])
  const [newJoke, setNewJoke] = useState("")
  const [toldJokes, setToldJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])

  const updateDatabase = () => {
    getJokes().then((jokeArr) => {
      setAllJokes(jokeArr)
    })
  }

  useEffect(() => {
    updateDatabase()
  }, [])

  const handleAddJoke = () => {

    if (newJoke) {
      const jokeToSave = {
        id: allJokes.length > 0 ? Math.max(...allJokes.map(joke => joke.id)) + 1 : 1,
        text: newJoke,
        told: false
      }

      addJoke(jokeToSave).then(() => {
        setNewJoke("")
        updateDatabase()
      })
    }
  }

  useEffect(() => {
    const told = allJokes.filter((joke) => joke.told === true)
    const untold = allJokes.filter((joke) => joke.told === false)

    setToldJokes(told)
    setUntoldJokes(untold)
  }, [allJokes])

  const switchToldStatus = (jokeId) => {
    const updatedJokes = allJokes.map(joke => joke.id === jokeId ? { ...joke, told: !joke.told } : joke)
    setAllJokes(updatedJokes)
    const updatedJoke = updatedJokes.find(joke => joke.id === jokeId)
    editJoke(updatedJoke)
  }

  const handleDeleteJoke = (jokeId) => {
    deleteJoke(jokeId).then(() => {
      setAllJokes(allJokes.filter(joke => joke.id !== jokeId))
    })
  }

  return (
    <div className="app-container">
      <div className="app-heading">
        <h1 className="app-heading-text">Chuckle Checklist</h1>
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
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

      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>Untold<span className="untold-count">{untoldJokes.length}</span></h2>
          {untoldJokes.map((joke) => (
            <div key={joke.id} className="joke-list-item">
              <p className="joke-list-item-text">{joke.text}</p>
              <div className="joke-list-action-toggle">
                <button onClick={() => switchToldStatus(joke.id)}>Told</button>
              </div>
              <div className="joke-list-action-delete">
                <button onClick={() => handleDeleteJoke(joke.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="joke-list-container">
          <h2>Told<span className="told-count">{toldJokes.length}</span></h2>
          {toldJokes.map((joke) => (
            <div key={joke.id} className="joke-list-item">
              <p className="joke-list-item-text">{joke.text}</p>
              <div className="joke-list-action-toggle">
                <button onClick={() => switchToldStatus(joke.id)}>Untold</button>
              </div>
              <div className="joke-list-action-delete">
                <button onClick={() => handleDeleteJoke(joke.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
