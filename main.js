/* Globals */

// these pages are all from the same HTML file
const combinedPages = ['home', 'gallery', 'projects']
const allPages = [...combinedPages, 'devlogs']

/* Navigation */

function startup(page) {
  if (combinedPages.indexOf(page) > -1) {
    combinedPages.forEach(c => {
      const el = document.getElementsByClassName(c)[0];
      el.className = [c, (c === page ? 'active' : 'hidden')].join(' ');
    });
  }

  if (page === 'home') {
    document.getElementById('sidenav').className = 'hidden';
  } else {
    allPages.forEach(c => {
      const el = document.getElementById(`nav-${c}`)
      if (el) {
        el.className = c === page ? 'active': ''; 
      }
    });
  }
}

startup(getPageName() || 'home');

/* Utils */

function getPageName() {
  return window.location.pathname.substr(1).split('/')[0].replace('.html', '')
}

/* Load Resources */

fetch('/css/main.css')
  .then(r => r.text())
  .then(text => {
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
        const l = ls.shift() + '\n';
        style.textContent += l; 
        pre.textContent += l;
        setTimeout(() => write(ls), 250/Math.floor((len - ls.length)/3));
      }
    };
    if (window.location.pathname == '/') {
      write(lines);
    } else {
      style.textContent = lines.join('\n');
      write([]);
    }
  });

if (getPageName() == 'projects') {
  fetch('/projects.json')
    .then(r => r.json())
    .then(data => {
      const projects = document.getElementById('project-list');
      data.map(p => {
        const el = document.createElement('li');
        el.innerHTML = (p.link ? (
          '<a class="project" rel="noreferrer" href="'+p.link+'" '+(p.link[0] === '/' ? '' : 'target="_blank"')+'>'+
            '<div class="title">'+p.title+'</div>'+
            '<p class="desc">'+p.desc+'</p>'+
            '<div class="pos">'+p.pos+'</div>'+
          '</a>') : (
          '<div class="project">'+
            '<div class="title">'+p.title+'</div>'+
            '<p class="desc">'+p.desc+'</p>'+
            '<div class="pos">'+p.pos+'</div>'+
          '</div>'));
        projects.appendChild(el);
      });
    });
}


if (getPageName() == 'gallery') {
  fetch("/gallery.json")
    .then(r => r.json())
    .then(data => {
      const albums = document.getElementsByClassName('albums')[0];
      Object.keys(data).map((k,i) => {
        const wrap = document.createElement('div');
        wrap.innerHTML = '<div class="label">'+k+'</div>';
        const list = document.createElement('ul');
        data[k].map((f,j) => {
          const btn = document.createElement('div');
          btn.innerHTML = '<input type="radio" name="fullscreen" id="'+(i+'.'+j)+'"/>';
          const item = document.createElement('li');
          item.innerHTML = ('<span><img src="'+("https://photos.rudraraju.xyz/file/srpf-media/images/gallery/"+k+"/"+f.file)+'"/><span>'+f.desc+'</span></span>'+
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
}
