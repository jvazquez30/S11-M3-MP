import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const initialForm = { name: '', breed: '', adopted: false }

// Use this form for both POST and PUT requests!
export default function DogForm({ dog, fetchDogs, reset }) {
  const [values, setValues] = useState(initialForm)
  const [breed, setBreed] =useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch("api/dogs/breeds")
    .then(res => res.json())
    .then(breed => setBreed(breed))
    .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if (dog) setValues(dog)
      else setValues(initialForm)
  },[dog])

  const post = () => {
    fetch(`api/dogs`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: new Headers ({
        "Content-Type": "application/json"
      })
    })
    .then(res => {
      if (!res.ok) throw new Error("Could not POST dog")
      fetchDogs()
      reset()
      navigate('/')
    })
    .catch(err => console.error(err))
  }

  const put = () => {
    fetch(`api/dogs/${values.id}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: new Headers ({
        "Content-Type": "application/json"
      })
    })
    .then(res => {
      if (!res.ok) throw new Error("Could not POST dog")
      fetchDogs()
      reset()
      navigate('/')
    })
    .catch(err => console.error(err))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const dogAction = dog ? put : post
    dogAction()
    
  }

  const resetB = (event) => {
    event.preventDefault();
    setValues(initialForm)
    reset()
  }

  const onChange = (event) => {
    const { name, value, type, checked } = event.target
    setValues({
      ...values, [name]: type === 'checkbox' ? checked : value
    })
  }
    
  return (
    <div>
      <h2>
      {dog ? "Update " : "Create "}Dog
      </h2>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          value={values.name}
          onChange={onChange}
          placeholder="Name"
          aria-label="Dog's name"
        />
        <select
          name="breed"
          value={values.breed}
          onChange={onChange}
          aria-label="Dog's breed"
        >
          <option value="">---Select Breed---</option>
          {breed.map(bre => (
            <option key={bre}>{bre}</option>
          ))}
        </select>
        <label>
          Adopted: <input
            type="checkbox"
            name="adopted"
            checked={values.adopted}
            onChange={onChange}
            aria-label="Is the dog adopted?"
          />
        </label>
        <div>
          <button type="submit">
            {dog ? "Update " : "Create "}Dog
          </button>
          <button onClick={resetB} aria-label="Reset form" >Reset</button>
        </div>
      </form>
    </div>
  )
}
