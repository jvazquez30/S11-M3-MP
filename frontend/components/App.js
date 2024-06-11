import React, { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import DogForm from './DogForm'
import DogsList from './DogsList'

export default function App() {
  const [dogs, setDogs] = useState([])
  const [currDogId, setCurrDogId] = useState(null)
  
  useEffect(() => {
    fetchDogs()
  }, [])

  const fetchDogs = () => {
    fetch("/api/dogs")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`)
        }
        const contentType = res.headers.get("Content-Type")
        if (contentType.includes('application/json')) {
          return res.json()
        }
      })
      .then(setDogs)
      .catch(err => console.error("Could not GET dogs", err))
  }


  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<DogsList 
        dogs={dogs}
        fetchDogs={fetchDogs}
        setCurrDogId={setCurrDogId}
        />} />
        <Route path="/form" element={<DogForm 
        dog={currDogId && dogs.find(d => d.id == currDogId)}
        fetchDogs={fetchDogs}
        reset={() => setCurrDogId(null)}
        />} />
      </Routes>
    </div>
  )
}
