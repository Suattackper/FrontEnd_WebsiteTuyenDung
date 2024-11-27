
function toastNoti({ title = "", message = "", type = "", duration = 3000 }) {
  // Font awesome icons
  const icons = {
      success: "feather-check-circle",
      info: "feather-info",
      warning: "feather-alert-triangle",
      error: "feather-x-circle"
  };

  // select icon for specified toast type
  const icon = icons[type];

  // Milisecond to second convert
  const delay = durationInSecond = (duration / 1000).toFixed(2);

  // Get toast div element
  const main = document.getElementById("toast-notification");

  const notificationToast = document.createElement("div");

  notificationToast.classList.add('toast-notification', `toast-noti-${type}`);
  notificationToast.style.animation = `slideInLeft ease 0.3s, fadeOut ease .5s ${delay}s forwards`;

  notificationToast.innerHTML = `
<div class="toast-noti-icon">
<i class="${icon}"></i>    
</div>

<div class="toast-noti-body">
<h3 class="toast-noti-title">${title}</h3>
<p class="toast-noti-msg">${message}</p>
</div>

<div class="toast-noti-close">
<i class="feather-x"></i>
</div>

<div class="progress-tracking"></div>
<div class="progress-tracking-running ${type}"></div>
`

  const progressRunning =  notificationToast.querySelector(".progress-tracking-running");
  progressRunning.style.animation = `progress linear ${durationInSecond}s forwards`;

  main.appendChild( notificationToast);

  const autoRemoveToast = setTimeout(function () {
      main.removeChild( notificationToast);
  }, duration);

  const closeIcon = notificationToast.querySelector('.toast-noti-close');

  closeIcon.addEventListener('click', () => {
      main.removeChild( notificationToast);
      clearTimeout(autoRemoveToast);
  });
}

document.querySelectorAll(".delete-icon-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
      showInfoToast();
  });
});

function showSuccessToast() {
  toastNoti({
      title: "Success!",
      message: "Congratulation! Successfully submitted",
      type: "success",
      duration: 3000
  });
}

function showInfoToast() {
  toastNoti({
      title: "Information",
      message: "Please verify your email",
      type: "info",
      duration: 3000
  });
}

function showWarningToast() {
  toastNoti({
      title: "Warning!",
      message: "Email already existed in the database",
      type: "warning",
      duration: 3000
  });
}

function showErrorToast() {
  toastNoti({
      title: "Error!",
      message: "Please fix the error",
      type: "error",
      duration: 3000
  });
}
