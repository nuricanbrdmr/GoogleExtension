// content.js

// Tabloyu çeken fonksiyon
function getTableData() {
    const tableData = [];
    const tableRows = document.querySelectorAll('#liste_10623 tbody tr');
  
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
        ticketPriority: cells[9].innerText
      };
      tableData.push(rowData);
    });
  
    return tableData;
  }
  
  // İsteERP sayfasında mıyız kontrolü
  if (window.location.href.startsWith("https://demo.isteerp.com/")) {
    // Tabloyu çekelim
    const tableData = getTableData();
  
    // Verileri extension background script ile paylaşalım
    chrome.runtime.sendMessage({ action: "tableData", data: tableData });
  }
  