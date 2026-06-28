function saveData() {
    const item = {
        id: Date.now(),
        title: document.getElementById('title').value,
        amount: parseFloat(document.getElementById('amount').value),
        type: document.getElementById('type').value,
    };
    let data = JSON.parse(localStorage.getItem('myFinanceData') || '[]');
    data.push(item);
    localStorage.setItem('myFinanceData', JSON.stringify(data));
    location.reload();
}

function deleteItem(id) {
    let data = JSON.parse(localStorage.getItem('myFinanceData') || '[]');
    data = data.filter(item => item.id !== id);
    localStorage.setItem('myFinanceData', JSON.stringify(data));
    updateStats();
}

function updateStats() {
    let data = JSON.parse(localStorage.getItem('myFinanceData') || '[]');
    let income = 0, expense = 0, listHtml = '';
    
    data.forEach(item => {
        if (item.type === 'income') income += item.amount;
        else expense += item.amount;
        listHtml += `<div class="item-row">
            <span>${item.title}: ${item.amount}</span>
            <span class="delete-btn" onclick="deleteItem(${item.id})">[X]</span>
        </div>`;
    });
    
    document.getElementById('result').innerHTML = `
        <p>INCOME: ${income} | EXPENSE: ${expense}</p>
        <p>BALANCE: ${income - expense}</p>
    `;
    document.getElementById('list').innerHTML = listHtml;
}

// При переходе на статистику сразу обновляем её
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    if (pageId === 'stats-page') updateStats();
}