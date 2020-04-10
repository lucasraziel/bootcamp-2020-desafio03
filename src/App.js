import React, {useState, useEffect} from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);


  useEffect(()=>{
    loadData()
  },[])

  async function loadData(){
    const response = await api.get('repositories')

    setProjects(response.data)
  }
  async function handleAddRepository() {
    const response = await api.post('repositories',{
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })

    setProjects([...projects, response.data])
  }
  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)

    if (response.status===204){
      const newProjects = projects.filter(project=>project.id!==id)
      setProjects(newProjects)
    }

    
  }
  

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project=>(
          <li key={project.id}>
            {project.title}

            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
