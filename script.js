/* script.js - ل index.html */
const suraNames = [
  "الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة",
  "يونس","هود","يوسف","الرعد","إبراهيم","الحجر","النحل","الإسراء","الكهف","مريم","طه",
  "الأنبياء","الحج","المؤمنون","النور","الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم",
  "لقمان","السجدة","الأحزاب","سبأ","فاطر","يس","الصافات","ص","الزمر","غافر",
  "فصلت","الشورى","الزخرف","الدخان","الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق",
  "الذاريات","الطور","النجم","القمر","الرحمن","الواقعة","الحديد","المجادلة","الحشر","الممتحنة",
  "الصف","الجمعة","المنافقون","التغابن","الطلاق","التحريم","الملك","القلم","الحاقة","المعارج",
  "نوح","الجن","المزمل","المدثر","القيامة","الإنسان","المرسلات","النبأ","النازعات","عبس",
  "التكوير","الإنفطار","المطففين","الإنشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر","البلد",
  "الشمس","الليل","الضحى","الشرح","التين","العلق","القدر","البينة","الزلزلة","العاديات",
  "القارعة","التكاثر","العصر","الهمزة","الفيل","قريش","الماعون","الكوثر","الكافرون","النصر",
  "المسد","الإخلاص","الفلق","الناس"
];

const list = document.getElementById('suraList');
const searchBox = document.getElementById('searchBox');
const progressFill = document.getElementById('progressFill');
const themeBtn = document.getElementById('themeBtn');
const moreBtn = document.getElementById('moreBtn');

function buildList(){
  list.innerHTML='';
  suraNames.forEach((name,i)=>{
    const item = document.createElement('div');
    item.className='sura-item';
    item.innerHTML = `<h3>${name}</h3><p>السورة رقم ${i+1}</p>`;
    item.addEventListener('click', ()=> location.href = `surah.html?id=${i+1}`);
    list.appendChild(item);
  });
}
buildList();

searchBox.addEventListener('input', e=>{
  const q = e.target.value.trim();
  Array.from(list.children).forEach((card, i)=>{
    card.style.display = suraNames[i].includes(q) ? 'block' : 'none';
  });
});

moreBtn.addEventListener('click', ()=> location.href='more.html');
themeBtn.addEventListener('click', ()=>{
  document.body.classList.toggle('light');
  themeBtn.textContent = document.body.classList.contains('light') ? '☀' : '☾';
});

/* progress: نحسب السور التي تم فتحها (محليًا) */
function updateProgress(){
  const viewed = JSON.parse(localStorage.getItem('viewed')||'[]');
  const pct = Math.min(100, Math.round(viewed.length / 114 * 100));
  progressFill.style.width = pct + '%';
}
updateProgress();

/* عند فتح صفحة السورة نقوم بتخزين id في viewed — هذا يتم في surah.js بعد التحميل */
function goBack() {
  window.history.back();
}






const files = [
  'ahadith1.json',
  'ahadith2.json',
  'ahadith3.json',
  'ahadith4.json',
  'ahadith5.json'
];

let ahadith = [];

files.forEach(file => {
  fetch(file)
    .then(response => response.json())
    .then(data => {
      ahadith = [...ahadith, ...data];
      renderAhadith();
    });
});

function renderAhadith() {
  // قم بعرض الأحاديث في الصفحة هنا
}






