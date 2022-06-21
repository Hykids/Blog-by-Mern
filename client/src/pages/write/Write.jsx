import './write.css'

export default function Write() {
    return (
        <div className='write'>
            <form className="writeForm">
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fa-solid fa-plus"></i>
                    </label>
                    <input type="file" id="fileInput" style={{ display: "none" }} />
                    <input type="text" className="writeInputTitle" autoFocus={true} placeholder='Title' />
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder='Tell your story..' type="text" className="writeInput"></textarea>
                </div>
                <button className='writeSubmit'>Publish</button>
            </form>
        </div>
    )
}
