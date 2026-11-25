(function(){
  var VIDEO_ID='gv7hcXCnjOw';
  var root=document.createElement('div');
  root.className='music-player';
  root.innerHTML=
    '<button type="button" class="mp-fab" aria-label="Abrir reproductor de música" aria-expanded="false"><span class="mp-eq" aria-hidden="true"><i></i><i></i><i></i></span><span class="mp-fab-icon" aria-hidden="true">♪</span></button>'+
    '<div class="mp-panel" role="dialog" aria-label="Música de fondo">'+
      '<div class="mp-head"><span class="mp-title">♪ Música de fondo</span><button type="button" class="mp-min" aria-label="Minimizar reproductor">–</button></div>'+
      '<div class="mp-video"><div id="mpYT"></div></div>'+
      '<div class="mp-controls">'+
        '<button type="button" class="mp-play" aria-label="Reproducir">▶</button>'+
        '<label class="mp-vol"><span aria-hidden="true">🔊</span><input type="range" min="0" max="100" value="40" aria-label="Volumen"></label>'+
      '</div>'+
      '<p class="mp-status">Pulsa ▶ para iniciar la música.</p>'+
    '</div>';
  document.body.appendChild(root);

  var fab=root.querySelector('.mp-fab'),minBtn=root.querySelector('.mp-min'),
      playBtn=root.querySelector('.mp-play'),vol=root.querySelector('.mp-vol input'),
      status=root.querySelector('.mp-status'),player=null,ready=false,pending=false;

  function setOpen(open){root.classList.toggle('open',open);fab.setAttribute('aria-expanded',String(open));}
  fab.addEventListener('click',function(){setOpen(!root.classList.contains('open'));});
  minBtn.addEventListener('click',function(){setOpen(false);});

  function setPlaying(p){
    root.classList.toggle('playing',p);
    playBtn.textContent=p?'❚❚':'▶';
    playBtn.setAttribute('aria-label',p?'Pausar':'Reproducir');
    status.textContent=p?'Reproduciendo…':'En pausa.';
  }
  playBtn.addEventListener('click',function(){
    if(!ready){pending=true;status.textContent='Cargando…';return;}
    var s=player.getPlayerState();
    if(s===1||s===3)player.pauseVideo();else player.playVideo();
  });
  vol.addEventListener('input',function(){if(ready){player.setVolume(+vol.value);if(+vol.value>0)player.unMute();}});

  var prev=window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady=function(){
    if(prev)prev();
    player=new YT.Player('mpYT',{
      videoId:VIDEO_ID,width:'100%',height:'100%',
      playerVars:{loop:1,playlist:VIDEO_ID,controls:0,modestbranding:1,rel:0,playsinline:1},
      events:{
        onReady:function(){ready=true;player.setVolume(+vol.value);if(pending){pending=false;player.playVideo();}},
        onStateChange:function(e){if(e.data===1)setPlaying(true);else if(e.data===2||e.data===0)setPlaying(false);},
        onError:function(){status.textContent='No se pudo cargar el video.';}
      }
    });
  };
  var tag=document.createElement('script');
  tag.src='https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
})();
