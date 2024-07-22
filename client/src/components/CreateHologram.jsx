import { useState } from 'react';
import axios from "axios";
import ToastNotification from './ToastNotification';

export default function CreateHologram() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [superpower, setSuperpower] = useState("");
  const [extinctSince, setExtinctSince] = useState("not extinct");
  const [errorMessage, setErrorMessage] = useState("");
  const [toastNotificationMessage, setToastNotificationMessage] = useState("");
  const [showToastNotification, setShowToastNotification] = useState(false);


  const handleNameChange = e => setName(e.target.value);
  const handleWeightChange = e => setWeight(e.target.value);
  const handleSuperpowerChange = e => setSuperpower(e.target.value);
  const handleExtinctSinceChange = e => setExtinctSince(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    const requestBody = { name, weight, superpower, extinctSince }
    axios.post("/api/hologram", requestBody)
    .then(response => {
      console.log(response);
      setName("");
      setWeight(0);
      setSuperpower("");
      setExtinctSince("");
      setToastNotificationMessage("Hologramm erfolgreich erstellt");
      setShowToastNotification(true);
      setTimeout(() => {
        setShowToastNotification(false);
      }, 2000);
      window.location.reload();
    })
    .catch(error => setErrorMessage(error.response.data.message))
  };

  const handleToastClose = () => showToastNotification(false);


  return (
    <div className='max-w-xl mx-auto p-5'>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Name</label>
          <input type='text' value={name} onChange={handleNameChange} className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md' />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Gewicht</label>
          <input type='text' value={weight} onChange={handleWeightChange} className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md' />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Superkraft</label>
          <input type='text' value={superpower} onChange={handleSuperpowerChange} className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md' />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Ausgestorben seit</label>
          <input type='text' value={extinctSince} onChange={handleExtinctSinceChange} className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md' />
        </div>
        <div className='flex justify-between'>
          <button className='py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700'>Zusenden</button>
        </div>
      </form>
      {errorMessage && <h3 className='text-red-600 mt-4'>{errorMessage}</h3>}
      <ToastNotification message={toastNotificationMessage} show={showToastNotification} onClose={handleToastClose} />
    </div>
  )
}
