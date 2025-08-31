(async function(){
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id')||'0',10);
  const titleEl = document.getElementById('suraTitle');
  const pageTitle = document.getElementById('pageTitle');
  const ayaList = document.getElementById('ayaList'); 
  const loading = document.getElementById('loading');
  const favBtn = document.getElementById('favBtn');

  const suraNames = ["الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة",
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
  "المسد","الإخلاص","الفلق","الناس"];

  if(!id || id<1 || id>114){
    titleEl.textContent = 'سورة غير صحيحة';
    loading.textContent = 'لم يتم تحديد سورة صحيحة.';
    return;
  }
  titleEl.textContent = `${suraNames[id-1]} — سورة رقم ${id}`;
  pageTitle.textContent = `${suraNames[id-1]} - المصحف`;

  try{
    loading.textContent = 'جاري جلب الآيات...';
    const resp = await fetch(`https://api.alquran.cloud/v1/surah/${id}/quran-uthmani`);
    if(!resp.ok) throw new Error('HTTP ' + resp.status);
    const json = await resp.json();

    if(json && json.data && json.data.ayahs){
      const ayahs = json.data.ayahs;
      loading.style.display = 'none';
      ayaList.innerHTML = ''; 

      const firstText = (ayahs[0] && ayahs[0].text) ? ayahs[0].text : '';
      const hasBasmala = /بسم الله الرحمن الرحيم|﷽/.test(firstText);

      if(id !== 9 && !hasBasmala){
        const bsm = document.createElement('div');
        bsm.className = 'bismillah uthmani';
        bsm.textContent = '﷽';
        ayaList.appendChild(bsm);
      }

      // استرجاع التحديدات كلها
      const selected = JSON.parse(localStorage.getItem('selectedAyat')||'[]');

      ayahs.forEach(a=>{
        const span = document.createElement('span');
        span.className = 'ayah uthmani';
        span.innerHTML = `${a.text} <span class="ayaNum">${a.numberInSurah}</span>`;

        // هل هذه الآية متعلَّمة بالفعل؟
        if(selected.find(s => s.surah === id && s.ayah === a.numberInSurah)){
          span.classList.add('selected');
        }

        // عند الضغط على الآية
        span.addEventListener('click', ()=>{
          let updated = JSON.parse(localStorage.getItem('selectedAyat')||'[]');

          const index = updated.findIndex(s => s.surah === id && s.ayah === a.numberInSurah);

          if(index >= 0){
            // لو موجودة → نشيلها
            updated.splice(index,1);
            span.classList.remove('selected');
          } else {
            // لو مش موجودة → نضيفها
            updated.push({ surah:id, ayah:a.numberInSurah });
            span.classList.add('selected');
          }

          localStorage.setItem('selectedAyat', JSON.stringify(updated));
        });

        ayaList.appendChild(span);
      });

    } else {
      loading.innerHTML = 'لم نستطع جلب الآيات من المصدر، حاول لاحقًا.';
      console.error('Unexpected JSON', json);
    }
  } catch(err){
    loading.innerHTML = 'حدث خطأ أثناء جلب الآيات. تحقق من الاتصال أو جرّب لاحقًا.';
    console.error('Fetch error:', err);
  }

  favBtn.addEventListener('click', ()=>{
    const favs = JSON.parse(localStorage.getItem('favs')||'[]');
    if(!favs.includes(id)){ 
      favs.push(id); 
      localStorage.setItem('favs', JSON.stringify(favs)); 
      alert('تمت الإضافة للمفضلات'); 
    }
    else { alert('السورة موجودة مسبقًا في المفضلات'); }
  });

})();
