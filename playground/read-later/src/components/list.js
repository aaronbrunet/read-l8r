import React, {useState} from 'react'

const List = (props) => {
    const [newLink,addNewLink] = useState('');
    return(
        <table>
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Description</th>
                    <th>State</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{newLink}</td>
                    <td onClick={()=>addNewLink('Clicked!')}>Add New Link</td>
                </tr>
            </tbody>
        </table>
    );

}
export default List;