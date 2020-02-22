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
                    <img alt='user profile' src={user.photoURL} />
                    <h4>Hello, {user.displayName}</h4>
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