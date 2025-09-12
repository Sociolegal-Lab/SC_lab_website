function openNewTab(appUrl, fallbackUrl, timeout = 1200){
  let handled = false;

  function handleVisibility() {
    // 頁面隱藏 → 使用者已經跳到 App
    // 因為visibilitychange並不一定代表使用者已經正確跳轉到App，因此需要額外檢查document.hidden
    if (document.hidden) handled = true;
  }

  // 建立事件監聽
  // 頁面可見性改變時觸發
  document.addEventListener('visibilitychange', handleVisibility);

  // 頁面卸載時觸發（window全局程度較高）
  window.addEventListener(
    'pagehide',
    () => {
      handled = true;
    },
    // 當事件改變，remove監聽
    { once: true }
  );

  // 嘗試打開 App
  window.location.href = appUrl;

  // 若在 timeout 內沒有跳轉到 App → 開啟 fallback
  setTimeout(() => {
    document.removeEventListener('visibilitychange', handleVisibility);
    if (!handled) {
      // 這裡用 window.open，保留原頁面
      window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
    }
  }, timeout);
}


export default openNewTab;