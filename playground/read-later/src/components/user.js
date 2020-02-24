import React from 'react'
import { Avatar, Button, Box } from 'gestalt';

const User = (props) => {
    const user = props.user

    return (
        <>
        <Box position="absolute" top right display="flex" direction="row">
        {user ? 
                <>   
                <Button onClick={props.logout} text="Sign Out" inline />  
                <Avatar size="md" alt='user profile' src={user.photoURL} name={user.displayName} />
                </>           
            : 
            <Button onClick={props.login} text="Sign In" inline />
        }
        </Box>
        </>
    )
}
export default User;