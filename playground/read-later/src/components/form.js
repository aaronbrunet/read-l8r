import React, {useState, useEffect} from 'react'

const LinkForm = (props) => {  
    const initialLink = {id:null,url:'',description:'',read:false,timestamp:null,uid:null,group:''}
    const [link,setLink] = useState(initialLink)
    const [edit,setEdit] = useState(false)

    const editLink = props.link
    const groups = props.groups

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

    const groupsList = groups.map((group,key) => {
           return <option key={key} value={group}>{group}</option>
    })

    return(
        <>        
        <p>New</p>
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
                            <th>Group</th>                    
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="url" pattern="(http|https)://.+" name="url" onChange={handleInputChange} value={link.url}/></td>
                            <td><input name="description" onChange={handleInputChange} value={link.description} /></td> 
                            <td>
                                <input name="group" onChange={handleInputChange} value={link.group} list="groups"/>
                                <datalist id="groups">{groupsList}</datalist>
                            </td>                

                            <td><button>{edit ? '💾' : 'Add +'}</button></td>
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