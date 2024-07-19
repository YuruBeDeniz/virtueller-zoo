import { useState } from 'react';
import axios from "axios";


export default function CreateHologram() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [superpower, setSuperpower] = useState("");
  const [extinctSince, setExtinctSince] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = e => setName(e.target.value);
  const handleWeightChange = e => setWeight(e.target.value);
  const handleSuperpowerChange = e => setSuperpower(e.target.value);
  const handleExtinctSinceChange = e => setExtinctSince(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    const requestBody = { name, weight, superpower, extinctSince }
    axios.post("/api/hologram", requestBody)
    .then(response => console.log(response))
    .catch(error => setErrorMessage(error.response.data.message))
  }


  return (
    <div className=''>
    <h1>Create Hologram</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type='text' value={name} onChange={handleNameChange} />
        <label>Gewicht</label>
        <input type='text' value={weight} onChange={handleWeightChange} />
        <label>Superkraft</label>
        <input type='text' value={superpower} onChange={handleSuperpowerChange} />
        <label>Ausgestorben seit</label>
        <input type='text' value={extinctSince} onChange={handleExtinctSinceChange} />
        <button>Zusenden</button>
      </form>
      {errorMessage && <h3 className='text-red-600'>{errorMessage}</h3>}
    </div>
  )
}
