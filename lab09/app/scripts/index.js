// Put your JavaScript code here (rather than in the HTML file).
// tutorial8.js
import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

import '../css/base.css';
import CommentBox from './commentBox.js'

var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

ReactDOM.render(
<CommentBox url="/api/comments" pollInterval={2000} />,
document.getElementById('content')
);
