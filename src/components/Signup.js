import React, {useState, useEffect} from 'react';
import * as Yup from "yup";
import axios from "axios"
import { Link } from 'react-router-dom';
//Styles
import styled from "styled-components"



const TestStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
   
    background-repeat: no-repeat;
    background-size: 100% 120vh;
    background-position: center;
    
    max-width: 100%;
    height: 100vh;
`
const Form = styled.form`
    border: 1px solid #F1F3F2;
    display: flex;
    flex-direction: column;
    jusity-content: center;
    align-items: center;
    width: 32%;
    height: 70%;
    background-color: white;
    border-radius: 5px;
    padding: 2% 0;
    opacity: 85%;
`
const StyledButton = styled.button`
    border: 1px solid #303631;
    border-radius: 5px;
    background-color: black;
    color: #F1F3F2;
    outline: none;
    width: 30%;
    height: 40px;
    font-size: large;
    &:hover{
        background-color: #F1F3F2;
        color: black;
        border: 1px solid #79867C;
    }
`
const ResMessage = styled.p`
    color: #97AD4B;
    text-shadow: 0px 1px #79867C;
`
const FlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;    
    margin-top: 3%;
`
const Label = styled.label`
    width: 42%;
`
const Input = styled.input`
    outline: none;
    border-radius: 3px;
`
const ErrorMsg = styled.p`
    margin-top: 2%;
    font-weight: bold;
    width: 140%;
    color: #CD1919;
`

const formSchema = Yup.object().shape({
username: 
    Yup
    .string()
    .required('Please enter your username'),

    phoneNumber: 
    Yup
    .string()
    .required('Please enter your number')
    .length(10,'Please enter a VALID phone number in the following format 1234567890'),

    password: 
    Yup
    .string()
    
    .required('Please create a password')
    .min(6, "Your password must be 6 characters long")
    
})

const Signup = props =>{
    const [formState, setFormState] = useState({
        username: "",
        phoneNumber: "",
        password: ""
        
    })
   
    const [errors, setErrors] = useState({
        username: "",
        phoneNumber: "",
        password: ""
        
    })
  
    const [buttonDisabled, setButtonDisabled] = useState(true);

    
    const [post, setPost] = useState([]);
    const [users, setUsers] = useState ([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    const validateChange = event => {
        Yup.reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [event.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [event.target.name]: err.errors[0]
                });
            })
    };

    const inputChange = event => {
        event.persist();
        const newFormData = {
            ...formState,
            [event.target.name]:
                event.target.type === "checkbox" ? event.target.checked : event.target.value
        };
        validateChange(event);
        setFormState(newFormData);
    };

    const formSubmit = event => {

        console.log('formSubmit');
        
        event.preventDefault();
        axios.post("https://h2omyplants.herokuapp.com/api/signup", formState)
            .then(res => {
                setPost(res.data);
                console.log("success", res.data);
                setUsers([...users, res.data])
                setFormState({
                    username: "",
                    phoneNumber: "",
                    password: "",
                });
            })
            .catch(err => {
                console.log(err.res);
            });
    };

    return (
        <TestStyle>
                <Form onSubmit={formSubmit}>
                    <h2>Let's get started!</h2>
                    <p>Create your account</p>
                    <FlexDiv>
                        <Label htmlFor="username">
                            Username <br/>
                        <Input id="username" type="text" name="username" value={formState.username} onChange={inputChange} />
                        {errors.username.length > 0 ? (<ErrorMsg>{errors.name}</ErrorMsg>):null}
                        </Label> <br/>
                        <Label htmlFor="phoneNumber">
                            Phone <br/>
                        <Input id="phoneNumber" type="phoneNumber" name="phoneNumber" value={formState.phoneNumber} onChange={inputChange} />
                        {errors.phoneNumber.length > 0 ? (<ErrorMsg className="error"> {errors.phoneNumber}</ErrorMsg>) : null}
                        </Label><br/>
                        <Label htmlFor="password">
                            Password <br/>
                        <Input id="password" type="password" name="password" value={formState.password} onChange={inputChange} />
                        {errors.password.length > 0 ? (<ErrorMsg>{errors.password}</ErrorMsg>):null}
                        </Label><br/>
                    </FlexDiv>
                    <StyledButton disabled={buttonDisabled} type='submit'>Submit</StyledButton>
                    <ResMessage className="success-message">{users.map(element => {
                        console.log({element})
                        return (
                        <><br /><div>Success: {element.message}! Go to <Link onClick={() => props.history.push("/login")}>Login</Link></div></>
                        );
                    })}</ResMessage><br/>
                    <p>Already have an Account? <Link to='/login'>Login</Link> here!</p>
                </Form>
                    
        </TestStyle>

    );
}



export default Signup