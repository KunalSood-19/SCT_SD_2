export function el(id){ return document.getElementById(id) }
export function setText(id, text){ const e = el(id); if(e) e.textContent = text }
export function setMessage(text, tone = 'info'){
  const m = el('message');
  if(!m) return;
  m.textContent = text;
  m.style.color = tone === 'success' ? '#b8f5c7' : tone === 'error' ? '#ffc6c6' : '#d9fbd9';
}