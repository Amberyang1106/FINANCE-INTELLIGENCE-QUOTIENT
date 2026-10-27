const views = {
  monitor: document.getElementById('monitorView'),
  analysis: document.getElementById('analysisView'),
  reports: document.getElementById('reportsView')
};

const breadcrumbs = {
  monitor: ['监控台', '毛利监控'],
  analysis: ['分析任务', '华东区毛利调查'],
  reports: ['财务报告', '报告库']
};

function switchView(name) {
  if (!views[name]) return;
  Object.entries(views).forEach(([key, view]) => {
    view.classList.toggle('active', key === name);
    view.setAttribute('aria-hidden', key === name ? 'false' : 'true');
  });
  document.querySelectorAll('.nav-item').forEach((item) => {
    const selected = item.dataset.view === name;
    item.classList.toggle('active', selected);
    if (selected) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
  });
  const [section, page] = breadcrumbs[name];
  document.querySelector('.breadcrumb').innerHTML = `<span>${section}</span><b>/</b><strong>${page}</strong>`;
}

document.querySelectorAll('.nav-item').forEach((item) => item.addEventListener('click', () => switchView(item.dataset.view)));

const anomalyTitles = {
  east: '华东区毛利率为何连续下降？',
  cloud: '云服务单位成本为何异常上升？',
  marketing: '品牌营销预算为何提前消耗？'
};

function openAnomaly(item) {
  const key = item.dataset.anomaly;
  document.querySelectorAll('.anomaly').forEach((row) => row.classList.toggle('active', row.dataset.anomaly === key));
  document.getElementById('analysisTitle').textContent = anomalyTitles[key];
  switchView('analysis');
  document.getElementById('analysisTitle').focus({ preventScroll: true });
}

document.querySelectorAll('[data-anomaly]').forEach((item) => item.addEventListener('click', () => openAnomaly(item)));

document.querySelectorAll('.inspector-tabs button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.inspector-tabs button').forEach((tab) => {
      const selected = tab === button;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
    });
    document.querySelectorAll('.tab-content').forEach((content) => {
      const selected = content.id === `${button.dataset.tab}Tab`;
      content.classList.toggle('active', selected);
      content.hidden = !selected;
    });
  });
});

const discount = document.getElementById('discountSlider');
const cost = document.getElementById('costSlider');
const mix = document.getElementById('mixSlider');

function updateScenario() {
  const discountValue = Number(discount.value);
  const costValue = Number(cost.value);
  const mixValue = Number(mix.value);
  const amount = discountValue * 0.46 + costValue * 0.19 + mixValue * 0.11;
  const pp = amount / 1.82;
  document.getElementById('discountLabel').textContent = `${discountValue.toFixed(1)}pp`;
  document.getElementById('costLabel').textContent = `${costValue}%`;
  document.getElementById('mixLabel').textContent = `${mixValue}pp`;
  document.getElementById('scenarioValue').textContent = `+¥${amount.toFixed(1)}M`;
  document.getElementById('scenarioPp').textContent = `毛利率 +${pp.toFixed(1)}pp`;
}

[discount, cost, mix].forEach((slider) => slider.addEventListener('input', updateScenario));

const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  clearTimeout(toastTimer);
  toast.querySelector('p').textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4200);
}

toast.addEventListener('pointerenter', () => clearTimeout(toastTimer));
toast.addEventListener('pointerleave', () => { toastTimer = setTimeout(() => toast.classList.remove('show'), 1800); });
toast.addEventListener('focusin', () => clearTimeout(toastTimer));
toast.addEventListener('focusout', () => { toastTimer = setTimeout(() => toast.classList.remove('show'), 1800); });

document.getElementById('newAnalysis').addEventListener('click', () => {
  switchView('analysis');
  document.getElementById('analysisPrompt').focus();
});

document.querySelectorAll('.suggested-prompts button').forEach((button) => {
  button.addEventListener('click', () => {
    const textarea = document.getElementById('analysisPrompt');
    textarea.value = button.textContent;
    textarea.focus();
  });
});

document.querySelector('.composer').addEventListener('submit', (event) => {
  event.preventDefault();
  const textarea = document.getElementById('analysisPrompt');
  if (!textarea.value.trim()) {
    textarea.focus();
    return;
  }
  showToast('问题已加入分析队列');
  textarea.value = '';
});

document.querySelector('.command-trigger').addEventListener('click', () => {
  switchView('analysis');
  document.getElementById('analysisPrompt').focus();
});

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    switchView('analysis');
    document.getElementById('analysisPrompt').focus();
  }
});

switchView('monitor');
updateScenario();
