import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';


export default function EditHologram() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [superpower, setSuperpower] = useState("");
  const [extinctSince, setExtinctSince] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const handleNameChange = e => setName(e.target.value);
  const handleWeightChange = e => setWeight(e.target.value);
  const handleSuperpowerChange = e => setSuperpower(e.target.value);
  const handleExtinctSinceChange = e => setExtinctSince(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    const requestBody = { name, weight, superpower, extinctSince }
    axios.put(`/api/hologram/${id}`, requestBody)
    .then(response => {
        navigate("/");
    })
    .catch(error => setErrorMessage(error.response.data.message))
  };

  useEffect(() => {
    axios.get(`/api/hologram/details/${id}`)
      .then(response => {
        const { name, weight, superpower, extinctSince } = response.data;

        setName(name);
        setWeight(weight);
        setSuperpower(superpower);
        setExtinctSince(extinctSince);
      })
      .catch(err => console.log(err));
  }, []);

  const deleteHologram = () => {
    axios.delete(`/api/hologram/${id}`)
     .then(() => {
        navigate("/");
     })
     .catch(err => console.log(err));
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
      <button onClick={deleteHologram}>Löschen ❌</button>
      {errorMessage && <h3 className='text-red-600'>{errorMessage}</h3>}
    </div>
  )
}
