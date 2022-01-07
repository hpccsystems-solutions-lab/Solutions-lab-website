export const makeCopyBtn = () => {
    const codeTags = document.getElementsByTagName("pre")
    let unchangedTags = []
    const copyIcon = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20"><path fill="#5a7197" d="M13.968 3.76l-2.976-2.96c-0.256-0.256-0.576-0.385-0.928-0.385l-4.895-0.016c0 0 0 0 0 0-0.352 0-0.689 0.144-0.944 0.385-0.239 0.256-0.385 0.592-0.385 0.944v0.88h-0.88c-0.352 0-0.688 0.144-0.944 0.385s-0.385 0.576-0.385 0.944v10.352c0 0.736 0.592 1.327 1.327 1.327h7.872c0.736 0 1.327-0.592 1.327-1.327v-0.88h0.88c0.736 0 1.327-0.592 1.327-1.327v-7.377c-0.016-0.352-0.144-0.689-0.399-0.944zM10.752 1.76l2.24 2.24h-2.016c-0.112 0-0.225-0.096-0.225-0.224v-2.016zM11.296 14.272c0 0.256-0.208 0.464-0.464 0.464h-7.856c-0.256 0-0.464-0.208-0.464-0.464v-10.352c0-0.128 0.048-0.239 0.144-0.32 0.081-0.096 0.208-0.144 0.32-0.144h0.88v8.608c0 0.736 0.592 1.327 1.327 1.327h6.129v0.88zM13.040 12.544h-7.872c-0.256 0-0.464-0.208-0.464-0.464v-10.352c0-0.128 0.048-0.239 0.144-0.336 0.079-0.081 0.208-0.128 0.32-0.128 0 0 0 0 0 0l4.72 0.016v2.528c0 0.592 0.48 1.072 1.072 1.072h2.528v7.2c0.016 0.256-0.192 0.464-0.448 0.464z"></path></svg>`
    const doneIcon = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20"><path fill="#00FF00" d="M13.968 3.76l-2.976-2.96c-0.256-0.256-0.576-0.385-0.928-0.385l-4.895-0.016c0 0 0 0 0 0-0.352 0-0.689 0.144-0.944 0.385-0.239 0.256-0.385 0.592-0.385 0.944v0.88h-0.88c-0.352 0-0.688 0.144-0.944 0.385s-0.385 0.576-0.385 0.944v10.352c0 0.736 0.592 1.327 1.327 1.327h7.872c0.736 0 1.327-0.592 1.327-1.327v-0.88h0.88c0.736 0 1.327-0.592 1.327-1.327v-7.377c-0.016-0.352-0.144-0.689-0.399-0.944zM10.752 1.76l2.24 2.24h-2.016c-0.112 0-0.225-0.096-0.225-0.224v-2.016zM11.296 14.272c0 0.256-0.208 0.464-0.464 0.464h-7.856c-0.256 0-0.464-0.208-0.464-0.464v-10.352c0-0.128 0.048-0.239 0.144-0.32 0.081-0.096 0.208-0.144 0.32-0.144h0.88v8.608c0 0.736 0.592 1.327 1.327 1.327h6.129v0.88zM13.040 12.544h-7.872c-0.256 0-0.464-0.208-0.464-0.464v-10.352c0-0.128 0.048-0.239 0.144-0.336 0.079-0.081 0.208-0.128 0.32-0.128 0 0 0 0 0 0l4.72 0.016v2.528c0 0.592 0.48 1.072 1.072 1.072h2.528v7.2c0.016 0.256-0.192 0.464-0.448 0.464z"></path></svg>`
    for(let i = 0 ; i < codeTags.length ; i++ ){
        // to avoid rerendering and duplicating the copybutton svg icon.
        if(codeTags.item(i).innerHTML.includes('svg')){
            return
        }
    const copyBtn = document.createElement("svg")
    const BtnHolder = document.createElement("div")
    copyBtn.style.float="right"
    copyBtn.innerHTML = copyIcon
    copyBtn.addEventListener("click",(e)=>{
      navigator.clipboard.writeText(codeTags.item(i).innerText)
      copyBtn.innerHTML= doneIcon
      setTimeout(() => {
        copyBtn.innerHTML= copyIcon
      }, 2000);
    })
    
    BtnHolder.appendChild(copyBtn)
      if(codeTags.item(i).id){
        unchangedTags.push(codeTags.item(i).id)
      }else{
        codeTags.item(i).insertBefore(BtnHolder,codeTags.item(i).firstChild)
      }
     
    }
    console.log(unchangedTags)

  }