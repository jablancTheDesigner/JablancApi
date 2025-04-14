import { useState, useEffect } from 'react'
import './App.css'
// import projects from "./mocks/projects"

function App() {
  const defaultForm = {
    title: "",
    metaData: {
      url: "",
      repoLink: "",
      type: "web"
    }
  }
  const [form, setForm] = useState(defaultForm)
  const [type, setType] = useState("web")
  const [projects, setProjects] = useState([])
  const [managedProjects, setManagedProjects] = useState([])

  const handleType = (e) => {
    if(e.target.checked){
      setType("web")
      setForm({
        ...form, 
        metaData: {
          ...form.metaData,
          type: "web"
        }
      })
    }  else {
      setType("print")
      setForm({
        ...form, 
        metaData: {
          url: "",
          repoLink: "",
          type: "print"
        }
      })
    }
  }

  const handleCreateProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5050/projects/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form),
      })
      const data = await res.json();
      const docId = data.id;
      setManagedProjects([
        ...managedProjects,
        docId
      ]);
      setForm(defaultForm)
      setType("web")
    } catch(e){
      console.log(e)
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch("http://localhost:5050/projects/delete", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"docId": id}),
      })
      setManagedProjects([...managedProjects, id ]);
    } catch(e){
      console.log(e)
    }
  }

  const handleEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:5050/projects/${id}`)
      const data = await res.json();
      alert(JSON.stringify(data.project))
    } catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    fetchProjects();
  }, [managedProjects])

  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:5050/projects")
      const data = await res.json()
      console.log(data)
      setProjects(data.projects)
    } catch(e){
      console.log(e)
    }
  }

  return (
    <>
      <h1 className='w-full text-center text-6xl font-bold tracking-tighter py-12 text-navy'>My Dashboard</h1>
      <section className="p-6 bg-navy text-gray-900">
        <form onSubmit={handleCreateProjectSubmit} className="container flex flex-col mx-auto space-y-12">
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Create New Project</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="" className="text-sm">Title</label>
                <input type="text" name="title" value={form.title}  onChange={(e) => setForm({...form, title: e.target.value })} className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border-gray-300 border-1" />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="type" className="inline-flex items-center p-2 rounded-md cursor-pointer dark:text-gray-100">
                  <input id="type" type="checkbox" className="hidden peer" onChange={handleType} checked={type === "web"} />
                  <span className="px-4 py-2 rounded-l-md bg-gray-300 peer-checked:bg-navy peer-checked:text-gray-300">Web</span>
                  <span className="px-4 py-2 rounded-r-md bg-navy text-gray-300 peer-checked:bg-gray-300 peer-checked:text-navy">Print</span>
                </label>
              </div>

              <div className="col-span-full sm:col-span-3">
                  <label htmlFor="" className="text-sm">URL</label>
                  <input type="text" name="url" value={form.metaData.url} onChange={(e) => setForm({
                    ...form, 
                    metaData: {
                      ...form.metaData,
                      url: e.target.value 
                    }
                  })} 
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border-gray-300 border-1 disabled:bg-gray-300"
                  disabled={type !== "web"} />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="" className="text-sm">Github Link</label>
                <input type="text" name="repoLink" value={form.metaData.repoLink} onChange={(e) => setForm({
                  ...form, 
                  metaData: {
                    ...form.metaData,
                    repoLink: e.target.value 
                  }
                })} 
                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border-gray-300 border-1 disabled:bg-gray-300"
                disabled={type !== "web"} />
              </div>
              <button type='submit' className="px-4 py-2 border rounded-md border-gray-800 cursor-pointer col-span-3"> Create </button>
            </div>
          </fieldset>
        </form>

        <div>

        </div>
      </section>
      <section>
        <div className="container flex flex-col mx-auto space-y-12 py-12">
          <div className='grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-200'>
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">My Projects - ({projects.length})</p>
            </div>
            <div className='flex flex-wrap gap-12 flex-col sm:flex-row col-span-full lg:col-span-3 min-h-[500px]'>
              {projects.map((project) => (
                <div className="max-w-xs  min-w-[320px] rounded-md shadow-md bg-gray-50 text-navy relative" key={project.id}>
                  <button className="absolute top-2 right-2  py-2 px-4 cursor-pointer bg-white text-navy" onClick={() => handleDelete(project.id)}>Delete</button>
                  <img src={`https://placehold.co/300x300/${project.metaData.type === "web" ? '101828' : 'red'}/FFFFFF/png?text=Placeholder`} alt="" className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500" />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="space-y-2 mb-8">
                      <h2 className="text-xl font-semibold tracking-wide leading-tight ">
                        {project.title.slice(0, 50)}{project.title.length > 50 && "..."}
                      </h2>
                    </div>
                    <button type='button' className="px-4 py-2 border rounded-md border-gray-800 cursor-pointer mt-auto" onClick={() => handleEdit(project.id)}> Edit </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
