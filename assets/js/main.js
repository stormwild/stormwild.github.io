import React from 'react';
import ReactDOM from 'react-dom';
import 'scss/main.scss';
import codeURL from 'img/code.png';

//ReactDOM.render(<h1 className="title">Hellos World</h1>, document.getElementById('greeting'));

const img = document.createElement('img')
img.src = codeURL
img.style.backgroundColor = "#2B3A42"
img.style.padding = "20px"
img.width = 32
document.body.appendChild(img)
