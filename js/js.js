'use strict'

let currentDate = new Date();
let month = currentDate.toLocaleString('ru', {month: 'long'});




document.querySelector(".day").innerHTML = currentDate.getDate();
document.querySelector(".month").innerHTML = changeMonthEnd(month);

document.querySelector('.position-text').addEventListener( 'keypress', function(event) { if (event.key == 'Enter') addPosition(); } );
document.querySelector(".add-position").addEventListener( "click", addPosition );
document.querySelector('.list').addEventListener('click', completePosition);
document.querySelector('.list').addEventListener('dblclick', deletePosition);




if (!localStorage.getItem('positions')) {
    localStorage.setItem('positions', JSON.stringify([]));
}

let positions = JSON.parse(localStorage.getItem('positions'));

positions.forEach(showPosition);




function changeMonthEnd(month) {

    if ( month.endsWith('т') ) month = month + 'а';
    else month = month.slice(0, -1) + 'я';
    return month;
}


function addPosition() { 

    if (chechkValue()) {
        createNewPosition();        
    } 
}


function chechkValue() {

    let value = document.querySelector(".position-text").value;
    return ( value == '' || !(/\S/.test( value )) ) ? false : true;
}


function createNewPosition() {

    let inputField = document.querySelector(".position-text");
    let position = new Position(inputField.value);
    
    positions.push(position);    
    localStorage.setItem('positions', JSON.stringify(positions));
    inputField.value = '';
    showPosition(position, (positions.length - 1));   
}


function Position(str) {

    this.value = str;
    this.isChecked = false;
}


function showPosition(item, index) {

    if (item) {

     document.querySelector(".list").innerHTML +=
     ` <li class="list__item">
         <input type="checkbox" class="indicator" id="position${index + 1}"
             data-position-number="${index}" ${ (item.isChecked) ? "checked" : '' }>
         <label class="custom-checkbox" for="position${index + 1}"></label>
         <span class="position">${item.value};</span>
         <button class="btn_close">Щелкните дважды чтобы удалить</button>
     </li>`; 
    } else {

     document.querySelector(".list").innerHTML = '';
    }   
 }


function completePosition(event) {

    let currentIndex = event.target.dataset.positionNumber;

    if ( currentIndex !== undefined ) {

        this.checked = true;
        positions[currentIndex].isChecked = true;
        localStorage.setItem('positions', JSON.stringify(positions));  
    }    
}


function deletePosition(event) {

    if (event.target.className == 'btn_close') {

        let currentPosition = event.target.offsetParent.querySelector('.indicator');
        let currentIndex = currentPosition.dataset.positionNumber;
    
        positions.splice(currentIndex, 1);
        document.querySelector('.list').innerHTML = '';        
        positions.forEach(showPosition);
    
        localStorage.setItem('positions', JSON.stringify(positions));
    }
}


