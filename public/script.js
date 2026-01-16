async function generate() {
  const purpose = document.getElementById('purpose').value;
  const color = document.getElementById('color').value;
  const recipient = document.getElementById('recipient').value;

  const res = await fetch('/api/flower', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ purpose, color, recipient })
  });

  const data = await res.json();

  document.getElementById('flower').textContent =
    `🌼 花：${data.main_flower}`;
  document.getElementById('language').textContent =
    `🌸 花言葉：${data.language}`;
  document.getElementById('reason').textContent =
    `💬 理由：${data.reason}`;

  window.bouquetColors = data.bouquet_colors;
}
