// Xóa thông báo khi nhấn nút delete-btn
document.getElementById('notificationList').addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
      e.target.closest('.notification-item').remove();
    }
  });

  // Xóa tất cả thông báo
  document.getElementById('deleteAll').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('notificationList').innerHTML = '';
  });

  // Đánh dấu tất cả đã đọc
  document.getElementById('markAllRead').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('.notification-item').forEach(item => {
      item.style.opacity = '0.5'; // Làm mờ thông báo để đánh dấu đã đọc
    });
  });