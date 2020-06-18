var optionNodes = document.getElementsByClassName('option')
    function toggleDisplay(e){
      Array.from(optionNodes).forEach(parentNode => {
          Array.from(parentNode.childNodes)[1].classList.remove('dropdown-show')
        })
        e.target.nextSibling.classList.toggle("dropdown-show")
    }
    window.onclick = (e) => {
      if(!e.target.matches('.font-options-icon'))
      {
        Array.from(optionNodes).forEach(parentNode => {
          Array.from(parentNode.childNodes)[1].classList.remove('dropdown-show')
        })
      }
    }
    Array.from(document.getElementsByClassName('font-options-icon')).forEach(node => {
      node.addEventListener('click',toggleDisplay)
    })