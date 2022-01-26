import React from 'react'
import { navigate } from 'gatsby'
import styled from 'styled-components'


const NextandPreviousBtn = (props) => {
//check for the existing next or previous 
// check for the existing LEARN ECL  
let existence = props.to !== null && props.to !== ""
let path = props.to

let btnStyle = {
    position:'absolute',
    right: props.variant=="right"?'0': null,
    display:'inline-block',
    visibility: existence ? "visible":"hidden"
}

const navigateTo = () => {
    if(existence){
    navigate(path)
    }
}
    return (
        <BtnWrapper>
            <button style={btnStyle} onClick={navigateTo}>
                {props.children}
            </button>
        </BtnWrapper>
        
    )
}

export default NextandPreviousBtn

const BtnWrapper = styled.div`
    margin-top: 30px;
    margin-bottom: 30px;
    
    button{
        border-radius: 2px;
        color: #000000;
        font-size: 16px;
        font-weight: 700;
        padding: 8px 16px;
        background: #04AA6D;
        border: none;
    }
    &:hover button{
        color: #FFFFFF !important;
    }
`