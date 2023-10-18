const buttons = document.getElementsByClassName('button');

// Button mouse enter
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('mouseenter', event => {
    if (app.theme === 'light') {
      buttons[i].style.backgroundColor = '#eee';
      buttons[i].style.borderColor = '#d0d0d0';
    } else {
      buttons[i].style.backgroundColor = '#3e3e3e';
      buttons[i].style.borderColor = '#5e5e5e';
    }
  }
  );
}

// Button mouse leave
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('mouseleave', event => {
    if (app.theme === 'light') {
      buttons[i].style.backgroundColor = '#fff';
      buttons[i].style.borderColor = '#e0e0e0';
    } else {
      buttons[i].style.backgroundColor = '#2e2e2e';
      buttons[i].style.borderColor = '#4e4e4e';
    }
  }
  );
}

// Button mouse down
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('mousedown', event => {
    if (app.theme === 'light') {
      buttons[i].style.backgroundColor = '#ddd';
      buttons[i].style.borderColor = '#c0c0c0';
    } else {
      buttons[i].style.backgroundColor = '#4e4e4e';
      buttons[i].style.borderColor = '#6e6e6e';
    }
  }
  );
}

// Button mouse up
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('mouseup', event => {
    if (app.theme === 'light') {
      buttons[i].style.backgroundColor = '#eee';
      buttons[i].style.borderColor = '#d0d0d0';
    } else {
      buttons[i].style.backgroundColor = '#3e3e3e';
      buttons[i].style.borderColor = '#5e5e5e';
    }
  }
  );
}