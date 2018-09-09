const nav = (page) => {
  window.history.pushState({}, page, page);
  ['home', 'gallery', 'projects'].map(c => 
    document.getElementsByClassName(c)[0].className = c + (c === page ? " active" : " hidden")
  );
}
/*
if (window.location.origin === 'http://www.xyzprogramming.solutions' || window.location.origin === 'http://xyzprogramming.solutions') {
  document.querySelector('.center').className = "center logo";
  document.querySelector('.name.label').innerText = "xyz programming";
  document.querySelector('.links .label').innerText = "sachin rudraraju";
} else {
  document.querySelector('.center').className = "center profile";
}
*/

fetch("/styles.css").then(r => r.text()).then(text => {
  const lines = text.split('\n');
  const len = lines.length;
  const style = document.createElement('style');
  document.head.appendChild(style);
  const pre = document.createElement('pre');
  document.getElementsByClassName('container')[0].appendChild(pre);

  const write = (ls) => {
    if (ls.length === 0) {
      document.getElementById('pre').remove()
    } else {
      const l = ls.shift() + "\n";
      style.textContent += l; 
      pre.textContent += l;
      setTimeout(() => write(ls), 250/Math.floor((len - ls.length)/3));
    }
  };
  (window.location.pathname === "/" ? () => write(lines) : () => {style.textContent = lines.join("\n"); write([]);})();
  nav(window.location.pathname.substring(1) || "home");
});

fetch("/projects.json").then(r => r.json()).then(data => {
  const projects = document.getElementById('project-list');
  data.map(p => {
    const el = document.createElement('li');
    el.innerHTML = (
      '<a href="'+p.link+'" '+(p.link[0] === '/' ? '' : 'target="_blank"')+'>'+
        '<div class="title">'+p.title+'</div>'+
        '<p class="desc">'+p.desc+'</p>'+
        '<div class="pos">'+p.alt+'</div>'+
      '</a>');
    projects.appendChild(el);
  });
});

fetch("/gallery.json").then(r => r.json()).then(data => {
  const albums = document.getElementsByClassName('albums')[0];
  Object.keys(data).map((k,i) => {
    const wrap = document.createElement('div');
    wrap.innerHTML = '<div class="label">'+k+'</div>';
    const list = document.createElement('ul');
    data[k].map((f,j) => {
      const btn = document.createElement('div');
      btn.innerHTML = '<input type="radio" name="fullscreen" id="'+(i+'.'+j)+'"/>';
      const item = document.createElement('li');
      item.innerHTML = ('<span><img src="'+("/gallery/"+k+"/"+f.file)+'"/><span>'+f.desc+'</span></span>'+
        (j > 0 ? '<label class="prev" for="'+(i+'.'+(j-1))+'">&#x2039;</label>' : '')+
        (j < data[k].length - 1 ? '<label class="next" for="'+(i+'.'+(j+1))+'">&#x203a;</label>' : ''));
      const input = btn.firstChild;
      input.onchange = () => albums.className = "albums fullscreen";
      item.firstChild.onclick = () => input.click();
      list.appendChild(input);
      list.appendChild(item);
    })
    wrap.appendChild(list);
    albums.appendChild(wrap);
  });
  document.getElementsByClassName('close')[0].onclick = () => albums.className = "albums";
  document.onkeydown = (e) => {
    if (e.keyCode !== 37 && e.keyCode !== 39) return;
    const sp = document.querySelector('input:checked').id.split('.');
    const el = document.getElementById(sp[0]+'.'+(parseInt(sp[1]) + (e.keyCode === 37 ? -1 : 1)));
    if (el) el.click();
  };
});
