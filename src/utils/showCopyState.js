// 簡單的 toast function：在畫面上建立一個小提示框
function showCopyState(message, type = "success") {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.padding = "10px 16px";
  toast.style.borderRadius = "6px";
  toast.style.fontSize = "14px";
  toast.style.color = "black";
  toast.style.backgroundColor = type === "success" ? "#FFC23A" : "red";
  toast.style.zIndex = 9999;
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.3s ease";
  toast.style.fontFamily = 'Inter, sans-serif';
  toast.style.fontOpticalSizing = 'auto';
  toast.style.fontWeight = 'normal';
  toast.style.fontStyle = 'normal';

  document.body.appendChild(toast);

  // 讓 toast 顯示出來
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 5000);
}

export default showCopyState;