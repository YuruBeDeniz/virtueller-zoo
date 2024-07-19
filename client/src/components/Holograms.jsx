import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateHologram from "./CreateHologram";
import axios from "axios";

export default function Holograms() {
  const [holograms, setHolograms] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [sortedHologramsByName, setSortedHologramsByName] = useState([]);
  const [sortedHologramsByWeight, setSortedHologramsByWeight] = useState([]);
  const [isSortedByName, setIsSortedByName] = useState(false);
  const [isSortedByWeight, setIsSortedByWeight] = useState(false);

  const handleSearch = e => setSearchByName(e.target.value);

  useEffect(() => {
    if(searchByName) {
      axios.get(`/api/hologram/getSearchedHolograms?q=${searchByName}`)
      .then(response => {
        setHolograms(response.data)
      })
      .catch(err => console.log(err))
    } else {
      axios.get("/api/hologram/getHolograms")
      .then((response) => {
        setHolograms(response.data);
        setIsSortedByName(false); 
        setIsSortedByWeight(false);
      })
      .catch(error => console.log(error))
    }
  }, [searchByName])

  const sortByName = () => {
    const sortedHologramsByName = [...holograms].sort((a,b) => a.name.localeCompare(b.name));
    setSortedHologramsByName(sortedHologramsByName)
    setIsSortedByName(true);
  }

  const sortByWeight = () => {
    const sortedHologramsByWeight = [...holograms].sort((a,b) => a.weight - b.weight);
    setSortedHologramsByWeight(sortedHologramsByWeight)
    setIsSortedByWeight(true);
    console.log(sortedHologramsByWeight)
  }

  return (
    <>
    <h1 className="flex justify-center text-[30px]">Holograms</h1>
    <input 
      value={searchByName} 
      onChange={handleSearch} 
      className="mb-4 p-2 mx-4 border border-gray-300 rounded shadow-md w-full"
      placeholder="search by name" />
    <CreateHologram />
    <table className="table-auto m-auto w-full text-left">
        <thead className="border-b-2 border-slate-400">
          <tr>
            <th className="p-4">Name <button onClick={sortByName}>🔽</button></th>
            <th className="p-4">Weight <button onClick={sortByWeight}>🔽</button></th>
            <th className="p-4">Superpower</th>
            <th className="p-4">Extinct Since</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-300">
          {(isSortedByName ? sortedHologramsByName : isSortedByWeight ? sortedHologramsByWeight : holograms).map(hologram => (
            <tr key={hologram._id}>
              <td className="p-4">{hologram.name}</td>
              <td className="p-4">{hologram.weight} kg</td>
              <td className="p-4">{hologram.superpower}</td>
              <td className="p-4">{hologram.extinctSince}</td>
              <td> <Link className="border rounded-md p-2 bg-slate-100 hover:bg-slate-200" to={`/hologram/edit/${hologram._id}`}>Bearbeiten</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
