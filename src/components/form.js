import React, {useState, useEffect} from 'react'
import { Box, Button, Column, Divider, Label  } from 'gestalt'

const LinkForm = (props) => {  
    const initialLink = {id:null,url:'',description:'',read:false,timestamp:null,uid:null,group:''}
    const [link,setLink] = useState(initialLink)
    const [edit,setEdit] = useState(false)

    const editLink = props.link
    const groups = props.groups
    const user = props.user

    useEffect(()=>{
        if(editLink){
            setLink(editLink)
            setEdit(true)
        }
    },[editLink])



    const _handleInputChange = event => {
        const {name,value} = event.target
        setLink({...link,[name]:value,read:false,timestamp:new Date().toLocaleString(),uid:props.user.uid})        
    }

    const groupsList = groups.map((group,key) => {
           return <option key={key} value={group}>{group}</option>
    })

    /**
     * <table>
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
                            <td><input type="url" pattern="https?://.+" name="url" onChange={_handleInputChange} value={link.url}/></td>
                            <td><input name="description" onChange={_handleInputChange} value={link.description} /></td> 
                            <td>
                                <input name="group" onChange={_handleInputChange} value={link.group} list="groups"/>
                                <datalist id="groups">{groupsList}</datalist>
                            </td>                

                            <td><button>{edit ? '💾' : 'Add +'}</button></td>
                        </tr>
                    </tbody>
                </table>
     * 
     */
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
                <Box display="flex" direction="row" position="relative">
                    <Column span={12}>
                        <Box display="flex">
                            <Column span={4}>
                                <Label htmlFor="url">
                                    <h3>URL</h3>
                                </Label>
                            </Column>
                            <Column span={8}>
                                <input type="url" pattern="https?://.+" name="url" onChange={_handleInputChange} value={link.url}/>
                            </Column>
                        </Box>
                        <Box display="flex">
                            <Column span={4}>
                                <Label htmlFor="description">
                                    <h3>Description</h3>
                                </Label>
                            </Column>
                            <Column span={8}>
                                <input name="description" onChange={_handleInputChange} value={link.description} />
                            </Column>
                        </Box>
                        <Box display="flex">
                            <Column span={4}>
                                <Label htmlFor="group">
                                    <h3>Group</h3>
                                </Label>
                            </Column>
                            <Column span={8}>
                                <input name="group" onChange={_handleInputChange} value={link.group} list="groups"/>
                                <datalist id="groups">{groupsList}</datalist>
                            </Column>
                        </Box>
                        <Box marginY={6} >
                            <Button size="md" text={edit ? '💾' : 'Add +'} color="blue" type="submit" inline />
                        </Box>
                    </Column>
                </Box>    
            </form>
            :
            <h4>Login to start adding links!</h4>
        }
        </>
        );
}
export default LinkForm;