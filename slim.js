// Hash for tagging the div
var hash_inner=hash + Math.round(Math.random()*1000)
document.write('<div id="'+hash_inner+'">a</div>');

if (!window.cm_git_hub)
	window.cm_git_hub=[];
window.cm_git_hub.push([hash_inner, link, raw_content]);

if(!document.querySelector('#cm_git_hub_script'))
{
  document.write('<script id="cm_git_hub_script" src="__HOST__/script.min.gcc.js"></script>');
} else if(window.cm_git_hub_refresh)
{
	window.cm_git_hub_refresh();
}