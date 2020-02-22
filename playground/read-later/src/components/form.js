import React, {useState} from 'react'

const LinkForm = (props) => {  
    const initialLink = {id:null,url:'',description:'',read:false,timestamp:null,uid:null}
    const [link,setLink] = useState(initialLink)

    const handleInputChange = event => {
        const {name,value} = event.target
        setLink({...link,[name]:value,read:false,timestamp:new Date().toLocaleString(),uid:props.user.uid})
    }

    return(
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