let editId = null;

function saveData() {
    let data = JSON.parse(localStorage.getItem('finData') || '[]');
    const item = {
        id: editId || Date.now(),
        title: document.getElementById('title').value,
        amount: parseFloat(document.getElementById('amount').value),
        type: document.getElementById('type').value
    };

    if (editId) {
        data = data.map(i => i.id === editId ? item : i);
    } else {
        data.push(item);
    }
    
    localStorage.setItem('finData', JSON.stringify(data));
    editId = null;
    document.getElementById('save-btn').innerText = "[ ADD_RECORD ]";
    render();
}

function editItem(id) {
    let data = JSON.parse(localStorage.getItem('finData'));
    const item = data.find(i => i.id === id);
    document.getElementById('title').value = item.title;
    document.getElementById('amount').value = item.amount;
    document.getElementById('type').value = item.type;
    editId = id;
    document.getElementById('save-btn').innerText = "[ UPDATE_RECORD ]";
}

function render() {
    let data = JSON.parse(localStorage.getItem('finData') || '[]');
    let inc = 0, exp = 0;
    let html = '';
    
    data.forEach(i => {
        if(i.type === 'income') inc += i.amount; else exp += i.amount;
        html += `<div class="item-row">
            <span>${i.title} (${i.amount})</span>
            <div class="actions">
                <span onclick="editItem(${i.id})">✎</span>
                <span onclick="deleteItem(${i.id})">X</span>
            </div>
        </div>`;
    });
    
    document.getElementById('inc-circle').innerText = inc;
    document.getElementById('exp-circle').innerText = exp;
    document.getElementById('list').innerHTML = html;
}

function deleteItem(id) {
    let data = JSON.parse(localStorage.getItem('finData')).filter(i => i.id !== id);
    localStorage.setItem('finData', JSON.stringify(data));
    render();
}

render();