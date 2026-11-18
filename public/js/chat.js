// Fungsi membuka/menutup (Minimize & Maximize) jendela chat
function toggleAiModal() {
  const modal = document.getElementById('aiModal');
  const floatBtn = document.getElementById('aiFloatBtnContainer');

  if (modal.classList.contains('hidden')) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    floatBtn.classList.add('hidden');
    document.getElementById('aiPromptInput').focus();
  } else {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    floatBtn.classList.remove('hidden');
  }
}

// Fungsi render gelembung chat ke layar
function appendChatBubble(text, sender, saveToStorage = true) {
  const container = document.getElementById('chatMessages');
  const wrapper = document.createElement('div');

  if (sender === 'user') {
    wrapper.className = 'flex justify-end';
    wrapper.innerHTML = `
      <div class="bg-amber-600 text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] leading-relaxed">
        ${escapeHtml(text)}
      </div>
    `;
  } else if (sender === 'error') {
    wrapper.className = 'flex justify-start';
    wrapper.innerHTML = `
      <div class="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-2xl rounded-tl-none max-w-[85%] leading-relaxed">
        ⚠️ ${escapeHtml(text)}
      </div>
    `;
  } else {
    wrapper.className = 'flex justify-start';
    
    let formattedText = escapeHtml(text);
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-amber-950">$1</strong>');
    formattedText = formattedText.replace(/\*(.*?)\*/g, '$1');

    wrapper.innerHTML = `
      <div class="bg-white border border-amber-100 text-gray-800 p-3.5 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] leading-relaxed space-y-1.5">
        ${formattedText}
      </div>
    `;
  }

  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;

  // Simpan ke localStorage agar tidak hilang saat halaman di-refresh
  if (saveToStorage) {
    const history = JSON.parse(localStorage.getItem('umkm_chat_history') || '[]');
    history.push({ text, sender });
    localStorage.setItem('umkm_chat_history', JSON.stringify(history));
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.innerText = str;
  return div.innerHTML;
}

// Muat riwayat chat dari localStorage saat halaman pertama kali dibuka
window.addEventListener('DOMContentLoaded', () => {
  const history = JSON.parse(localStorage.getItem('umkm_chat_history') || '[]');
  
  if (history.length === 0) {
    // Pesan sambutan default jika belum ada riwayat
    const welcomeText = "Halo! 👋 Saya asisten virtual UMKM Nasi Kuning. Ada yang bisa dibantu? Kamu bisa tanya ketersediaan stok menu, harga, atau rekomendasi paket katering sesuai budgetmu.";
    appendChatBubble(welcomeText, 'ai', true);
  } else {
    // Render ulang semua riwayat percakapan sebelumnya
    history.forEach(item => {
      appendChatBubble(item.text, item.sender, false);
    });
  }
});

// Reset / Hapus riwayat chat
function clearChatHistory() {
  if (confirm('Bersihkan riwayat percakapan?')) {
    localStorage.removeItem('umkm_chat_history');
    document.getElementById('chatMessages').innerHTML = '';
    const welcomeText = "Riwayat dibersihkan. Halo! 👋 Ada yang bisa saya bantu seputar menu nasi kuning?";
    appendChatBubble(welcomeText, 'ai', true);
  }
}

async function handleAiChatSubmit(e) {
  e.preventDefault();

  const input = document.getElementById('aiPromptInput');
  const sendBtn = document.getElementById('aiSendBtn');
  const container = document.getElementById('chatMessages');
  const message = input.value.trim();

  if (!message) return;

  // 1. Tampilkan pesan user
  appendChatBubble(message, 'user', true);
  input.value = '';
  input.disabled = true;
  sendBtn.disabled = true;

  // 2. Tampilkan indikator loading
  const loadingId = 'ai-loading-' + Date.now();
  const loadingEl = document.createElement('div');
  loadingEl.id = loadingId;
  loadingEl.className = 'flex justify-start';
  loadingEl.innerHTML = `
    <div class="bg-white border border-amber-100 text-gray-400 italic p-3 rounded-2xl rounded-tl-none shadow-sm text-xs animate-pulse">
      Asisten sedang mengetik...
    </div>
  `;
  container.appendChild(loadingEl);
  container.scrollTop = container.scrollHeight;

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const result = await res.json();
    document.getElementById(loadingId)?.remove();

    if (res.ok && result.success && result.data && result.data.reply) {
      appendChatBubble(result.data.reply, 'ai', true);
    } else {
      appendChatBubble(result.message || 'Gagal memproses respons dari server.', 'error');
    }
  } catch (err) {
    document.getElementById(loadingId)?.remove();
    console.error('Fetch Error:', err);
    appendChatBubble('Terjadi kesalahan koneksi ke server aplikasi.', 'error');
  } finally {
    input.disabled = false;
    sendBtn.disabled = false;
    input.focus();
  }
}