<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// 1. Принимаем данные из формы
$name    = isset($_POST['username']) ? trim($_POST['username']) : 'Не указано';
$email   = isset($_POST['email']) ? trim($_POST['email']) : 'Не указано';
$message = isset($_POST['message']) ? trim($_POST['message']) : 'Пустое сообщение';

// 2. Настройки для Рег.ру
$to = "pochta-zakazchika@gmail.com"; // Почта заказчика, куда будут приходить заявки
$subject = "Новая заявка с сайта Positivus";

// 3. Текст письма
$mail_body = "Имя отправителя: $name\n";
$mail_body .= "Email для связи: $email\n\n";
$mail_body .= "Сообщение:\n$message\n";

// 4. Заголовки (ВАЖНО ДЛЯ РЕГ.РУ)
// Вместо site.ru тут должен быть реальный домен заказчика
$domain = "positivus.ru"; 

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/plain;charset=UTF-8" . "\r\n";
$headers .= "From: info@$domain" . "\r\n"; // Отправляем СТРОГО от имени домена сайта
$headers .= "Reply-To: $email" . "\r\n";   // Кнопка "Ответить" в почте сразу напишет клиенту

// 5. Отправка через встроенный mail()
if (mail($to, $subject, $mail_body, $headers)) {
    http_response_code(200);
    echo json_encode(['status' => 'success']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка отправки сервером хостинга.']);
}
exit;
?>
