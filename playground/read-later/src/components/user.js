import React from 'react'
import { Avatar, Button, Box, Heading } from 'gestalt';

const User = (props) => {
    const user = props.user

    return (        
        <div class="header">
        <Box padding={6} height={100}>
            <Box position="absolute" top left>
                <Heading size="md">ReadL8r</Heading>
            </Box>
            <Box position="absolute" padding={6} top right display="flex" direction="row">
            {user ? 
                    <>   
                    <Button onClick={props.logout} text="Sign Out" color="gray" inline />  
                    <Avatar size="md" alt='user profile' src={user.photoURL} name={user.displayName} />
                    </>           
                : 
                <Button onClick={props.login} text="Sign In" inline />
            }
            </Box>
        </Box>
        </div>
        
        )
}
export default User;