function switchPage(p) {
    document.querySelectorAll('.page').forEach(e => e.classList.remove('active-page'));
    document.querySelectorAll('nav button').forEach(e => e.classList.remove('active'));
    document.getElementById('page-' + p).classList.add('active-page');
    document.getElementById('nav-' + p).classList.add('active');
    if(p === 'main') render();
}

function saveRecord() {
    const rec = {
        id: Date.now(),
        title: document.getElementById('title').value,
        amount: parseFloat(document.getElementById('amount').value),
        type: document.getElementById('type').value
    };
    let data = JSON.parse(localStorage.getItem('finData') || '[]');
    data.push(rec);
    localStorage.setItem('finData', JSON.stringify(data));
    alert("Сохранено!");
    switchPage('main');
}

function del(id) {
    let data = JSON.parse(localStorage.getItem('finData') || '[]');
    data = data.filter(i => i.id !== id);
    localStorage.setItem('finData', JSON.stringify(data));
    render();
}

function render() {
    let data = JSON.parse(localStorage.getItem('finData') || '[]');
    let inc = 0, exp = 0;
    let list = '';
    data.forEach(i => {
        if(i.type === 'income') inc += i.amount; else exp += i.amount;
        list += `<div class="record-item">${i.title}: ${i.amount} <span class="del-btn" onclick="del(${i.id})">[X]</span></div>`;
    });
    document.getElementById('summary').innerHTML = `Доход: ${inc} | Расход: ${exp} | <b>Итог: ${inc - exp}</b>`;
    document.getElementById('records-list').innerHTML = list;
}

render();