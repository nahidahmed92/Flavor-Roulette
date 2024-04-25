// DEPENDENCIES ======================================
const container = document.querySelector('.containerCard');
const randomBtn = document.querySelector('#randomNumBtn');
const resetBtn = document.querySelector('#resetBtn');
const clearBtn = document.querySelector('#clearStorage');
const confirmBtn = document.querySelector('#confirmMixBtn');
const flavorForm = document.getElementById('flavorForm');
const flavorOne = document.getElementById('flavorOne');
const flavorTwo = document.getElementById('flavorTwo');
const flavorThree = document.getElementById('flavorThree');
const flavorFour = document.getElementById('flavorFour');

// DATA ==============================================
let flavorMix = JSON.parse(localStorage.getItem('arrayMix')) || [];

// Initialize array to match the length of flavorMix
let array = Array.from({ length: flavorMix.length }, (_, index) => (index + 1).toString());
array = JSON.parse(localStorage.getItem('arrayNum')) || array;

// Ensure that flavorMix is an empty array if it's null (when there's no data in localStorage)
// if (!flavorMix) {
//   flavorMix = [];
// }

if (array.length === 0) {
  console.log('no data in array');
  // Otherwise, initialize the array
  // Initialize the array to match the length of flavorMix
  array = Array.from({ length: flavorMix.length }, (_, index) => (index + 1).toString());
  // Store the initial array in localStorage
  localStorage.setItem('arrayNum', JSON.stringify(array));
}

if (array.length === 0 && flavorMix.length === 0) {
  clearBtn.style.display = 'none';
} else {
  clearBtn.style.display = '';
}

// FUNCTIONS =========================================
function flavors(event) {
  event.preventDefault();

  // Create an empty mix object
  const mix = {};

  const flavor1 = flavorOne.value.trim();
  const flavor2 = flavorTwo.value.trim();
  const flavor3 = flavorThree.value.trim();
  const flavor4 = flavorFour.value.trim();

  // Check if each flavor is not empty, and add it to the mix object if not
  if (flavor1 !== '') {
    mix.flavor1 = capitalizeFirstLetter(flavorOne.value.trim());
  }
  if (flavor2 !== '') {
    mix.flavor2 = capitalizeFirstLetter(flavorTwo.value.trim());
  }
  if (flavor3 !== '') {
    mix.flavor3 = capitalizeFirstLetter(flavorThree.value.trim());
  }
  if (flavor4 !== '') {
    mix.flavor4 = capitalizeFirstLetter(flavorFour.value.trim());
  }

  // Check if the mix object is not empty, then push it to the array and store it in local storage
  if (Object.keys(mix).length !== 0) {
    flavorMix.push(mix);
    localStorage.setItem('arrayMix', JSON.stringify(flavorMix));

    // Update array to match the length of flavorMix
    array = Array.from({ length: flavorMix.length }, (_, index) => (index + 1).toString());
    localStorage.setItem('arrayNum', JSON.stringify(array));
  }

  // Reset card content
  let cardContent = '';

  // Select all boxes
  const boxes = document.querySelectorAll('.box');

  for (let i = 0; i < flavorMix.length; i++) {
    const mix = flavorMix[i];
    const number = i + 1;

    let dataText = '';
    // Iterate over the keys of the mix object
    for (const key in mix) {
      if (mix.hasOwnProperty(key)) {
        dataText += mix[key] + '<br/>'; // Append each flavor to dataText
      }
    }
    // Set the data-text attribute for the current box
    cardContent += `<div class="box" data-number="${number}" data-state="hidden" data-text="${dataText}">${number}</div>`;
  }

  container.innerHTML = cardContent;
  flavorForm.reset();
}

function getRandomAndRemove() {
  // Check if array still has elements
  if (array.length > 0) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomNum = array[randomIndex];
    // Remove the element at the random index
    array.splice(randomIndex, 1);

    // Update the array in localStorage
    localStorage.setItem('arrayNum', JSON.stringify(array));

    // Display the selected box
    const hiddenBoxes = document.querySelectorAll('.box[data-state="hidden"]');
    if (hiddenBoxes.length > 0) {
      let eligibleBoxes = [];
      hiddenBoxes.forEach((box) => {
        if (box.textContent !== '❌') {
          eligibleBoxes.push(box);
        }
      });

      if (eligibleBoxes.length > 0) {
        const randomBox = eligibleBoxes[Math.floor(Math.random() * eligibleBoxes.length)];
        const text = randomBox.getAttribute('data-text');
        randomBox.innerHTML = text;
        randomBox.dataset.state = 'visible';
      } else {
        console.log('All eligible boxes are marked with ❌');
      }
    } else {
      console.log('All boxes are visible');
    }

    // Call the flavors function
    flavors();
  } else {
    alert('Make new bowls 😎');
  }
}

// Function to capitalize the first letter of each word
function capitalizeFirstLetter(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

function clear(event) {
  event.preventDefault();
  localStorage.clear();
  flavorMix = [];
  array = [];
  location.reload();
}

// Adjust font size based on text length
// function adjustFontSize() {
//   const boxes = document.querySelectorAll('.box');
//   boxes.forEach((box) => {
//     const textLength = box.textContent.length;
//     const maxWidth = parseFloat(window.getComputedStyle(box).width); // Get the width of the box
//     let fontSize = 38; // Default font size

//     if (textLength > 10) {
//       // Adjust this threshold based on your design
//       fontSize = Math.floor((maxWidth / textLength) * 1.8); // Adjust the factor based on your design
//     }

//     box.style.fontSize = `${fontSize}px`; // Set the font size
//   });
// }

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

randomBtn.addEventListener('click', getRandomAndRemove);

resetBtn.addEventListener('click', function () {
  // Reset the array to match the length of flavorMix
  const array = Array.from({ length: flavorMix.length }, (_, index) => (index + 1).toString());
  // Store the reset array in localStorage
  localStorage.setItem('arrayNum', JSON.stringify(array));

  // Optionally, you can also reload the page to reflect the changes immediately
  location.reload();
});

flavorForm.addEventListener('submit', flavors);
clearBtn.addEventListener('click', clear);
confirmBtn.addEventListener('click', function () {
  location.reload();
});

// window.addEventListener('resize', adjustFontSize);

// INITIALIZATION ====================================
// load flavors to data-text attribute
window.onload = flavors;
