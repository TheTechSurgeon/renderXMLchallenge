import React, {useContext, useEffect,useState} from "react"
import {useHistory} from "react-router-dom"
//Contexts

import { axiosWithAuth } from "../utils/axiosWithAuth"
//Styles
import styled from "styled-components"
import Axios from "axios"
const xml2js = require('xml2js')

//import logo from "../images/company-logo.png"

const TestStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    
    background-repeat: repeat-y;
    background-size: 100% 120vh;
    background-position: center;
    max-width: 100%;
    height: 100vh;
`
const MyHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    background-color: #303631;
`
const Logo = styled.img`
    width: 150px;
    height: 150px;
`
const H2 = styled.h2`
    margin-right: 45%;
    margin-left: 1%;
    color: #F1F3F2;
    text-shadow: -2px -2px #97AD4B;
    font-size: 2.5rem;
`
const StyledButton = styled.button`
    border: 1px solid #303631;
    border-radius: 5px;
    background-color: #97AD4B;
    color: #F1F3F2;
    outline: none;
    height: 40px;
    font-size: large;
    &:hover{
        background-color: #F1F3F2;
        color: #97AD4B;
        border: 1px solid #79867C;
    }
`
const LogoutButton = styled.button`
    border: 1px solid #303631;
    border-radius: 5px;
    background-color: #303631;
    color: #F1F3F2;
    outline: none;
    height: 40px;
    font-size: large;
    margin-left: 2%;
    margin-right: 1%;
    &:hover{
        background-color: #F1F3F2;
        color: #303631;
        border: 1px solid #79867C;
    }
`
const CardHolder = styled.div`
    border: 3px solid green;    
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    color: white;
`

const CardForm = styled.div`
    border: 3px solid green;    
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    color: white;
`
const CardParent = styled.div`
    border: 2px solid red;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;   
    height: 100vh;
    padding: 0 4%; 
`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 20%;
    margin: 1%;
    background-color: #444A45;
    border-radius: 5px;
    border: 1px solid #c9cfca;
    color: white;
    padding: 1%;
    box-shadow: 4px 4px rgba(151, 173, 75, 0.75);
`
const ImageStyle = styled.img`
    height: 180px;
    border-radius: 5px;
    margin: 3% 0;
    padding: 5px;
    border: 1px solid #79867C;
    background-color: #F1F3F2;
    box-shadow: 1px 1px lightgrey;
`
const Form = styled.form`
    border: 1px solid #F1F3F2;
    display: flex;
    flex-direction: column;
    jusity-content: center;
    align-items: center;
    width: 32%;
    height: 70%;
    background-color: #C9CFCA;
    border-radius: 5px;
    padding: 2% 0;
    opacity: 95%;
`
const Input = styled.input`
    outline: none;
    border-radius: 3px;
    margin-top:3vh;
`

const HomePage = () => {
    const [podcastList, setPodcastList] = useState([])
    const [podcastURL, setPodcastURL]= useState("")
    const {push} = useHistory()
    

    const getPodcast = () => {
        Axios
            .get(podcastURL)
            .then(res => {

            //for some reason I can't access xmlholder data directly from res, will fix this later TODO
                let xmlHolder = res
                const xmlData = xmlHolder.data
                
                let parser = new xml2js.Parser();
                

                parser.parseString(xmlData,function (err, result){
                   
                    console.log(result.rss.channel[0].item)
                    setPodcastList(result.rss.channel[0].item)

                    
                })
                
                
            })
            .catch(err => {
                console.log("error getting podcasts", err.message)
            })
    }
    
    

    const changeHandler = e => {
        e.preventDefault()
        setPodcastURL(e.target.value)
    }
//make my xml here


    //onSubmit={importPodcastList}
    return(
        <TestStyle>
            <MyHeader>
                
                <H2>My Podcasts</H2>
                
                <LogoutButton onClick={() => push("/login")}>Log out</LogoutButton>
            </MyHeader>
            <CardForm >
                <h3>Enter URL Here</h3>
                <label htmlFor="podurl">
                <Input
                id ="podurl"
                name= "podurl"
                value={podcastURL}
                onChange={changeHandler}
                
                />
                </label>
                <StyledButton onClick={getPodcast}>Submit</StyledButton>

                


            </CardForm>
            
            <CardHolder>
                <CardParent>{podcastList.map(unit => {
                    console.log(unit)
                    return(
                    <Card key={unit.link}>
                        
                        <p>Title: {unit.title[0]}</p>
                        <p>URL: {unit.link[0]}</p>
                    </Card>
                    )
                })}</CardParent>
                {/* <CardParent>
                    {podcastList[0].item.map(unit=>{
                        console.log(unit)
                    })}
                </CardParent> */}
            </CardHolder>
        </TestStyle>
    )
}

export default HomePage