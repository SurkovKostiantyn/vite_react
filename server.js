const express = require('express');
const path = require('path');
const app = express();

// Сервирование статических файлов из директории 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Обработка всех запросов GET путем отправки файла index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
