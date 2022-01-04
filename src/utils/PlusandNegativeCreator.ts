const plusBtnStyle = `color:white;border:none;border-Top-Left-Radius:10px;border-Bottom-Left-Radius : 10px;background-Color : #27b376;`
const negativeBtnStyle = `color:white;border:none;border-Bottom-Right-Radius : 10px;border-Top-Right-Radius : 10px;background-Color : #bf212f;`
export const makeZoombtns = () => {
    const Fontsizes = ["16px","18px","20px"] 
    const codeTags = document.getElementsByTagName("pre")

    for(let i = 0 ; i < codeTags.length ; i++ ){
      // console.log(codeTags.item(i).id)
      if(codeTags.item(i).id){return} 
      // if( codeTags.item(i).className == 'language-text' ){return}
      console.log(codeTags.item(i).className)
      codeTags.item(i).id = i.toString()
      const btnHolder = document.createElement("div")
      const plusbtn = document.createElement("button")
      const negativebtn = document.createElement("button")
      plusbtn.style.cssText = plusBtnStyle
      negativebtn.style.cssText = negativeBtnStyle
      btnHolder.style.float = "right"
      plusbtn.innerText = "+";
      negativebtn.innerText ="-"
      codeTags.item(i).style.fontSize = "16px"
      plusbtn.addEventListener("click",(e)=>{
        const size = codeTags.item(i).style.fontSize 
        // console.log(size)
        const currentSize =  Fontsizes.findIndex((element)=> {return element == size})
        // console.log(currentSize)
        codeTags.item(i).style.fontSize =  Fontsizes[currentSize + 1] 
      })
      negativebtn.addEventListener("click",(e)=>{
        const size = codeTags.item(i).style.fontSize 
        // console.log(size)
        const currentSize =  Fontsizes.findIndex((element)=> {return element == size})
        // console.log(currentSize)
        codeTags.item(i).style.fontSize =  Fontsizes[currentSize - 1] 

      })
      btnHolder.appendChild(plusbtn)
      btnHolder.appendChild(negativebtn)
      codeTags.item(i).appendChild(btnHolder) 
    }

  }