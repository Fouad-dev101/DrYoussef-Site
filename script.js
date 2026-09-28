// scroll reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold:0.12 });
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// cursor-follow thumbnail on soins list
const thumb = document.getElementById('hoverThumb');
const thumbImg = document.getElementById('hoverThumbImg');
document.querySelectorAll('.soin-row').forEach(row=>{
  row.addEventListener('mouseenter', ()=>{
    thumbImg.src = row.dataset.img;
    thumb.classList.add('show');
  });
  row.addEventListener('mousemove', (e)=>{
    thumb.style.left = (e.clientX + 26) + 'px';
    thumb.style.top = (e.clientY - 65) + 'px';
  });
  row.addEventListener('mouseleave', ()=> thumb.classList.remove('show'));
});
thumbImg.addEventListener('error', ()=>{ thumb.classList.remove('show'); });

// testimonial rotator
const quotes = [
  { q:"Un cabinet impeccable et une vraie rigueur professionnelle. Le patient ressort pleinement satisfait, du premier au dernier rendez-vous.", m:"— PATIENT, GOOGLE AVIS" },
  { q:"Chaque étape du traitement est prise le temps d'être expliquée. Le soin reste doux même sur des interventions plus délicates.", m:"— PATIENT, GOOGLE AVIS" },
  { q:"Accueil chaleureux dès l'arrivée, cabinet moderne et propre. L'équipe met immédiatement à l'aise, même les plus anxieux.", m:"— PATIENT, GOOGLE AVIS" },
  { q:"Professionnalisme, gentillesse et patience — un accompagnement précis, du diagnostic jusqu'au dernier contrôle.", m:"— PATIENT, GOOGLE AVIS" }
];
const qText = document.getElementById('quoteText');
const qMeta = document.getElementById('quoteMeta');
const qDots = document.getElementById('quoteDots');
let qi = 0;
quotes.forEach((_,i)=>{
  const b = document.createElement('button');
  if(i===0) b.classList.add('active');
  b.addEventListener('click', ()=> setQuote(i));
  qDots.appendChild(b);
});
function setQuote(i){
  qi = i;
  qText.style.opacity = 0;
  setTimeout(()=>{
    qText.textContent = quotes[qi].q;
    qMeta.textContent = quotes[qi].m;
    qText.style.opacity = 1;
    [...qDots.children].forEach((d,idx)=> d.classList.toggle('active', idx===qi));
  }, 250);
}
qText.style.transition = 'opacity .25s ease';
setInterval(()=> setQuote((qi+1) % quotes.length), 5500);