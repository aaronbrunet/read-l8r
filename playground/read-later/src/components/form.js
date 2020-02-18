import React, {useState} from 'react'

const LinkForm = (props) => {  
    const initialLink = {id:null,url:'',description:'',read:false,timestamp:null}
    const [link,setLink] = useState(initialLink)
    const [url,addUrl] = useState('')  
    const [description,addDescription] = useState('')  

    const handleInputChange = event => {
        const {name,value} = event.target
        setLink({...link,[name]:value,read:false,timestamp:new Date().toLocaleString()})
    }

    return(
        /*
        <table>
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Description</th>                    
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input name="url" onChange={(e)=>addUrl(e.target.value)} /></td>
                    <td><input name="description" onChange={(e)=>addDescription(e.target.value)} /></td>                
                    <td onClick={()=>props.add(url,description,false)}>Add This Link</td>
                </tr>
            </tbody>
        </table>
        */
       <form onSubmit={ event => {
            event.preventDefault()
            if (!link.url || !link.description) return

            props.add(link)
            setLink(initialLink)
       }}>
           <table>
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Description</th>                    
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input name="url" onChange={handleInputChange} value={link.url}/></td>
                    <td><input name="description" onChange={handleInputChange} value={link.description} /></td>                
                    <td><button>Add This Link</button></td>
                </tr>
            </tbody>
        </table>
       </form>
    );
}
export default LinkForm;