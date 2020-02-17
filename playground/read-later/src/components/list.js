import React from 'react'

const List = (props) => {    
    const list = props.data;    

    const rows = list.map((row,index) => {
        return (
            <tr key={index}>
                <td>{row.url}</td>
                <td>{row.description}</td>
                <td>{row.read.toString()}</td>                
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
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}
export default List;