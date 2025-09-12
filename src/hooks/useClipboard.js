// src/hooks/useClipboard.js
import { useState, useCallback } from 'react';
import showCopyState from '../utils/showCopyState';

function useClipboard() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'

  const copy = useCallback(async (text) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // fallback 方法：用 textarea 來複製
        const el = document.createElement('textarea');
        el.value = text;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }

      setStatus('success');
      showCopyState(`Copied to clipboard: ${text}`, 'success');
      // 一段時間後回復 idle
      setTimeout(() => setStatus('idle'), 1600);
      return true;

    } catch (err) {
      console.error('copy failed', err);
      setStatus('error');
        showCopyState('Failed to copy to clipboard', 'error');
      setTimeout(() => setStatus('idle'), 1600);
      return false;
    }
  }, []);

  return { copy, status };
}

export default useClipboard;
