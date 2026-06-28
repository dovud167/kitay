// Переключение страниц
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    if (pageId === 'stats-page') updateStats();
}

// Сохранение
function saveData() {
    const item = {
        id: Date.now(),
        title: document.getElementById('title').value,
        amount: parseFloat(document.getElementById('amount').value),
        type: document.getElementById('type').value,
        date: new Date().toLocaleDateString()
    };
    
    let data = JSON.parse(localStorage.getItem('myFinanceData') || '[]');
    data.push(item);
    localStorage.setItem('myFinanceData', JSON.stringify(data));
    
    alert('Сохранено!');
    location.reload();
}

// Подсчет статистики
function updateStats() {
    let data = JSON.parse(localStorage.getItem('myFinanceData') || '[]');
    let income = 0, expense = 0;
    
    data.forEach(item => {
        if (item.type === 'income') income += item.amount;
        else expense += item.amount;
    });
    
    document.getElementById('result').innerHTML = `
        <p>Доходы: ${income} сомони</p>
        <p>Расходы: ${expense} сомони</p>
        <p><b>Итого: ${income - expense} сомони</b></p>
    `;
}