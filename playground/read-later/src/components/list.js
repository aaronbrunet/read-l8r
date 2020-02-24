import React, { useState } from 'react'
import { Flyout, SegmentedControl, Spinner } from 'gestalt'
import styled from 'styled-components'

const Link = styled.tr`
    opacity:  ${props=>(props.read === true ? '.3':'1')};
    .edit {        
        pointer-events: ${props=>(props.read === true ? 'none':'enabled')};        
        span {
            display: inline-block;
            transform: rotate(135deg);
        }
    }
`

const List = (props) => {    
    const [tabIndex, setTabIndex] = useState(0)
    //const [loaded,setLoaded] = useState(false)
    let loaded = props.loaded
    const data = props.data

    
    let holder = []
    props.filter ? holder = data.filter(link=>link.group===props.filter) : holder = data
    const list = holder
    


    const groups = ['All',...props.groups]

    const _markRead = (link) => {
        link.read = !link.read
        props.update(link)
    }
    const _editLink = (link) => {
        props.edit(link)
    }    

    const _handleSegmentChange = event => {  
        const index = event.activeIndex      
        setTabIndex(index)
        console.log(groups[index])   
        if(groups[index]&&index!==0){
            props.filtering(groups[index])
        }else{
            props.filtering(null)
        }     
    }

    const _handleTabChange = event => {  
        const index = event.activeIndex      
        setTabIndex(index)
        console.log(groups[index])   
        if(groups[index]&&index!==0){
            props.filtering(groups[index])
        }else{
            props.filtering(null)
        }     
    }

    const _handleInputChange = event => {        
        if(event.target.value){
            props.ordering(event.target.value)
        }else{
            props.ordering(null)
        }
    }

    const _handleLoad = () => {
        //setLoaded(loaded => !loaded)
    }    

    const filterList = props.groups.map((filter,key) => {
        return <button onClick={_handleInputChange} value={filter} key={key}>{filter}</button>
    })
    //.toString().replace(/(^\w+:|^)\/\//, '')
    const rows = list.map((row,index) => (                          
            <Link key={index} read={row.read}>
                <td name="group">{row.group}</td>
                <td name="url"><a href={row.url} rel="noopener noreferrer" target="_blank">{row.url}</a></td>
                <td name="description">{row.description}</td>
                <td name="time">{row.timestamp}</td>
                <td name="read"><button onClick={()=>_markRead(row)}><span>👁‍🗨</span></button></td>      
                <td name="actions"><button className="edit" onClick={()=>_editLink(row)}><span>✏</span></button></td>        
                <td name="actions"><button onClick={()=>props.delete(row)}><span>🗑</span></button></td>     
            </Link>            
    ))
    //<input type="text" name="Order" list="ordering" onChange={handleInputChange}/>
    //<datalist id="ordering">{orderList}</datalist>
    //<button onClick={handleInputChange} value=''>All</button>{filterList} 
    return(      
        <>  
                <p>Your List</p>    
                {loaded ?                    
                    (list.length > 0 ?                 
                    <>                    
                        <SegmentedControl items={groups} selectedItemIndex={tabIndex} onChange={_handleSegmentChange} />
                        <table>
                            <thead>
                                <tr>
                                    <th name="group">Group</th>
                                    <th>URL</th>
                                    <th>Description</th>
                                    <th>Updated</th>
                                    <th></th>
                                    <th colSpan="2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </>
                    :   
                    <>              
                        
                        <h4>No links found! Add a link to get reading (well, later)</h4>
                    </>  
                    )                  
                    :
                    <Spinner accessibilityLabel="random image" show={!loaded}/> 
                }
                
        </>
            
    );
}
export default List;