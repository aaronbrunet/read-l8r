import React, {useState} from 'react'

const Form = (props) => {  
    const [url,addUrl] = useState('')  
    const [description,addDescription] = useState('')  

    return(
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
    );
}
export default Form;