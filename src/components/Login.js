import React, { Component,useState,useEffect } from 'react';
import styled from 'styled-components';

const LoginModalBackground = styled.div`
    position:fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background:rgba(0,0,0,0.67);
`
const LoginModal = styled.div`
    width: 300px;
    min-height:300px;
    background:#fff;
    margin:0 auto;
    position:absolute;
    top:10%;
    left:0;
    right:0
    z-index:9999;
    padding: 20px;
    h2 {
       margin: 10px 0px 20px;
    }

`
const Label = styled.div`
    font-size: 14px;
    margin-bottom:6px;
`
const FormGroup = styled.div`
    margin-bottom: 20px;
    text-align:left
`

const InputGroup = styled.div`

input {
    height:30px;
    width:100%;
}
`

const ButtonGroup = styled.div`
    input {
        background: #00bc12;
        border:0.1em solid #00bc12;
        padding: 0.6em;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
    }
`

const Error = styled.div`
    background: #ffb2c5;
    padding: 1em;
    font-size: 12px;
    margin-top: 12px;
    ul {
        padding:0em 12px;
    }
`

const LoginComponent = () => {
    const [showPopUp, setshowPopUp] = useState(true);
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showError, setShowError] = useState(false);

    const valueOfPassword = (e) => {
        setPassword(e.target.value);
    }

    const valueofName = (e) => {
        setName(e.target.value);
    }

    /**Passwords must include one increasing straight of at least three letters, like abc , cde , fgh , and so on, up to xyz . They cannot skip letters; acd doesn't count. */
    const passTOMatchConsecutiveStrings = (password) => {
        return /(?:a(?=b)|b(?=c)|c(?=d)|d(?=e)|e(?=f)|f(?=g)|g(?=h)|h(?=i)|i(?=j)|j(?=k)|k(?=l)|l(?=m)|m(?=n)|n(?=o)|o(?=p)|p(?=q)|q(?=r)|r(?=s)|s(?=t)|t(?=u)|u(?=v)|v(?=w)|w(?=x)|x(?=y)|y(?=z)){2,2}[[:alpha:]]/.test(password);
    }

    /** Passwords must contain at least two non-overlapping pairs of letters, like aa, bb, or cc. */
    const consecutiveLettersMethod = (password) => {
        return !/^(?:(\w)\1+)+$/.test(password);
    }
    /** Passwords may not contain the letters i, O, or l, as these letters can be mistaken for other characters and are therefore confusing. */
    /** Passwords cannot be longer than 32 characters. */
    /** Passwords can only contain lower case alphabetic characters. */
    const lengthValidation = (password) => {
        return /^[^iOl]{1,32}$/.test(password)
    }

    const validateForm = (event) => {
        event.preventDefault();
        if(name !== '' && passTOMatchConsecutiveStrings(password) === true && consecutiveLettersMethod(password) === true && lengthValidation(password) === true) {
            /** sets the username to the current session */
            sessionStorage.setItem("username", name);
        } else {
            setShowError(true)
            return false;
        }
    }

    /** checks whether the username is already valid for this session or not */
    useEffect(() => {
        if(sessionStorage.getItem("username")) {
            setshowPopUp(false)
        }
    },[])

    return (
        <div>
            { showPopUp === true ?
            <LoginModalBackground>
                <LoginModal>
                    <h2>Login Form</h2>
                    <form onSubmit={validateForm}>
                        <FormGroup>
                            <Label>User Name</Label>
                            <InputGroup>
                                <input type="text" onChange={valueofName} required/>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label>Password</Label>
                            <InputGroup>
                                <input type="password" onChange={valueOfPassword} required/>
                            </InputGroup>
                            { showError && <Error>
                                <ul>
                                    <li>
                                        Passwords must include one increasing straight of at least three letters, like abc , cde , fgh , and so on, up to xyz . They cannot skip letters; acd doesn't count.
                                        </li>
                                        <li>
                                        Passwords may not contain the letters i, O, or l, as these letters can be mistaken for other characters and are therefore confusing.

                                        </li>
                                        <li>
                                        Passwords must contain at least two non-overlapping pairs of letters, like aa, bb, or cc.
                                        </li>
                                        <li>Passwords cannot be longer than 32 characters.</li>
                                        <li>Passwords can only contain lower case alphabetic characters.</li>
                                </ul>
                            </Error> }
                        </FormGroup>
                        <ButtonGroup>
                            <input type="submit" value="Validate" />
                        </ButtonGroup>
                    </form>
                </LoginModal>
            </LoginModalBackground>
            : <div>Welcome, {name} </div>}
        </div>
    )
}

export default LoginComponent;