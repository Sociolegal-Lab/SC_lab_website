// src/utils/buildMailto.js
function buildMailto(email = '', { subject = '', body = '', cc = '', bcc = '' } = {}) {

    
  if (!email) return '';

  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  if (cc) params.set('cc', cc);
  if (bcc) params.set('bcc', bcc);


  // URLSearchParams 會把空格轉成 +，所以把 + 換成 %20
  const queryString = params.toString().replace(/\+/g, '%20');
  return `mailto:${encodeURIComponent(email)}${queryString ? `?${queryString}` : ''}`;
}

export default buildMailto;
