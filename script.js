let editId = null;

function saveData() {
    let data = JSON.parse(localStorage.getItem('finData') || '[]');
    
    // Получаем данные из полей
    const title = document.getElementById('title').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value; // 'income' или 'expense'

    if (!title || isNaN(amount)) {
        alert("Введите название и сумму!");
        return;
    }

    const item = {
        id: editId || Date.now(),
        title: title,
        amount: amount,
        type: type
    };

    if (editId) {
        // Редактирование существующей записи
        data = data.map(i => i.id === editId ? item : i);
    } else {
        // Добавление новой
        data.push(item);
    }
    
    localStorage.setItem('finData', JSON.stringify(data));
    resetForm();
    render();
}

function resetForm() {
    editId = null;
    document.getElementById('title').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('save-btn').innerText = "[ ВЫПОЛНИТЬ ТРАНЗАКЦИЮ ]";
    document.getElementById('cancel-btn').style.display = 'none';
}

function editItem(id) {
    let data = JSON.parse(localStorage.getItem('finData'));
    const item = data.find(i => i.id === id);
    document.getElementById('title').value = item.title;
    document.getElementById('amount').value = item.amount;
    document.getElementById('type').value = item.type;
    editId = id;
    document.getElementById('save-btn').innerText = "[ ОБНОВИТЬ ЗАПИСЬ ]";
    document.getElementById('cancel-btn').style.display = 'block';
}

function deleteItem(id) {
    if(confirm("Удалить эту запись?")) {
        let data = JSON.parse(localStorage.getItem('finData')).filter(i => i.id !== id);
        localStorage.setItem('finData', JSON.stringify(data));
        render();
    }
}

function render() {
    let data = JSON.parse(localStorage.getItem('finData') || '[]');
    let inc = 0;
    let exp = 0;
    let html = '';
    
    data.forEach(i => {
        // Автоматический подсчет
        if(i.type === 'income') {
            inc += i.amount;
        } else {
            exp += i.amount;
        }
        
        // Рендер списка
        html += `<div class="item-row">
            <span>${i.type === 'income' ? '[+]' : '[-]'} ${i.title} : ${i.amount}</span>
            <div class="actions">
                <span onclick="editItem(${i.id})">✎</span>
                <span onclick="deleteItem(${i.id})">X</span>
            </div>
        </div>`;
    });
    
    // Обновляем круги
    document.getElementById('inc-circle').innerText = inc;
    document.getElementById('exp-circle').innerText = exp;
    document.getElementById('list').innerHTML = html;
}

// Запуск при загрузке
render();