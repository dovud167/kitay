// --- ЛОГИКА HACKER FINANCE OS ---

let editId = null;

// Функция сохранения
function saveData() {
    const title = document.getElementById('title').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (!title || isNaN(amount)) {
        alert("Ошибка: Заполните все поля!");
        return;
    }

    let data = JSON.parse(localStorage.getItem('finData') || '[]');

    const item = {
        id: editId || Date.now(),
        title: title,
        amount: amount,
        type: type
    };

    if (editId) {
        data = data.map(i => i.id === editId ? item : i);
        editId = null;
    } else {
        data.push(item);
    }
    
    localStorage.setItem('finData', JSON.stringify(data));
    resetForm();
    render();
}

// Редактирование (Кнопка ✎)
function editItem(id) {
    let data = JSON.parse(localStorage.getItem('finData'));
    const item = data.find(i => i.id === id);
    if (!item) return;

    document.getElementById('title').value = item.title;
    document.getElementById('amount').value = item.amount;
    document.getElementById('type').value = item.type;
    
    editId = id;
    document.getElementById('save-btn').innerText = "[ ОБНОВИТЬ ЗАПИСЬ ]";
    document.getElementById('cancel-btn').style.display = 'block';
}

// Отмена редактирования
function resetForm() {
    editId = null;
    document.getElementById('title').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('save-btn').innerText = "[ ВЫПОЛНИТЬ ТРАНЗАКЦИЮ ]";
    document.getElementById('cancel-btn').style.display = 'none';
}

// Удаление
function deleteItem(id) {
    let data = JSON.parse(localStorage.getItem('finData') || '[]').filter(i => i.id !== id);
    localStorage.setItem('finData', JSON.stringify(data));
    render();
}

// Отображение и расчеты
function render() {
    let data = JSON.parse(localStorage.getItem('finData') || '[]');
    let inc = 0, exp = 0;
    let html = '';
    
    data.forEach(i => {
        if(i.type === 'income') inc += i.amount; 
        else exp += i.amount;
        
        html += `<div class="item-row">
            <span>${i.type === 'income' ? '[+]' : '[-]'} ${i.title} : ${i.amount}</span>
            <div class="actions">
                <span onclick="editItem(${i.id})">✎</span>
                <span onclick="deleteItem(${i.id})">X</span>
            </div>
        </div>`;
    });
    
    document.getElementById('inc-circle').innerText = inc;
    document.getElementById('exp-circle').innerText = exp;
    document.getElementById('total-circle').innerText = (inc - exp);
    document.getElementById('list').innerHTML = html;
}

// Инициализация при загрузке
render();