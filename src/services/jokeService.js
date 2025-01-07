export const getJokes = () => {
    return fetch("http://localhost:8088/jokes").then((res) => res.json())
}

export const addJoke = (joke) => {
     const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(joke)
    }
    return fetch("http://localhost:8088/jokes", postOptions)
}

export const editJoke = (joke) => {
    const putOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(joke)
    }
    return fetch(`http://localhost:8088/jokes/${joke.id}`, putOptions)
}

export const deleteJoke = (joke) => {
    const deleteOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return fetch(`http://localhost:8088/jokes/${joke}`, deleteOptions)
}