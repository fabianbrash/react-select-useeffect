import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { createServer } from 'miragejs';


let server = createServer();

server.get("/api/v1/pgs", {
  pgs: [
    {
      id: 1, name: "VSS-MGMT-99"
    },
    {
      id: 2, name: "vDS-NESTED-10"
    },
    {
      id: 3, name: "VSS-VMTraffic-700",
    }
  ]
})


function App() {

  const [ports, setPorts] = useState([]);
  const [port, setPort] = useState('VSS-MGMT-99');

  useEffect(() => {
    fetch('/api/v1/pgs')
    .then(response => response.json())
    .then(data => setPorts(data.pgs))
  },[])

  const handleSelect = (e) => {
    console.log(e);
    setPort(e.target.value);
  }

  return (
    <div className="App">
      <label htmlFor="portgroups">Choose a portgroup:</label>
      <select name="portgroups" onChange={handleSelect}>
        <optgroup label="PortGroups">
        {ports && ports.map(p => (
          <option value={p.name} key={p.id} required>{p.name}</option>
        ))}
        </optgroup>
      </select>
      <h2>You selected PG: {port}</h2>
    </div>
  );
}

export default App;
