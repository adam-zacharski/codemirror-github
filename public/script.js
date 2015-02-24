// base cdn path
var cmv = '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/';

// track how many files are loaded
var loaded = 0;

// load the main CodeMirror script
var s = document.createElement('script');
s.id = 'cm_git_hub_script1';
s.type = 'text/javascript';
s.onload = doneCheck;
s.src = cmv + 'codemirror.min.js';
document.querySelector('head').appendChild(s);

function doneCheck()
{
  loaded++;
  if (loaded === 1) {

    var css_files = ['codemirror', 'theme/ambiance'];
    css_files.forEach(function(c) {
      var css = document.createElement('link');
      css.setAttribute('rel', 'stylesheet');
      css.setAttribute('type', 'text/css');
      css.setAttribute('href', cmv + c + '.min.css');
      css.onload = doneCheck;
      document.getElementsByTagName('head')[0].insertBefore(css,
          document.querySelector('head style'));
    });

    s = document.createElement('script');
    s.id = 'cm_git_hub_script2';
    s.type = 'text/javascript';
    s.onload = doneCheck;
    s.src = cmv + 'mode/javascript/javascript.min.js';
    document.querySelector('head').appendChild(s);
  } else if (loaded === 4) {
    handle_scripts();
  }
}



function handle(hash_inner, link, content) {
  var target = document.getElementById(hash_inner);

  target.innerHTML = '';

  CodeMirror(target, {
    value: content,
    mode: 'javascript',
    lineNumbers: true,
    viewportMargin: Infinity,
    readOnly: true});
}

function handle_scripts() {
  window.cm_git_hub.forEach(function(a) { handle(a[0], a[1], a[2])});
}

window.cm_git_hub_refresh = b;

