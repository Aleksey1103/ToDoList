'use strict'

let currentDate = new Date(),
    month = currentDate.toLocaleString('ru', {month: 'long'}),
    inputField = document.querySelector(".position-text"),
    positionList = document.querySelector('.list'),
    buttonAdd = document.querySelector(".add-position");




document.querySelector(".day").innerHTML = currentDate.getDate();
document.querySelector(".month").innerHTML = changeMonthEnd(month);




inputField.addEventListener( 'keypress', function(event) {
            if (event.key == 'Enter') addPosition();
        });
buttonAdd.addEventListener( "click", addPosition );
positionList.addEventListener('click', completePosition);
positionList.addEventListener('dblclick', deletePosition);




if (!localStorage.getItem('positions')) {
    localStorage.setItem('positions', JSON.stringify({}));
}

let positions = new Map( Object.entries(
    JSON.parse( localStorage.getItem('positions') ) ) );




positions.forEach(showPosition);




function changeMonthEnd(month) {

    if ( month.endsWith('т') ) month = month + 'а';
    else month = month.slice(0, -1) + 'я';
    return month;
}


function addPosition() {

    if (chechkValue(inputField.value)) {
        let position = new Position(inputField.value);

        inputField.value = '';
        showPosition(position);

        positions.set(position.value, position);
        addToLocalStorage();      

    } else {
        inputField.value = '';
    }
}


function chechkValue(value) {

    return value != '' && ( /\S/.test( value ) );
}


function Position(str) {

    this.value = str;
    this.isChecked = false;
}


function showPosition(item) {

    if (item) {

     document.querySelector(".list").innerHTML +=
     ` <li class="list__item">
        <input type="checkbox" class="indicator" ${ (item.isChecked) ? "checked" : '' }>         
        <label class="custom-checkbox"></label>
        <span class="value">${item.value}</span>;
        <button class="btn_close">Щелкните дважды чтобы удалить</button>
     </li>`;
    } else {

     positionList.innerHTML = '';
    }   
}


function addToLocalStorage() {
    localStorage.setItem('positions', JSON.stringify(Object.fromEntries(positions)));
}


function completePosition(event) {   

    if ( event.target.className == "custom-checkbox" ) {
        let listItem = event.target.parentElement;

        listItem.querySelector('.indicator').checked = true;

        positions.get(listItem.querySelector('.value').textContent).isChecked = true;
        addToLocalStorage();
 
    }    
}


function deletePosition(event) {

    if (event.target.className == 'btn_close') {
        let listItem = event.target.parentElement;

        positions.delete(listItem.querySelector('.value').textContent);
        addToLocalStorage();

        listItem.remove();
    }
}


