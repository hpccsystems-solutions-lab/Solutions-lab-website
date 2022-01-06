import React from 'react'
import { navigate } from 'gatsby'
const NextandPreviousBtn = (props) => {
//check for the existing next or previous 
// check for the existing LEARN ECL  
let existance = props.to !== null && props.to !== ""
let path = props.to

let btnStyle = {
    backgroundColor: '#04AA6D',
    color: 'black',
    position:'absolute',
    right: props.variant=="right"?'0': null,
    borderRadius: '5px',
    padding: '6px 16px',
    border: 'none',
    display:'inline-block',
    fontSize: '16px',
    fontSeight: '400',
    lineSeight: '24px',
    marginTop: '28px',
    marginBottom: '28px',
    visibility: existance ? "visible":"hidden"
}

const navigateTo = () => {
    if(existance){
    navigate(path)
    }
}
    return (
        <button style={btnStyle} onClick={navigateTo}>
        {props.children}
        </button>
    )
}

export default NextandPreviousBtn