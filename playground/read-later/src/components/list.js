import React, {useState} from 'react'

const List = (props) => {    
    const initialLink = {id:null,url:'',description:'',read:false,timestamp:null}
    //const [link,setLink] = useState(initialLink)
    const list = props.data;    

    const markRead = link => {
        link.read = !link.read;
        props.update(link)
    }

    const rows = list.map((row,index) => ( 
        
            <tr key={index}>
             <td name="url">{row.url}</td>
             <td name="description">{row.description}</td>
             <td name="time">{row.timestamp}</td>
             <td name="read" onClick={()=>markRead(row)}>{row.read.toString()}</td>      
             <td name="actions"><button onClick={()=>props.delete(row.id)}>Delete</button></td>          
         </tr>         
    ))

    return(        
                list.length > 0 ? 
                <table>
                    <thead>
                        <tr>
                            <th>URL</th>
                            <th>Description</th>
                            <th>Added</th>
                            <th>Read?</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                : <h4>No links found! Add a link to get reading (well, later)</h4>
            
    );
}
export default List;