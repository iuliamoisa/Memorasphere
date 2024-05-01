import {useState, useEffect} from 'react'
import api from '../api'
import Entry from '../components/Entry'
import "../styles/Home.css"

function Home() {
    const [entry, setEntries] = useState([])
    const [content, setContent] = useState("")

    useEffect(() => {
        getEntries()
    }, [])
    const getEntries = () => {
        api
            .get('/api/entries/')
            .then((res) => res.data)
            .then((data) => {
                setEntries(data); console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteEntry = (id) => {
        api
            .delete(`/api/entries/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Entry deleted")
                else alert("Failed to delete entry")
                getEntries()
            }).catch((err) => alert(err));
            
    }

    const createEntry = (e) => {
        e.preventDefault()
        api
            .post('/api/entries/', {content})
            .then((res) => {
                if (res.status === 201) alert("Entry created")
                else alert("Failed to create entry")
                getEntries()
            }).catch((err) => alert(err));
            
    }
    return (
      <div>
        <div>
            <h2>Entries</h2>
            {entry.map((entry) => <Entry entry={entry} onDelete={deleteEntry} key={entry.id}/>)}
        </div>
        <h2>Create entry</h2>
        <form onSubmit={createEntry}>
            <label htmlFor='content'>Content</label>
            <br></br>
            <textarea
                id="content"
                name="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="I'm thinking about..."
            ></textarea>
            <button className="submit-button" type="submit" value="submit">Create</button>
        </form>
      </div>
    );
  }
  export default Home;