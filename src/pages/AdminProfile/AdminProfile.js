import React, { useState } from "react";
import user2 from '../../images/user2.jpg';
import styled, { css } from "styled-components";
import { deleteUser } from '../../utils';
import { LogoutButton } from '../../components/Logout';

const flex = css`
display:flex;
justify-content: center;
align-items: center;
`
const StyledWrapper = styled.div`
height: 92vh;
width:100%;
${flex}
flex-direction: column;
background-color: #E5E9F8;



`
const StyledAvatar = styled.div`
    height: 30%;
    width: 100%;
    /* background-color:yellow; */
    ${flex}
    flex-direction: column;
    
    #profile {
        width:37%;
        height:60%;
        border-radius: 50%;
        background-image: url(${user2});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    h3 {
        text-shadow: 1px 1px 10px  rgba(0,0,0, 0.2);
    }
    hr {
        color: black;
        width: 90%;
    }
    @media(min-width: 1024px) {
    width: 70%;
    }
    @media(min-width: 1440px) {
    width: 50%;

    }

`
const StyledForm = styled.form`
    height: 55%;
    width: 100%;
    ${flex}
    flex-direction: column;
    @media(min-width: 1024px) {
    width: 70%;

    }
    @media(min-width: 1440px) {
    width: 50%;
    }

    .row {
        height: 100%;
        width: 100%;
        ${flex}
        justify-content:space-between;
        border-bottom: 1px solid rgba(0,0,0, 0.2);
        
        label {
            margin-left: 15px;
            height: 30px;
            font-weight: bold;
            text-shadow: 1px 1px 10px  rgba(0,0,0, 0.2);
            ${flex}
        }
        input {
            margin-right: 15px;
            height: 40%;
            border-radius: 5px;
            padding-left: 4px;
            border:none;
            box-shadow: 2px 2px 10px  rgba(0,0,0, 0.2);

        }
    }
    .row:hover {
        background-color:rgba(106, 97, 171, 0.3);
        box-shadow:3px 3px 10px  rgba(0,0,0, 0.2) ;
    }
`
const StlyedButon = styled.div`
    height: 15%;
    width: 100%;
    ${flex}
    @media(min-width: 1024px) {
    width: 70%;

    }
    @media(min-width: 1440px) {
    width: 50%;
    }

    a {
    height: 40%;
    width:30%;
    color: #000;
    text-decoration:none;
    font-size: 0.7em;
    font-weight: bold;
    border-radius: 5px;
    background-color: rgba(106, 97, 171, 0.5);
    box-shadow: none;
    border: none;
    ${flex}
    margin:10px;
    }
    a:visited {
        color: #000;
    }
    a:hover {
    background-color: rgba(106, 97, 171, 0.7);
    }
    a:active {
        background-color: rgba(106, 97, 171, 1);
    }
`

const AdminProfile = ({ user, setUser, setIsAuth }) => {
const [userName, setUserName] = useState(user.user);
const [email, setEmail] = useState("");
const [fname, setFname] = useState(user.fName);
const [lname, setLname] = useState(user.lName);
const [pwd1, setPwd1] = useState("");
const [errorMessage, setErrorMessage] = useState('')

const handleUpdate = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/myprofile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json',
                   'Authorization': `Bearer ${localStorage.getItem('MyToken')}`},
        body: JSON.stringify({
            userName: userName,
            firstName: fname,
            lastName: lname,
            email: email,
            password: pwd1
        }),
    });
    
    if (response.status === 404) {
        setErrorMessage('Incorrect Details')
    } else {
        const data = await response.json();
        setUser({ userId: data.updatedUser._id, user: data.updatedUser.userName, fName: data.updatedUser.firstName, lName: data.updatedUser.lastName , friends: data.updatedUser.friends, acceptedMovies: data.updatedUser.acceptedMovies, rejectedMovies: data.updatedUser.rejectedMovies, watchedMovies: data.updatedUser.watchedMovies});
        setErrorMessage('');
        setPwd1('');
        setEmail('');
    }
    
}
const handleDelete = () => {
    deleteUser(setUser, setIsAuth)
}

const handleUserName = (e) => {
    setUserName(`${e.target.value}`)
    
}
const handleEmail = (e) => {
    setEmail(`${e.target.value}`)
    
}
const handlePwd1 = (e) => {
    setPwd1(`${e.target.value}`)
    
}
const handleFname = (e) => {
    setFname(`${e.target.value}`)
    
}
const handleLname = (e) => {
    setLname(`${e.target.value}`)
    
}
return (
    <StyledWrapper>
        <StyledAvatar>
            <div id="profile"></div>
            <h3>{user.user}</h3>
            <hr/>
        </StyledAvatar>
        <StyledForm>
            <div className="row">
                <label htmlFor="username">User name</label>
                <input type="text" id="username" name="username" placeholder="Enter New User Name" value={userName} onChange={handleUserName}></input>
            </div>
            <div className="row">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="Enter New Email" value={email} onChange={handleEmail}></input>
            </div>
            <div className="row">
                <label htmlFor="pwd">Password</label>
                <input type="password" id="pwd" name="pwd" required placeholder="Enter New Password" value={pwd1} onChange={handlePwd1}></input>
            </div>
            <div className="row">
                <label htmlFor="username">First Name</label>
                <input type="text" id="firstname" name="firstname" placeholder="Enter New Name" value={fname} onChange={handleFname}></input>
            </div>
            <div className="row">
                <label htmlFor="lastname">Last Name</label>
                <input type="text" id="lastname" name="lastname" placeholder="Enter New Last Name" value={lname} onChange={handleLname}></input>
            </div>
            {errorMessage && <p>{errorMessage}</p>}
        </StyledForm>
        <StlyedButon>
            <LogoutButton setUser={setUser} setIsAuth={setIsAuth}/>
            <a onClick={handleUpdate}>UPDATE PROFILE</a>
            <a onClick={handleDelete}>DELETE PROFILE</a>
        </StlyedButon>
    </StyledWrapper>
)
}

export default AdminProfile