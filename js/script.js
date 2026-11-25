const pages=[...document.querySelectorAll('.page')];const navs=[...document.querySelectorAll('[data-nav]')];const sidebar=document.getElementById('sidebar');const toggle=document.getElementById('menuToggle');
function route(){const id=location.hash.replace('#','')||'inicio';const valid=pages.some(p=>p.id===id)?id:'inicio';pages.forEach(p=>p.classList.toggle('active',p.id===valid));navs.forEach(a=>{const active=a.getAttribute('href')==='#'+valid;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});sidebar.classList.remove('open');toggle.setAttribute('aria-expanded','false');window.scrollTo(0,0)}window.addEventListener('hashchange',route);route();toggle.addEventListener('click',()=>{const open=sidebar.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});
document.querySelectorAll('[data-flip]').forEach(card=>card.addEventListener('click',()=>{const open=card.getAttribute('aria-pressed')!=='true';card.setAttribute('aria-pressed',String(open));card.querySelector('.flip-front').hidden=open;card.querySelector('.flip-back').hidden=!open}));
const terms=[...document.querySelectorAll('[data-term]')];terms.forEach(t=>t.addEventListener('click',()=>t.classList.toggle('selected')));document.getElementById('checkTerms').addEventListener('click',()=>{const correct=terms.filter(t=>t.dataset.correct==='true'&&t.classList.contains('selected')).length;const wrong=terms.filter(t=>t.dataset.correct==='false'&&t.classList.contains('selected')).length;const msg=document.getElementById('termFeedback');msg.textContent=correct===3&&wrong===0?'¡Excelente! Identificaste las tres expresiones clave.':`Identificaste ${correct} de 3 expresiones clave${wrong?`, y seleccionaste ${wrong} distractor(es)`:''}. Revisa cuáles expresan comprensión, selección y organización.`});document.getElementById('resetTerms').addEventListener('click',()=>{terms.forEach(t=>t.classList.remove('selected'));document.getElementById('termFeedback').textContent=''});
const slider=document.getElementById('compareSlider');slider.addEventListener('input',()=>{document.getElementById('compareValue').textContent=slider.value+'%';document.getElementById('organizedSide').style.opacity=String(.25+.75*Number(slider.value)/100)});
const techniques={cornell:{title:'Método Cornell',description:'Divide la hoja en tres zonas: una columna para preguntas o pistas, un espacio amplio para las notas y un resumen al final.',example:'Ejemplo — Tema: fotosíntesis. Pista: «¿Qué necesita una planta?». Notas: luz, agua y dióxido de carbono. Resumen: las plantas producen nutrientes mediante la fotosíntesis.'},esquemas:{title:'Esquemas',description:'Organiza la información jerárquicamente usando un título, ideas principales y detalles subordinados.',example:'Ejemplo — Ecosistemas → componentes → seres vivos (plantas, animales) y elementos no vivos (agua, suelo).'},mapas:{title:'Mapas visuales',description:'Parte de una idea central y conéctala mediante palabras clave, flechas y relaciones visibles.',example:'Ejemplo — «Aprendizaje» al centro → se conecta con «comprender», «practicar» y «recordar».'}};const techDetail=document.getElementById('techDetail');function showTechnique(key){const t=techniques[key];const selectedImage=document.querySelector(`[data-tech="${key}"] .tech-art`).getAttribute("src");techDetail.innerHTML=`<div class="tech-detail-inner"><img src="${selectedImage}" alt="Representación visual de ${t.title}"><div><h2>${t.title}</h2><p>${t.description}</p><div class="example"><b>Ejemplo práctico:</b> ${t.example}</div></div></div>`;document.querySelectorAll('[data-tech]').forEach(b=>b.classList.toggle('selected',b.dataset.tech===key))}document.querySelectorAll('[data-tech]').forEach(b=>b.addEventListener('click',()=>showTechnique(b.dataset.tech)));showTechnique('cornell');

// Evaluación final: 10 preguntas, 3 unidades, calificación sobre 5 y feedback individual.
const questions = [
  {q:'¿Cuál es la finalidad de tomar apuntes de manera efectiva?',opts:['Copiar todas las palabras sin excepción.','Seleccionar y organizar la información más importante.','Escribir más rápido que los compañeros.','Anotar solo los títulos de la clase.'],answer:1,why:'Tomar apuntes significa seleccionar ideas relevantes y darles una estructura que favorezca la comprensión.'},
  {q:'¿Cuál es un error frecuente al tomar apuntes?',opts:['Usar palabras propias.','Distinguir ideas principales.','Copiar literalmente toda la explicación.','Organizar los contenidos por temas.'],answer:2,why:'Copiar todo de manera literal impide filtrar y procesar activamente la información.'},
  {q:'¿Qué es una idea principal?',opts:['Un ejemplo que complementa el texto.','El mensaje central del que trata el texto.','Una palabra repetida al azar.','Un dato secundario sin relación con el tema.'],answer:1,why:'La idea principal reúne el sentido central; las secundarias explican o amplían esa idea.'},
  {q:'¿Qué función cumplen las ideas secundarias?',opts:['Sustituir el tema del texto.','Explicar o complementar la idea principal.','Ocultar los conceptos clave.','Repetir el texto completo sin cambios.'],answer:1,why:'Las ideas secundarias aportan detalles, ejemplos o explicaciones relacionados con la idea principal.'},
  {q:'En un texto sobre reciclaje, ¿cuál sería una palabra clave adecuada?',opts:['Entonces.','Reciclaje.','Aunque.','Quizá.'],answer:1,why:'Una palabra clave representa un concepto esencial que ayuda a recuperar el tema.'},
  {q:'¿Cuál es la mejor forma de sintetizar una explicación?',opts:['Copiar todas las frases originales.','Eliminar palabras sin entender el texto.','Expresar las ideas centrales de forma breve y conectada.','Escribir solamente la primera frase.'],answer:2,why:'Sintetizar implica comprender, seleccionar y relacionar lo esencial, no recortar texto al azar.'},
  {q:'¿Qué técnica divide la hoja en preguntas o pistas, notas y resumen?',opts:['Mapa visual.','Método Cornell.','Copia literal.','Subrayado de todo el texto.'],answer:1,why:'El método Cornell organiza los apuntes en pistas o preguntas, notas principales y resumen.'},
  {q:'¿En qué técnica se utilizan títulos, subtítulos y niveles jerárquicos?',opts:['Esquema.','Método Cornell.','Transcripción literal.','Lista sin categorías.'],answer:0,why:'Los esquemas ordenan conceptos de lo general a lo específico mediante niveles.'},
  {q:'¿Qué caracteriza a un mapa visual?',opts:['Solo párrafos extensos sin relaciones.','Copiar todo en orden cronológico.','Conectar conceptos con líneas, flechas y palabras clave.','Escribir sin destacar ideas importantes.'],answer:2,why:'Los mapas visuales muestran relaciones entre conceptos mediante conexiones visibles.'},
  {q:'Durante una clase con mucha información, ¿qué estrategia facilita mejores apuntes?',opts:['Intentar transcribir cada palabra.','Ignorar los conceptos centrales.','Escuchar, identificar lo esencial y organizarlo con palabras propias.','Elegir detalles sin relación con la explicación.'],answer:2,why:'Una toma de apuntes efectiva combina atención, selección de información y organización personal.'}
];
const quizQuestions=document.getElementById('quizQuestions');
quizQuestions.innerHTML=questions.map((q,i)=>`<fieldset class="quiz-question"><legend>${i+1}. ${q.q}</legend>${q.opts.map((o,j)=>`<label><input type="radio" name="q${i}" value="${j}"> ${o}</label>`).join('')}<div class="quiz-explanation" id="explain${i}" hidden></div></fieldset>`).join('');
document.getElementById('quizForm').addEventListener('submit',e=>{
  e.preventDefault();let score=0;
  const answers=questions.map((q,i)=>{const item=document.querySelector(`input[name="q${i}"]:checked`);return item?Number(item.value):null});
  const out=document.getElementById('quizResult');
  if(answers.some(x=>x===null)){out.hidden=false;out.textContent=`Te faltan ${answers.filter(x=>x===null).length} pregunta(s) por responder. Completa la evaluación para recibir tu nota.`;return}
  questions.forEach((q,i)=>{const correct=answers[i]===q.answer;if(correct)score++;const el=document.getElementById('explain'+i);el.hidden=false;el.classList.toggle('incorrect',!correct);el.textContent=(correct?'✓ ¡Correcto! ':'✗ Respuesta incorrecta. La opción correcta es: «'+q.opts[q.answer]+'». ')+q.why});
  const grade=(score/questions.length*5).toFixed(1);
  out.hidden=false;out.innerHTML=`<span class="result-score">${grade} / 5.0</span><br>${score} de ${questions.length} respuestas correctas. ${score===10?'¡Excelente, dominas los conceptos!':score>=7?'¡Buen trabajo! Revisa las explicaciones para mejorar.':'Sigue practicando y repasa las lecciones para mejorar.'}`;
  out.scrollIntoView({behavior:'smooth',block:'center'});
});
document.getElementById('resetQuiz').addEventListener('click',()=>{document.getElementById('quizForm').reset();document.getElementById('quizResult').hidden=true;questions.forEach((_,i)=>{const el=document.getElementById('explain'+i);el.hidden=true;el.classList.remove('incorrect')})});

// Actividad 2: identificar principales y secundarias.
function attachSelectActivity(selector,checkId,resetId,feedbackId,successText,explanation){
  const fields=[...document.querySelectorAll(selector)], feedback=document.getElementById(feedbackId);
  document.getElementById(checkId).addEventListener('click',()=>{
    if(fields.some(f=>!f.value)){feedback.textContent='Selecciona una opción en cada fila antes de comprobar.';return}
    const score=fields.filter(f=>f.value===Object.values(f.dataset)[0]).length;
    feedback.textContent=score===fields.length?successText:`Acertaste ${score} de ${fields.length}. ${explanation}`;
    fields.forEach(f=>{f.classList.toggle('field-correct',f.value===Object.values(f.dataset)[0]);f.classList.toggle('field-wrong',f.value!==Object.values(f.dataset)[0])});
  });
  document.getElementById(resetId).addEventListener('click',()=>{fields.forEach(f=>{f.value='';f.classList.remove('field-correct','field-wrong')});feedback.textContent=''});
}
attachSelectActivity('[data-classify]','checkIdeas','resetIdeas','ideasFeedback','¡Perfecto! Diferenciaste la idea central de los detalles que la complementan.','La idea principal comunica el mensaje central; los detalles explican sus beneficios.');
attachSelectActivity('[data-match]','checkMatch','resetMatch','matchFeedback','¡Muy bien! Relacionaste correctamente las tres técnicas.','Recuerda: Cornell = preguntas/notas/resumen; esquema = jerarquías; mapa visual = conexiones.');

// Actividad 3: fichas seleccionables en orden. También funciona con teclado.
const orderPool=document.getElementById('orderPool');const orderAnswer=document.getElementById('orderAnswer');
let sequence=[];
function renderSequence(){orderAnswer.textContent=sequence.length?sequence.map((b,i)=>`${i+1}. ${b.textContent.trim()}`).join('   →   '):'Aquí aparecerá tu secuencia…'}
orderPool.querySelectorAll('[data-order]').forEach(tile=>tile.addEventListener('click',()=>{
  if(tile.disabled)return;sequence.push(tile);tile.disabled=true;tile.classList.add('used');renderSequence();document.getElementById('orderFeedback').textContent='';
}));
document.getElementById('checkOrder').addEventListener('click',()=>{
  const feedback=document.getElementById('orderFeedback');
  if(sequence.length!==3){feedback.textContent='Selecciona las tres fichas para completar la secuencia.';return}
  feedback.textContent=sequence.every((b,i)=>Number(b.dataset.order)===i+1)?'¡Excelente! Primero se evapora el agua, luego se forman las nubes y después cae la lluvia.':'El orden aún no es correcto. Pista: piensa en evaporación → condensación → precipitación.';
});
document.getElementById('resetOrder').addEventListener('click',()=>{sequence=[];orderPool.querySelectorAll('[data-order]').forEach(tile=>{tile.disabled=false;tile.classList.remove('used')});renderSequence();document.getElementById('orderFeedback').textContent=''});

// Actividad 5: reconocer un resumen útil sin exigir coincidencias exactas de escritura.
document.getElementById('checkSummary').addEventListener('click',()=>{
  const answer=document.querySelector('input[name="summary"]:checked');const feedback=document.getElementById('summaryFeedback');
  if(!answer){feedback.textContent='Elige una respuesta antes de comprobar.';return}
  feedback.textContent=answer.value==='1'?'¡Excelente síntesis! Conserva los tres aportes principales y su relación con el equilibrio ambiental.':answer.value==='0'?'Esa opción es demasiado general: omite las funciones centrales de los árboles.': 'Esta opción repite casi literalmente el texto. Sintetizar es expresar las ideas principales en una forma más breve y organizada.';
});
document.getElementById('resetSummary').addEventListener('click',()=>{document.querySelectorAll('input[name="summary"]').forEach(r=>r.checked=false);document.getElementById('summaryFeedback').textContent=''});


// V4 - Reproductores bajo demanda: el resto de la plataforma no requiere conexión.
// Los enlaces directos siempre están disponibles si YouTube bloquea la inserción en file://.
document.querySelectorAll('[data-video-play]').forEach((button) => {
  button.addEventListener('click', () => {
    const card=button.closest('[data-youtube]');
    const videoId=card?.dataset.youtube;
    const container=card?.querySelector('.video-embed-container');
    if (!videoId || !container) return;
    if (container.hidden === false) {
      const frame=container.querySelector('iframe');
      if(frame) frame.remove();
      container.hidden=true;
      button.innerHTML='<span aria-hidden="true">▶</span> Reproducir video';
      return;
    }
    if (!navigator.onLine) {
      button.textContent='Conéctate para ver el video';
      return;
    }
    const frame=document.createElement('iframe');
    frame.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(videoId)+'?autoplay=1&rel=0';
    frame.title='Reproductor de video explicativo de YouTube';
    frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen=true;
    frame.loading='lazy';
    frame.referrerPolicy='strict-origin-when-cross-origin';
    container.replaceChildren(frame);
    container.hidden=false;
    button.innerHTML='<span aria-hidden="true">■</span> Cerrar video';
    container.scrollIntoView({behavior:'smooth', block:'nearest'});
  });
});
