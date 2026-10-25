<?php
// 1. Укажите ваш email, куда должны приходить заявки
$to_email = "vasha-pochta@mail.ru"; 
$subject = "Новая заявка с сайта Cyberpunk 2077";

// 2. Получаем данные из полей формы
$name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : 'Не указано';
$email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : 'Не указано';

// 3. Формируем текст письма
$message = "Имя отправителя: $name\n";
$message .= "E-mail: $email\n";

// 4. Настройки для отправки письма (разделитель границ для вложения)
$boundary = md5(uniqid(time()));
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
$headers .= "From: no-reply@" . $_SERVER['HTTP_HOST'] . "\r\n";

// Тело сообщения (текстовая часть)
$body = "--$boundary\r\n";
$body .= "Content-Type: text/plain; charset=utf-8\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= $message . "\r\n";

// 5. Обработка и прикрепление файла (скриншота)
if (isset($_FILES['screenshot']) && $_FILES['screenshot']['error'] == UPLOAD_ERR_OK) {
    $file_name = $_FILES['screenshot']['name'];
    $file_size = $_FILES['screenshot']['size'];
    $file_tmp  = $_FILES['screenshot']['tmp_name'];
    
    // Читаем файл в строку
    $fp = fopen($file_tmp, "r");
    $file_content = fread($fp, $file_size);
    fclose($fp);
    $file_content = chunk_split(base64_encode($file_content));

    // Добавляем файл в тело письма
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: application/octet-stream; name=\"$file_name\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"$file_name\"\r\n\r\n";
    $body .= $file_content . "\r\n";
}

$body .= "--$boundary--";

// 6. Отправка (версия для AJAX / Fetch)
header('Content-Type: application/json; charset=utf-8');

if (mail($to_email, $subject, $body, $headers)) {
    // Возвращаем JSON со статусом success
    echo json_encode(["status" => "success", "message" => "Заявка успешно отправлена!"]);
} else {
    // Возвращаем JSON со статусом error
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Ошибка сервера при отправке."]);
}
exit;
?>
