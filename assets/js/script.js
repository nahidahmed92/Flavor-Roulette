// DEPENDENCIES ======================================
// the container that holds all of the clickable boxes
const container = document.querySelector('.container');

// DATA ==============================================

// FUNCTIONS =========================================
function flavors() {
  // Select all boxes
  const boxes = document.querySelectorAll('.box');

  const flavor1 = 'Twice the Ice<br/>Pineapple Guava<br/>Caribbean Nights';
  const flavor2 = `Lime Tea<br/>Twice the Ice<br/>Lime Spice Peach`;
  const flavor3 = 'Lime Tea<br/>Ice Acai Raspberry';
  const flavor4 = 'Green Mix<br/>Ice Orange';
  const flavor5 = 'Ice Grape<br/>Aloha Nights';
  const flavor6 = 'Nawar<br/>Aloha Nights<br/>Raspberry Lemon Roll';
  const flavor7 = 'Pink Lemon Drop<br/>Peppermint Shake<br/>Pink Lemon Drop';
  const flavor8 = 'P3<br/>Peppermint Shake';
  const flavor9 = 'Nawar<br/>Blue Dragon';

  // Loop through each box
  boxes.forEach((box) => {
    const number = box.textContent;

    // Set data-text based on the box number
    if (number === '1') {
      box.setAttribute('data-text', flavor1);
    } else if (number === '2') {
      box.setAttribute('data-text', flavor2);
    } else if (number === '3') {
      box.setAttribute('data-text', flavor3);
    } else if (number === '4') {
      box.setAttribute('data-text', flavor4);
    } else if (number === '5') {
      box.setAttribute('data-text', flavor5);
    } else if (number === '6') {
      box.setAttribute('data-text', flavor6);
    } else if (number === '7') {
      box.setAttribute('data-text', flavor7);
    } else if (number === '8') {
      box.setAttribute('data-text', flavor8);
    } else if (number === '9') {
      box.setAttribute('data-text', flavor9);
    }
  });
}

// USER INTERACTION ==================================
container.addEventListener('dblclick', function (event) {
  const element = event.target;

  if (element.matches('.box')) {
    const number = element.getAttribute('data-number');

    // get the text associated with the box
    const text = element.dataset.text;

    // get the state of the box
    const state = element.dataset.state;

    // is text already displayed?
    if (state === 'hidden') {
      // make it visible
      element.dataset.state = 'visible';

      // show the text
      element.innerHTML = text;
    } else {
      // display number
      element.textContent = '❌';
      // make it hidden
      element.dataset.state = 'hidden';
    }
  }
});

// INITIALIZATION ====================================
// load flavors to data-text attribute
window.onload = flavors;
