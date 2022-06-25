import { useState, useContext } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'
import './write.css'

export default function Write() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const { user } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPost = {
            username: user._doc.username,
            title,
            desc,
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + '.jpg';
            data.append("name", filename)
            data.append("file", file)
            newPost.photo = filename
            try {
                await axios.post("/upload", data)
            } catch (err) { }
        }
        try {
            await axios.post("/posts", newPost)
            window.location.replace("/")
        } catch (err) { }
    }
    return (
        <div className='write'>
            {file && (<img className='writeImg' src={URL.createObjectURL(file)} alt='' />)}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fa-solid fa-plus"></i>
                    </label>
                    <input type="file" id="fileInput" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                    <input type="text" className="writeInputTitle" autoFocus={true} placeholder='Title' onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder='Tell your story..' type="text" className="writeInput" onChange={e => setDesc(e.target.value)}></textarea>
                </div>
                <button className='writeSubmit' type="submit">Publish</button>
            </form>
        </div>
    )
}
