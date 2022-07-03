import { useState, useContext, useEffect } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'
import './write.css'
import Toast from "../../components/toast/index"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Write() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const { user } = useContext(Context)
    const [open, setOpen] = useState(false);
    const [tabs, setTabs] = useState([]);
    const [newTab, setnewTab] = useState([]);
    const [keyword, setKeyword] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchItems = async () => {
            const res = await axios.get("/tabs")
            setTabs(res.data)
        }
        fetchItems()
    }, [tabs])

    const handleClick = (e) => {
        var tabarray = newTab
        tabarray.push(e.target)
        setnewTab(tabarray)
    }

    const handleTabSubmit = async () => {
        const data = { tab: keyword }
        const res = await axios.post("/tabs", data)
        setOpen(false);
        if (res.status === 200) {
            Toast.success("添加成功")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const tab = newTab.map(t => t['innerHTML'])
        const newPost = {
            username: user._doc.username,
            title,
            desc,
            tab
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + '.jpg';
            data.append("name", filename)
            data.append("file", file)
            newPost.photo = filename
            try {
                await axios.post("/upload", data)
            } catch (err) { Toast.error(err.msg ? err.msg : err) }
        }
        try {
            const res = await axios.post("/posts", newPost)
            if (res.status === 200) {
                Toast.success("发布成功")
                setTimeout(() => {
                    window.location.replace("/")
                }, 2000);
            }
        } catch (err) {
            Toast.error(err.msg ? err.msg : err)
        }
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
                {newTab && <ul className='tabList'>{newTab.map(t => {
                    return <li className="tabListItem">{t['innerHTML']}
                        <i className="cancelIcon fa-solid fa-xmark"></i>
                    </li>
                })}</ul>}
            </form>
            <div className='dialogBtn'>
                <Button variant="outlined" onClick={handleClickOpen}>
                    #添加标签
                </Button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>选择标签</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        onBlur={e => setKeyword(e.target.value)}
                        margin="dense"
                        id="name"
                        label="添加标签"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <DialogContentText>
                        <ul className='tabList'>{tabs.map((t, index) => {
                            return <li key={index} className="tabListItem" onClick={handleClick}>{t['tab']}</li>
                        })}</ul>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={handleTabSubmit}>确定</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
