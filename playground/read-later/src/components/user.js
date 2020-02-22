import React from 'react'

const User = (props) => {
    const user = props.user
    //console.log(user)

    return (
        <>
        <div className='user-area'>
        {user ? 
                <>                      
                <button onClick={props.logout}>Log Out</button>
                <div className='user-profile'>
                    <img src={user.photoURL} />
                </div>
                </>           
            : 
            <button onClick={props.login}>Log In</button>
        }
        </div>
        </>
    )
}
export default User;