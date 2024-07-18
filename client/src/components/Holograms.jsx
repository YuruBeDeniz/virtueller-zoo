import holograms from "../data/holograms.json";
import CreateHologram from "./CreateHologram";

export default function Holograms() {
  return (
    <>
    <h1 className="text-[30px]">Holograms</h1>
    <CreateHologram />
    <table className="table-auto m-auto w-full text-left">
        <thead className="border-b-2 border-slate-400">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Weight</th>
            <th className="p-4">Superpower</th>
            <th className="p-4">Extinct Since</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-300">
          {holograms.map(hologram => (
            <tr key={hologram._id}>
              <td className="p-4">{hologram.name}</td>
              <td className="p-4">{hologram.weight}</td>
              <td className="p-4">{hologram.superpower}</td>
              <td className="p-4">{hologram.extinctSince}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
