<?php
// Обработка данных (сохранение в data.json)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = 'data.json';
    $input = json_decode(file_get_contents('php://input'), true);
    $data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

    if ($input['action'] == 'add') {
        $input['item']['id'] = time(); // Уникальный ID на основе времени
        $data[] = $input['item'];
    } elseif ($input['action'] == 'update') {
        foreach ($data as &$item) {
            if ($item['id'] == $input['item']['id']) $item = $input['item'];
        }
    }
    file_put_contents($file, json_encode($data));
    exit;
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Мой учет</title>
</head>
<body>
    <nav>
        <button onclick="showPage('add-page')">Добавить</button>
        <button onclick="showPage('stats-page')">Статистика</button>
    </nav>

    <div id="add-page" class="page active">
        <h2>Добавить запись</h2>
        <input type="text" id="title" placeholder="Что купили/заказ">
        <input type="number" id="amount" placeholder="Сумма (сомони)">
        <select id="type">
            <option value="income">Доход</option>
            <option value="expense">Расход</option>
        </select>
        <button onclick="saveData()">Сохранить</button>
    </div>

    <div id="stats-page" class="page">
        <h2>Статистика</h2>
        <div id="result"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>