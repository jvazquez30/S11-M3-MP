import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function DogsList({dogs, fetchDogs, setCurrDogId}) {
const navigate = useNavigate()

  const deleteDog = id => {
    fetch(`/api/dogs/${id}`, {
      method: "DELETE"
    })
    .then(() => fetchDogs())
    .catch(err => console.error("Could not DELETE dog", err))
  }

  const editDog = id => {
    setCurrDogId(id)
    navigate("form")
  }

  return (
    <div>
      <h2>Dogs Shelter</h2>
      <ul>
        {dogs.map(dog => (
          <li key={dog.id}>
            {dog.name}, {dog.breed}, {dog.adopted ? "adopted" : "NOT adopted"}
            <div>
              <button onClick={() => editDog(dog.id)}>Edit</button>
              <button onClick={() => deleteDog(dog.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
