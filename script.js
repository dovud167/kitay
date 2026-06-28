function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

async function saveData() {
    const item = {
        title: document.getElementById('title').value,
        amount: parseFloat(document.getElementById('amount').value),
        type: document.getElementById('type').value,
        date: new Date().toISOString().split('T')[0]
    };
    
    await fetch('index.php', { 
        method: 'POST', 
        body: JSON.stringify({ action: 'add', item }) 
    });
    alert('Сохранено!');
    location.reload();
}