(() => {
  const form = document.getElementById('registrationForm');
  const steps = [...document.querySelectorAll('.form-step')];
  const indicators = [...document.querySelectorAll('.step')];
  let current = 0;

  const getNumber = () => {
    let n = Number(localStorage.getItem('gpd_last_registration_number') || '0') + 1;
    localStorage.setItem('gpd_last_registration_number', String(n));
    return `GPD6-2026-${String(n).padStart(4, '0')}`;
  };

  const showStep = (index) => {
    if (!steps.length) return;
    current = Math.max(0, Math.min(index, steps.length - 1));
    steps.forEach((s, i) => s.classList.toggle('active', i === current));
    indicators.forEach((s, i) => s.classList.toggle('active', i === current));
    window.scrollTo({top: document.querySelector('.form-shell')?.offsetTop - 90 || 0, behavior: 'smooth'});
  };

  const validateCurrent = () => {
    if (!form || !steps[current]) return true;
    const required = [...steps[current].querySelectorAll('[required]')];
    for (const el of required) {
      if (!el.checkValidity()) { el.reportValidity(); return false; }
    }
    if (current === 2 && !document.querySelectorAll('input[name="formation[]"]:checked').length) {
      alert('Choisis au moins une formation avant de continuer.'); return false;
    }
    return true;
  };

  document.querySelectorAll('.next-btn').forEach(btn => btn.addEventListener('click', () => {
    if (!validateCurrent()) return;
    if (current === 2) buildReview();
    showStep(current + 1);
  }));
  document.querySelectorAll('.prev-btn').forEach(btn => btn.addEventListener('click', () => showStep(current - 1)));

  const updatePrice = () => {
    const checked = [...document.querySelectorAll('input[name="formation[]"]:checked')];
    const total = checked.reduce((sum, x) => sum + Number(x.dataset.price || 0), 0);
    const target = document.getElementById('priceTotal');
    if (target) target.textContent = `${total} $`;
    const hidden = document.getElementById('selectedPrograms');
    if (hidden) hidden.value = checked.map(x => x.value).join(' | ');
  };
  document.querySelectorAll('input[name="formation[]"]').forEach(x => x.addEventListener('change', updatePrice));

  const val = name => form?.elements[name]?.value || '—';
  const buildReview = () => {
    const box = document.getElementById('reviewBox');
    if (!box) return;
    const programs = [...document.querySelectorAll('input[name="formation[]"]:checked')].map(x => x.value);
    const rows = [
      ['Nom complet', `${val('nom')} ${val('postnom')} ${val('prenom')}`],
      ['Ville', val('ville')], ['WhatsApp', val('whatsapp')], ['E-mail', val('email')],
      ['Formation(s)', programs.join(', ') || '—'], ['Niveau', val('niveau')],
      ['Disponibilité', val('disponibilite')], ['Numéro', document.getElementById('registrationNumber').value]
    ];
    box.innerHTML = rows.map(([k,v]) => `<div class="review-row"><span>${escapeHtml(k)}</span><b>${escapeHtml(v)}</b></div>`).join('');
  };
  const escapeHtml = s => String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  if (form) {
    form.addEventListener('submit', e => {
      if (!validateCurrent()) { e.preventDefault(); return; }
      const number = getNumber();
      document.getElementById('registrationNumber').value = number;
      localStorage.setItem('gpd_registration_number', number);
      localStorage.setItem('gpd_last_form_snapshot', JSON.stringify({number, createdAt:new Date().toISOString(), name:`${val('nom')} ${val('postnom')} ${val('prenom')}`, email:val('email'), whatsapp:val('whatsapp'), programs:[...document.querySelectorAll('input[name="formation[]"]:checked')].map(x=>x.value)}));
    });
  }

  // Petit espace d'administration local : utile pour tester/exporter des inscriptions sur le navigateur de l'administrateur.
  const adminTable = document.getElementById('adminTableBody');
  if (adminTable) renderAdmin();
  function renderAdmin() {
    const data = JSON.parse(localStorage.getItem('gpd_admin_registrations') || '[]');
    adminTable.innerHTML = data.length ? data.map(r => `<tr><td>${escapeHtml(r.number)}</td><td>${escapeHtml(r.name)}</td><td>${escapeHtml(r.email)}</td><td>${escapeHtml(r.whatsapp)}</td><td>${escapeHtml((r.programs||[]).join(', '))}</td><td>${escapeHtml(r.createdAt || '')}</td></tr>`).join('') : '<tr><td colspan="6" class="empty-admin">Aucune inscription locale enregistrée.</td></tr>';
    const total = document.getElementById('adminTotal'); if (total) total.textContent = data.length;
  }
  document.getElementById('exportAdmin')?.addEventListener('click', () => {
    const data = JSON.parse(localStorage.getItem('gpd_admin_registrations') || '[]');
    if (!data.length) return alert('Aucune donnée locale à exporter.');
    const headers = ['Numero','Nom','Email','WhatsApp','Formations','Date'];
    const csv = [headers,...data.map(r=>[r.number,r.name,r.email,r.whatsapp,(r.programs||[]).join(' | '),r.createdAt])].map(row=>row.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\n');
    const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})); a.download='GOMA-PRO-Devs-inscriptions.csv'; a.click(); URL.revokeObjectURL(a.href);
  });
})();
