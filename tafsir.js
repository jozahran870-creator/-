document.addEventListener("DOMContentLoaded", async () => {
  const suraSelect = document.getElementById("suraSelect");
  const ayahInput = document.getElementById("ayahInput");
  const fetchBtn = document.getElementById("fetchBtn");
  const tafsirArea = document.getElementById("tafsirArea");

  // أسماء السور
  const suraNames = ["الفاتحة","البقرة"];

  // إضافة الخيارات للقائمة
  suraNames.forEach((name, idx) => {
    const opt = document.createElement("option");
    opt.value = idx + 1;
    opt.textContent = `${idx + 1} - ${name}`;
    suraSelect.appendChild(opt);
  });

  // تحميل JSON المحلي من مجلد data
  let tafsirData = {};
  try {
    const res = await fetch("data/tafsir1.json"); // تم تعديل المسار والاسم
    tafsirData = await res.json();
    console.log("تم تحميل البيانات بنجاح", tafsirData);
  } catch (e) {
    tafsirArea.innerHTML = "فشل تحميل ملف التفسير المحلي.";
    console.error(e);
    return;
  }

  // عند الضغط على زر "احصل على التفسير"
  fetchBtn.addEventListener("click", () => {
    const sura = suraSelect.value;
    const ayah = ayahInput.value.trim();

    if (!tafsirData[sura] || !tafsirData[sura][ayah]) {
      tafsirArea.innerHTML = "هذه الآية غير موجودة في الملف.";
      return;
    }

    const ayaText = tafsirData[sura][ayah].text;
    const tafsirText = tafsirData[sura][ayah].tafsir;
    const surahName = suraNames[sura - 1];

    tafsirArea.innerHTML = `
      <h3>${surahName} - الآية ${ayah}:</h3>
      <p>${ayaText}</p>
      <h3>تفسير ابن كثير:</h3>
      <p>${tafsirText}</p>
    `;
  });
});
