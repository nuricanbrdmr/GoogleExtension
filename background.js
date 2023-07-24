// background.js
chrome.webNavigation.onCompleted.addListener(function (details) {
  const currentUrl = new URL(details.url);
  if (currentUrl.origin === 'https://demo.isteerp.com/') {
    // Eğer istenilen URL ile eşleşirse, content script'i tetikleyelim
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
    });

    // Mesaj göndererek content script'inin çalıştığını bildirelim
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      func: () => {
        const messageDiv = document.getElementById('message');
        messageDiv.innerText = "Bu sayfada bu eklenti çalışır.";

        const code = `
          const targetButton = document.querySelector('.btn.btn-block.btn-primary.btn-outline');
          if (targetButton) {
            targetButton.removeAttribute('disabled'); // Butonu aktif hale getirin
            targetButton.click(); // Butona tıklayın
            alert("Başladı");
          }
        `;

        // İşlemleri gerçekleştirmek için eval kullanıyoruz (Güvenlik açısından dikkatli olun!)
        eval(code);
      },
    });
  } else {
    const messageDiv = document.getElementById('message');
    messageDiv.innerText = "";
  }
});
