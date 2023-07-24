// DOM içeriği yüklendiğinde yapılacak işlemler
document.addEventListener('DOMContentLoaded', function () {

  // Şu anki sayfanın URL'sini almak için webNavigation API'sini kullanın
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];

    // Eğer tabs nesnesi tanımlı değilse ya da URL bulunamadıysa
    if (!currentTab || !currentTab.url) {
      document.getElementById('clock').innerText = "null";
      return;
    }

    // Sayfanın DOM yapısına erişim sağlayarak tabloyu çekelim
    function getTableData() {
      chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        func: () => {
          const tableData = [];
          const tableRows = document.querySelectorAll('#liste_10623 tbody tr');

          // Eğer tableRows tanımlı değilse veya içinde element yoksa, hata durumunu ele al
          if (!tableRows || tableRows.length === 0) {
            console.log("Tablo verisi bulunamadı.");
            return;
          }

          tableRows.forEach((row) => {
            const cells = row.getElementsByTagName('td');
            const rowData = {
              no: cells[0].innerText,
              ticketID: cells[1].innerText,
              ticketStatu: cells[2].innerText,
              ticketDate: cells[3].innerText,
              ticketCustomer: cells[4].innerText,
              ticketCusPersonel: cells[5].innerText,
              ticketAppoinPersonel: cells[6].innerText,
              ticketTopic: cells[7].innerText,
              ticketType: cells[8].innerText,
              ticketPriority: cells[9].innerText,
              operations: '<button type="button" id="basla">Başla</button>   <button type="button" id="bekle">Beklet</button>   <button type="button" id="dur">Durdur</button>'
            };
            tableData.push(rowData);
          });

          // Elde edilen tablo verilerini ekrana yazdıralım
          console.log(tableData);

          const rowDataString = JSON.stringify(tableData);
          localStorage.setItem('rowData', rowDataString);
          console.log("Kaydedildi.")

        },
      });
    }
    getTableData();



    // Eğer sayfanın URL'si "isteerp" kelimesini içeriyorsa tablo gösterme işlemini yap
    if (currentTab.url.includes('isteerp')) {
      const messageDiv = document.getElementById('message');
      messageDiv.innerText = "Bu sayfada bu eklenti çalışır.";


      //Başla Butonu
      document.getElementById('basla').onclick = function () {
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          function: () => {
            const targetButton = document.querySelector('.btn.btn-block.btn-primary.btn-outline');

            if (targetButton) {
              targetButton.removeAttribute('disabled'); // Butonu aktif hale getirin
              targetButton.click(); // Butona tıklayın
              alert("Başladı");
            }
          },
        });
      };

      //Bekle Butonu
      document.getElementById('bekle').onclick = function () {
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          func: () => {
            const targetButton = document.querySelector('.btn.btn-block.btn-warning.btn-outline[ng-click="$msc.ticketPause()"]');
            if (targetButton) {
              targetButton.removeAttribute('disabled'); // Butonu aktif hale getirin
              targetButton.click(); // Butona tıklayın
              alert("Bekletildi");
            }
          },
        });
      };

      //Durdur Butonu
      document.getElementById('dur').onclick = function () {
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          func: () => {
            const targetButton = document.querySelector('.btn.btn-block.btn-danger.btn-outline[ng-disabled="$workingTicket.Pause"]');
            if (targetButton) {
              targetButton.removeAttribute('disabled'); // Butonu aktif hale getirin
              targetButton.click(); // Butona tıklayın
              alert("Durdu");
            }
          },
        });
      };

    } else {
      // Eğer değilse, "ticket" adlı elementi bul ve içeriğini "Bu sayfada bu eklenti çalışmaz" olarak ayarla
      document.getElementById('ticket').innerText = "Bu sayfada bu eklenti çalışmaz.";
    }
  });
});
