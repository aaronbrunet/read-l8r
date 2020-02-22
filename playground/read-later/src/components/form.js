import React, {useState, useEffect} from 'react'

const LinkForm = (props) => {  
    const initialLink = {id:null,url:'',description:'',read:false,timestamp:null,uid:null}
    const [link,setLink] = useState(initialLink)
    const [edit,setEdit] = useState(false)

    const editLink = props.link
    useEffect(()=>{
        if(editLink){
            setLink(editLink)
            setEdit(true)
        }
    },[editLink])

    const user = props.user

    const handleInputChange = event => {
        const {name,value} = event.target
        setLink({...link,[name]:value,read:false,timestamp:new Date().toLocaleString(),uid:props.user.uid})
        
    }

    return(
        <>
        {user ?       
            <form onSubmit={ event => {
                event.preventDefault()
                if (!link.url || !link.description) return

                if(editLink){
                    props.update(link)
                    setEdit(false)
                }
                else{props.add(link)}
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
                            <td><input type="url" pattern="(http|https)://.+" name="url" onChange={handleInputChange} value={link.url}/></td>
                            <td><input name="description" onChange={handleInputChange} value={link.description} /></td>                
                            <td><button>{edit ? 'Save' : 'Add +'}</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
            :
            <h4>Login to start adding links!</h4>
        }
        </>
        );
}
export default LinkForm;