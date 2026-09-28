// ========================================
// CHECKLIST SİSTEMİ
// ========================================

const checkboxes = document.querySelectorAll(".check-item input");
const progressText = document.querySelector(".progress-text");

// Her sayfanın checklistini ayrı kaydetmek için
const pageKey = "checklist-" + window.location.pathname;


function updateProgress() {

    if (!progressText) {
        return;
    }

    const total = checkboxes.length;

    const completed = document.querySelectorAll(
        ".check-item input:checked"
    ).length;

    progressText.textContent = `${completed} / ${total} tamamlandı`;
}


// Sayfa açıldığında kayıtlı checkboxları getir
function loadChecklist() {

    const saved = localStorage.getItem(pageKey);

    if (!saved) {
        updateProgress();
        return;
    }

    const checkedItems = JSON.parse(saved);

    checkboxes.forEach(function (checkbox, index) {
        checkbox.checked = checkedItems[index] || false;
    });

    updateProgress();
}


// Checkbox değiştiğinde kaydet
checkboxes.forEach(function (checkbox) {

    checkbox.addEventListener("change", function () {

        const checkedItems = [];

        checkboxes.forEach(function (item) {
            checkedItems.push(item.checked);
        });

        localStorage.setItem(
            pageKey,
            JSON.stringify(checkedItems)
        );

        updateProgress();
    });

});


// Checklist'i yükle
loadChecklist();


// ========================================
// İLETİŞİM FORMU
// ========================================

const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

