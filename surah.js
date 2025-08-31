(async function(){
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id')||'0',10);
  const titleEl = document.getElementById('suraTitle');
  const pageTitle = document.getElementById('pageTitle');
  const ayaList = document.getElementById('ayaList'); 
  const loading = document.getElementById('loading');
  const favBtn = document.getElementById('favBtn');
  const tafsirContainer = document.getElementById("tafsirContainer");

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

  // تفسير ابن كثير لسورة الفاتحة
  const tafsir = {
    1: {
      1: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ: يقال لها الفاتحة، أي فاتحة الكتاب خطًّا، وبها تفتح القراءة في الصلاة، ويقال لها أيضًا أم الكتاب عند الجمهور.",
      2: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ: الشكر لله خالصًا دون سائر ما يُعبد من دونه، وبما أنعم على عباده من النعم التي لا يحصيها العدد.",
      3: "الرَّحْمَٰنِ الرَّحِيمِ: اسمان مشتقان من الرحمة على وجه المبالغة، و{رَحْمَٰن} أشد مبالغة من {رَحِيم}.",
      4: "مَالِكِ يَوْمِ الدِّينِ: مالك يوم الجزاء، وهو يوم القيامة، الذي يجزي فيه الله كل نفس بما كسبت.",
      5: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ: نخلص لك العبادة، ولا نطلب العون إلا منك، وهذا هو كمال الطاعة.",
      6: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ: دلنا على الطريق الواضح الذي لا اعوجاج فيه.",
      7: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ: طريق الذين أنعمت عليهم من النبيين والصديقين والشهداء والصالحين.",
      8: "غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ: غير الذين غضبت عليهم من اليهود، ولا الذين ضلوا من النصارى."
    }
  };

  // إنشاء القالب بدون مسح التفسيرات الموجودة
  const suraData = Array.from({length: 114}, (_, i) => ({id: i+1, ayahCount: 7}));
  suraData.forEach(s => {
    if (!tafsir[s.id]) tafsir[s.id] = {};
    for (let i = 1; i <= s.ayahCount; i++) {
      if (!tafsir[s.id][i]) tafsir[s.id][i] = "";
    }
  });

  if(!id || id<1 || id>114){
    titleEl.textContent = 'سورة غير صحيحة';
    loading.textContent = 'لم يتم تحديد سورة صحيحة.';
    return;
  }

  titleEl.textContent = `${suraNames[id-1]} — سورة رقم ${id}`;
  pageTitle.textContent = `${suraNames[id-1]} - المصحف`;

  // زر تفسير السورة كاملة
  const fullTafsirBtn = document.createElement('button');
  fullTafsirBtn.textContent = "تفسير السورة كاملة";
  fullTafsirBtn.className = "btn";
  pageTitle.parentNode.insertBefore(fullTafsirBtn, pageTitle.nextSibling);

  fullTafsirBtn.addEventListener('click', ()=>{
    if(!tafsir[id]){
      alert("لم يتم إضافة تفسير لهذه السورة بعد.");
      return;
    }
    let output = `<h3>تفسير سورة ${suraNames[id-1]}</h3>`;
    for(let ayah in tafsir[id]){
      output += `<p><strong>آية ${ayah}:</strong> ${tafsir[id][ayah]}</p>`;
    }
    tafsirContainer.innerHTML = output;
  });

  // باقي الكود لجلب الآيات كما هو
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

      const selected = JSON.parse(localStorage.getItem('selectedAyat')||'[]');
      const ayahOptions = document.createElement("div");
      ayahOptions.className = "ayah-options";
      ayahOptions.style.position = "absolute";
      ayahOptions.style.display = "none";
      ayahOptions.style.flexDirection = "column";
      ayahOptions.style.background = "#0f1a2a";
      ayahOptions.style.padding = "10px";
      ayahOptions.style.borderRadius = "8px";
      ayahOptions.style.boxShadow = "0 2px 6px rgba(0,0,0,0.5)";
      ayahOptions.innerHTML = `
        <button id="ayahFavBtn" class="btn">☆ مفضلة</button>
        <button id="ayahTafsirBtn" class="btn">تفسير الآية</button>
        <button id="ayahAudioBtn" class="btn">استماع</button>
      `;
      document.body.appendChild(ayahOptions);
      let selectedAyah = null;

      ayahs.forEach(a=>{
        const span = document.createElement('span');
        span.className = 'ayah uthmani';
        span.innerHTML = `${a.text} <span class="ayaNum">${a.numberInSurah}</span>`;
        if(selected.find(s => s.surah === id && s.ayah === a.numberInSurah)){
          span.classList.add('selected');
        }
        span.addEventListener('click', (e)=>{
          e.stopPropagation();
          selectedAyah = span;
          const rect = span.getBoundingClientRect();
          ayahOptions.style.top = window.scrollY + rect.bottom + "px";
          ayahOptions.style.left = window.scrollX + rect.left + "px";
          ayahOptions.style.display = "flex";
          const favBtnOpt = document.getElementById("ayahFavBtn");
          favBtnOpt.textContent = span.classList.contains("selected") ? "إزالة من المفضلة" : "إضافة للمفضلة";
        });
        ayaList.appendChild(span);
      });

      document.getElementById("ayahFavBtn").addEventListener("click", ()=>{
        if(!selectedAyah) return;
        const ayahNum = parseInt(selectedAyah.querySelector(".ayaNum").textContent,10);
        let updated = JSON.parse(localStorage.getItem('selectedAyat')||'[]');
        const index = updated.findIndex(s=>s.surah===id && s.ayah===ayahNum);
        if(index>=0){
          updated.splice(index,1);
          selectedAyah.classList.remove("selected");
        } else {
          updated.push({surah:id, ayah:ayahNum});
          selectedAyah.classList.add("selected");
        }
        localStorage.setItem("selectedAyat", JSON.stringify(updated));
        ayahOptions.style.display = "none";
      });

      document.getElementById("ayahTafsirBtn").addEventListener("click", ()=>{
        if(!selectedAyah) return;
        const ayahNum = parseInt(selectedAyah.querySelector(".ayaNum").textContent,10);
        if(tafsir[id] && tafsir[id][ayahNum]){
          alert(`تفسير الآية ${ayahNum}:\n\n${tafsir[id][ayahNum]}`);
        } else {
          alert(`لم يتم إضافة تفسير لهذه الآية بعد.`);
        }
        ayahOptions.style.display = "none";
      });

      document.getElementById("ayahAudioBtn").addEventListener("click", ()=>{
        if(!selectedAyah) return;
        const ayahNum = parseInt(selectedAyah.querySelector(".ayaNum").textContent,10);
        const audio = new Audio(`audio/sura${id}_ayah${ayahNum}.mp3`);
        audio.play();
        ayahOptions.style.display = "none";
      });

      document.addEventListener("click", (e)=>{
        if(!ayahOptions.contains(e.target) && !e.target.classList.contains("ayah")){
          ayahOptions.style.display = "none";
        }
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
