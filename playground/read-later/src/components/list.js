import React, {useState} from 'react'

const List = (props) => {
    const [link,addLink] = useState(props.data);
    const list = props.data;
    const add = (url,description,read) => {
        //const {url,description,read} = url,description,read
        //addNewLink({[event.target.name]:event.target.innerHTML})
        addLink([...list, {url:url, description:description,read:read}])
        //addLink({url:url, description:description,read:read})
    }

    const rows = list.map((row,index) => {
        return (
            <tr key={index}>
                <td>{row.url}</td>
                <td>{row.description}</td>
                <td>{row.read.toString()}</td>
                <td onClick={()=>add(row.url,row.description,row.read)}>Add This Link</td>
            </tr>
        )
    })

    return(
        <table>
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Description</th>
                    <th>Read?</th>
                    <th>State</th>
                </tr>
            </thead>
            <tbody>
                {rows}
                <tr key='3'>
                <td>Test.com</td>
                <td>Test</td>
                <td>false</td>
                <td onClick={()=>add("Test.com","Test",false)}>Add This Link</td>
            </tr>
            </tbody>
        </table>
    );

}
export default List;