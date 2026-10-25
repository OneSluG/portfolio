<?php
// Указываем браузеру, что сервер возвращает данные в формате JSON
header('Content-Type: application/json; charset=utf-8');

// Проверяем, что запрос пришел методом POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// 1. Принимаем данные из формы (зависит от атрибутов name в вашем HTML)
// Если в HTML у вас другие name (например, name="name" или name="text"), замените их тут в ['...']
$name    = isset($_POST['username']) ? trim($_POST['username']) : 'Не указано';
$email   = isset($_POST['email']) ? trim($_POST['email']) : 'Не указано';
$message = isset($_POST['message']) ? trim($_POST['message']) : 'Пустое сообщение';

// 2. Настройки письма
$to = "test@positivus.local"; // Любой адрес для теста в Mailpit
$subject = "Новая заявка с сайта Positivus";

// 3. Формируем текст письма
$mail_body = "Имя отправителя: $name\n";
$mail_body .= "Email: $email\n\n";
$mail_body .= "Сообщение:\n$message\n";

// 4. Заголовки письма для правильной кодировки
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/plain;charset=UTF-8" . "\r\n";
$headers .= "From: no-reply@positivus.local" . "\r\n";

// 5. Отправка и ответ для JavaScript
if (mail($to, $subject, $mail_body, $headers)) {
    // Отправляем JS статус полной победы
    http_response_code(200);
    echo json_encode(['status' => 'success']);
} else {
    // Отправляем ошибку, если локальный сервер не смог обработать почту
    http_response_code(500);
    echo json_encode(['error' => 'Не удалось отправить письмо через локальный сервер.']);
}
exit;
?>
