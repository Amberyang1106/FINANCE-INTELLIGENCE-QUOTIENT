const views = {
  monitor: document.getElementById('monitorView'),
  analysis: document.getElementById('analysisView'),
  reports: document.getElementById('reportsView')
};

function switchView(name) {
  Object.values(views).forEach(view => view.classList.remove('active'));
  views[name].classList.add('active');
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === name));
  document.querySelector('.breadcrumb').innerHTML = name === 'analysis'
    ? '<span>分析任务</span><b>/</b><strong>华东区毛利调查</strong>'
    : name === 'reports'
      ? '<span>财务报告</span><b>/</b><strong>报告库</strong>'
      : '<span>监控台</span><b>/</b><strong>毛利监控</strong>';
}

document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', () => switchView(item.dataset.view)));

const anomalyTitles = {
  east: '华东区毛利率为何连续下降？',
  cloud: '云服务单位成本为何异常上升？',
  marketing: '品牌营销预算为何提前消耗？'
};

document.querySelectorAll('.anomaly').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.anomaly').forEach(row => row.classList.remove('active'));
    item.classList.add('active');
    document.getElementById('analysisTitle').textContent = anomalyTitles[item.dataset.anomaly];
    switchView('analysis');
  });
});

document.querySelectorAll('.inspector-tabs button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.inspector-tabs button').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(`${button.dataset.tab}Tab`).classList.add('active');
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

[discount, cost, mix].forEach(slider => slider.addEventListener('input', updateScenario));

const toast = document.getElementById('toast');
document.getElementById('newAnalysis').addEventListener('click', () => {
  switchView('analysis');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
});

document.querySelectorAll('.suggested-prompts button').forEach(button => {
  button.addEventListener('click', () => {
    const textarea = document.querySelector('.composer textarea');
    textarea.value = button.textContent;
    textarea.focus();
  });
});

document.getElementById('sendButton').addEventListener('click', () => {
  const textarea = document.querySelector('.composer textarea');
  if (!textarea.value.trim()) return;
  toast.querySelector('p').textContent = '问题已加入分析队列';
  toast.classList.add('show');
  textarea.value = '';
  setTimeout(() => toast.classList.remove('show'), 1800);
});

