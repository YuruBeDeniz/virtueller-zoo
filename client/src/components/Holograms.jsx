import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Holograms() {
  const [holograms, setHolograms] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [isSortedByName, setIsSortedByName] = useState(false);
  const [isSortedByWeight, setIsSortedByWeight] = useState(false);
  const [isExtinct, setIsExtinct] = useState(false);
  const [filteredOrSortedHolograms, setFilteredOrSortedHolograms] = useState([]);

  const handleSearch = e => setSearchByName(e.target.value);

  useEffect(() => {
    if(searchByName) {
      axios.get(`/api/hologram/getSearchedHolograms?q=${searchByName}`)
      .then(response => {
        setHolograms(response.data);
        setFilteredOrSortedHolograms(response.data);
      })
      .catch(err => console.log(err))
    } else {
      axios.get("/api/hologram/getHolograms")
      .then((response) => {
        setHolograms(response.data);
        setFilteredOrSortedHolograms(response.data);
        setIsSortedByName(false); 
        setIsSortedByWeight(false);
      })
      .catch(error => console.log(error))
    }
  }, [searchByName]);

  const filterAndSortHolograms = () => {
    let copiedHolograms = [...holograms];

    if (isExtinct) {
      copiedHolograms = copiedHolograms.filter(hologram => hologram.extinctSince !== "nicht ausgestorben");
    }

    if (isSortedByName) {
      copiedHolograms.sort((a, b) => a.name.localeCompare(b.name));
    } 

    if (isSortedByWeight) {
      copiedHolograms.sort((a, b) => a.weight - b.weight);
    }

    setFilteredOrSortedHolograms(copiedHolograms);
  };

  useEffect(() => {
    filterAndSortHolograms();
  }, [isExtinct, isSortedByName, isSortedByWeight, holograms]); 

  const sortByName = () => {
    setIsSortedByName(true);
    setIsSortedByWeight(false);
  };

  const sortByWeight = () => {
    setIsSortedByWeight(true);
    setIsSortedByName(false);
  };

  const resetSort = () => {
    setIsSortedByName(false);
    setIsSortedByWeight(false);
  };

  const handleIsExtinctChange = event => {
    setIsExtinct(event.target.checked);
  };

  return (
    <>
    <h1 className="flex justify-center text-[30px]">Holograms</h1>
    <div className="flex justify-end"><Link className="py-2 px-4 mb-4 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700" to="/create-hologram">Hologram Erstellen</Link></div>
    <input 
      value={searchByName} 
      onChange={handleSearch} 
      className="mb-4 p-2 mx-2 border border-gray-300 rounded shadow-md w-full"
      placeholder="nach Namen suchen"
    />
    <div className="flex items-center pl-2">
    <label className="mr-3">ist ausgestorben</label>
    <input className="mt-[3px]" type="checkbox" checked={isExtinct} onChange={handleIsExtinctChange} />
    </div>
    <table className="table-auto m-auto w-full text-left">
      <thead className="border-b-2 border-slate-400">
        <tr>
          <th className="p-4">Name <button onClick={sortByName}>🔽</button></th>
          <th className="p-4">Gewicht <button onClick={sortByWeight}>🔽</button></th>
          <th className="p-4">Superkraft</th>
          <th className="p-4">Ausgestorben Seit</th>
          <th className="">
            <button 
                onClick={resetSort}
                className="font-normal text-xs rounded-md text-black-200 px-2 py-2 bg-red-100 hover:bg-red-200"
            >
                Sortierung zurücksetzen
            </button>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-300">
        {filteredOrSortedHolograms.map(hologram => (
          <tr key={hologram._id}>
            <td className="p-4">{hologram.name}</td>
            <td className="p-4">{hologram.weight} kg</td>
            <td className="p-4">{hologram.superpower}</td>
            <td className="p-4">{hologram.extinctSince}</td>
            <td><Link className="border rounded-md p-2 bg-slate-100 hover:bg-slate-200" to={`/hologram/edit/${hologram._id}`}>Bearbeiten</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}
