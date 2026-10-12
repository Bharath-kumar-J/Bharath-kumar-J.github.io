/**
 * Bharath Kumar J - DevOps Portfolio Interactive Logic
 * Features: Interactive Shell / Terminal, GCP Sentinel AI Diagnostics Simulator,
 * Architecture Stage Explorer, and Clipboard Helpers.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTerminal();
  initSentinelSimulator();
  initPipelineExplorer();
  initCopyHandlers();
});

/* ==========================================================================
   1. Interactive DevOps Terminal Simulator
   ========================================================================== */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('term-output');
  const quickBtns = document.querySelectorAll('.quick-cmd-btn');

  if (!input || !output) return;

  const COMMANDS = {
    'help': `
<div class="term-line output">
  <span class="term-accent">Available Commands:</span><br>
  - <span class="term-highlight">kubectl get nodes</span> : List Kubernetes cluster nodes<br>
  - <span class="term-highlight">kubectl get pods</span>  : List production workloads & replicas<br>
  - <span class="term-highlight">docker ps</span>         : Show active Docker containers<br>
  - <span class="term-highlight">cat experience.json</span>: View enterprise HPE role details<br>
  - <span class="term-highlight">sentinel-check --all</span>: Query MCP AI monitoring status<br>
  - <span class="term-highlight">skills</span>            : Print DevOps skill matrix<br>
  - <span class="term-highlight">get contact</span>        : Display email, phone & GitHub<br>
  - <span class="term-highlight">clear</span>              : Clear terminal screen
</div>`,

    'kubectl get nodes': `
<div class="term-line output">
<span class="term-dim">NAME                         STATUS   ROLES           AGE    VERSION</span><br>
k8s-master-01.us-east-1      <span class="text-emerald">Ready</span>    control-plane   184d   v1.30.2<br>
k8s-worker-hpe-01.us-east-1  <span class="text-emerald">Ready</span>    worker          184d   v1.30.2<br>
k8s-worker-hpe-02.us-east-1  <span class="text-emerald">Ready</span>    worker          184d   v1.30.2<br>
k8s-worker-hpe-03.us-east-1  <span class="text-emerald">Ready</span>    worker          184d   v1.30.2
</div>`,

    'kubectl get pods': `
<div class="term-line output">
<span class="term-dim">NAME                                  READY   STATUS    RESTARTS   AGE</span><br>
gcp-sentinel-agent-7f99b8d4c-k29x     <span class="text-emerald">1/1     Running</span>   0          42d<br>
api-gateway-fastapi-6d88c9f5f-9m2la   <span class="text-emerald">2/2     Running</span>   0          18d<br>
redis-cluster-cache-0                 <span class="text-emerald">1/1     Running</span>   0          90d<br>
prometheus-k8s-node-exporter-4xkl2    <span class="text-emerald">1/1     Running</span>   0          120d<br>
grafana-core-dashboards-57c8d-pz89q   <span class="text-emerald">1/1     Running</span>   0          120d
</div>`,

    'docker ps': `
<div class="term-line output">
<span class="term-dim">CONTAINER ID   IMAGE                          COMMAND                  STATUS         PORTS</span><br>
e41a9bc38e01   bharath/gcp-sentinel:v1.4      "python -m sentinel"     <span class="text-emerald">Up 3 weeks</span>     8080/tcp<br>
91b72a912e5c   bharath/fastapi-infra-ops:v2.1 "uvicorn main:app --h…" <span class="text-emerald">Up 3 weeks</span>     0.0.0.0:8000->8000/tcp<br>
a188f98c21da   prom/prometheus:v2.52.0        "/bin/prometheus --c…"   <span class="text-emerald">Up 2 months</span>    0.0.0.0:9090->9090/tcp
</div>`,

    'cat experience.json': `
<div class="term-line output">
{<br>
&nbsp;&nbsp;<span class="text-cyan">"engineer"</span>: "Bharath Kumar J",<br>
&nbsp;&nbsp;<span class="text-cyan">"company"</span>: "Hewlett Packard Enterprise (HPE)",<br>
&nbsp;&nbsp;<span class="text-cyan">"current_role"</span>: "DevOps & Automation Specialist (Jan 2025 - Present)",<br>
&nbsp;&nbsp;<span class="text-cyan">"prior_role"</span>: "Cloud Infrastructure & Automation Engineer (Feb 2024 - Dec 2024)",<br>
&nbsp;&nbsp;<span class="text-cyan">"key_impact"</span>: [<br>
&nbsp;&nbsp;&nbsp;&nbsp;"99.9% production availability maintained across 100+ bare-metal & cloud nodes",<br>
&nbsp;&nbsp;&nbsp;&nbsp;"35% reduction in manual sysadmin maintenance via FastAPI automation APIs",<br>
&nbsp;&nbsp;&nbsp;&nbsp;"25% reduction in MTTR through centralized ELK log analysis & incident triage",<br>
&nbsp;&nbsp;&nbsp;&nbsp;"Automated RBAC IAM access governance for 500+ enterprise accounts"<br>
&nbsp;&nbsp;]<br>
}
</div>`,

    'sentinel-check --all': `
<div class="term-line output">
<span class="text-cyan">[*] Ingesting telemetry via Model Context Protocol (MCP) server...</span><br>
- Tool 01/15: get_compute_engine_metrics -> <span class="text-emerald">NORMAL (CPU 24%, Mem 41%)</span><br>
- Tool 04/15: get_kubernetes_pod_health  -> <span class="text-emerald">0 CrashLoops, HPA Active</span><br>
- Tool 09/15: get_cloud_sql_telemetry    -> <span class="text-emerald">Connection pool healthy (34/100)</span><br>
- Tool 12/15: get_load_balancer_5xx      -> <span class="text-emerald">0.01% error budget consumed</span><br>
<span class="text-emerald">[SUCCESS] All 15 MCP diagnostic checks passed. Cluster health optimal.</span>
</div>`,

    'skills': `
<div class="term-line output">
<span class="text-cyan">Container & K8s :</span> Kubernetes, Docker, Helm, HPA, Containerd, Kind<br>
<span class="text-cyan">CI/CD & IaC     :</span> GitHub Actions, Terraform, Jenkins, Ansible, YAML<br>
<span class="text-cyan">Cloud & Linux   :</span> AWS (EC2/S3/IAM/VPC), GCP, HPE GreenLake, Enterprise Linux<br>
<span class="text-cyan">Observability   :</span> Prometheus, Grafana, ELK/Loki, RCA, MTTR reduction, MCP<br>
<span class="text-cyan">Automation/APIs :</span> Python 3, FastAPI, Bash, REST APIs, Redis, Pytest
</div>`,

    'get contact': `
<div class="term-line output">
<span class="text-cyan">Engineer :</span> Bharath Kumar J<br>
<span class="text-cyan">Email    :</span> mithuniyer01@gmail.com<br>
<span class="text-cyan">Phone    :</span> +91 9032246270<br>
<span class="text-cyan">Location :</span> Bengaluru, Karnataka, India<br>
<span class="text-cyan">LinkedIn :</span> https://www.linkedin.com/in/jbharathkumar/<br>
<span class="text-cyan">GitHub   :</span> https://github.com/Bharath-kumar-J<br>
<span class="text-cyan">Status   :</span> Available for immediate DevOps / SRE opportunities
</div>`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    
    // Echo user prompt
    const echoLine = document.createElement('div');
    echoLine.className = 'term-line';
    echoLine.innerHTML = `<span class="term-prompt">bharath@infra-k8s:~$</span> <span class="text-bright">${escapeHtml(rawCmd)}</span>`;
    output.appendChild(echoLine);

    if (cmd === 'clear') {
      output.innerHTML = '';
      return;
    }

    if (cmd === '') return;

    if (COMMANDS[cmd]) {
      const respLine = document.createElement('div');
      respLine.innerHTML = COMMANDS[cmd];
      output.appendChild(respLine);
    } else {
      const errorLine = document.createElement('div');
      errorLine.className = 'term-line output text-rose';
      errorLine.innerHTML = `zsh: command not found: ${escapeHtml(rawCmd)}. Type <span class="term-highlight">'help'</span> for supported commands.`;
      output.appendChild(errorLine);
    }

    output.scrollTop = output.scrollHeight;
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      executeCommand(val);
    }
  });

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      executeCommand(cmd);
      input.focus();
    });
  });
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/* ==========================================================================
   2. Interactive Live GCP Sentinel AI Simulator
   ========================================================================== */
const SCENARIOS = {
  'crashloop': {
    telemetry: `
<span class="text-cyan">MCP Tool:</span> call_tool("get_kubernetes_workloads", namespace="prod")<br>
<span class="text-rose">[ANOMALY DETECTED]</span> Pod: <span class="text-bright">order-service-78f99b-4k2x</span><br>
Status: <span class="text-rose">CrashLoopBackOff</span> (Exit Code 137 / SIGKILL)<br>
Restart Count: 6 restarts in last 8 minutes<br>
Last Termination Reason: <span class="text-amber">OOMKilled</span> (Memory limit 512Mi reached)<br>
Traffic Impact: 5xx surge on /checkout endpoint (4.2% fail rate)
    `,
    analysis: `
<span class="ai-sparkle">✦ DeepSeek AI Diagnosis:</span><br>
The pod <span class="text-cyan">order-service</span> is entering CrashLoopBackOff due to a container memory leak triggered by recent batch payload serialization.<br><br>
<span class="text-emerald">Autonomous Remediation Plan:</span><br>
1. Immediate: Adjust Deployment spec memory limit from 512Mi -> 1024Mi.<br>
2. Trigger rollout restart to drain dead pods.<br>
3. Alert SRE team with stack trace and dump SQLite event log fingerprint.<br>
<span class="text-dim">Cooldown: Alert suppression window set to 900s to avoid spam.</span>
    `
  },

  'cpu-spike': {
    telemetry: `
<span class="text-cyan">MCP Tool:</span> call_tool("get_compute_engine_metrics", zone="us-east1-b")<br>
<span class="text-amber">[WARNING]</span> Instance: <span class="text-bright">prod-worker-vm-03</span><br>
CPU Utilization: <span class="text-rose">98.4%</span> (Threshold: 85.0%)<br>
Run Queue Length: 14.8 (High context switching)<br>
Network Ingress: 820 Mbps (DDoS pattern ruled out; legitimate surge)
    `,
    analysis: `
<span class="ai-sparkle">✦ DeepSeek AI Diagnosis:</span><br>
Worker instance is saturated by high asynchronous task queue ingestion. Thread contention is causing latency degradation.<br><br>
<span class="text-emerald">Autonomous Remediation Plan:</span><br>
1. Scale Compute Engine Managed Instance Group (MIG) capacity (+2 VMs).<br>
2. Rebalance ingress routing across healthy zone replicas.<br>
3. Verified auto-recovery via metric scraper (expected return to 45% load).
    `
  },

  'sql-disk': {
    telemetry: `
<span class="text-cyan">MCP Tool:</span> call_tool("get_cloud_sql_telemetry", instance="pg-prod-primary")<br>
<span class="text-rose">[CRITICAL ALERT]</span> PostgreSQL Database Disk Usage<br>
Storage Used: <span class="text-rose">96.8%</span> of 500GB allocated<br>
Growth Rate: +4.2 GB/hour (WAL archive accumulation)<br>
Time to Complete Exhaustion: <span class="text-rose">~3.8 Hours</span>
    `,
    analysis: `
<span class="ai-sparkle">✦ DeepSeek AI Diagnosis:</span><br>
Cloud SQL database storage is approaching total write lock. Primary cause identified as unpurged WAL logs due to delayed replica replication.<br><br>
<span class="text-emerald">Autonomous Remediation Plan:</span><br>
1. Auto-resize disk quota via Terraform / GCP API from 500GB -> 750GB.<br>
2. Trigger VACUUM and optimize write-ahead log checkpoint retention.<br>
3. Dispatched P1 alert notification to Slack #sre-incidents and email.
    `
  },

  'oom-kill': {
    telemetry: `
<span class="text-cyan">MCP Tool:</span> call_tool("get_container_cgroup_metrics", pod="report-worker")<br>
<span class="text-amber">[ANOMALY DETECTED]</span> CGroup Memory Saturation<br>
Current Usage: 2046MB / 2048MB (99.9%)<br>
Kernel Event: <span class="text-rose">Memory cgroup out of memory: Killed process 4182 (python)</span><br>
Task: PDF report generation batch job
    `,
    analysis: `
<span class="ai-sparkle">✦ DeepSeek AI Diagnosis:</span><br>
Unbounded memory consumption in Python report worker when loading multi-gigabyte monthly metrics into pandas dataframe.<br><br>
<span class="text-emerald">Autonomous Remediation Plan:</span><br>
1. Partition batch jobs into 100MB chunk streams.<br>
2. Spawn worker with ephemeral disk swap mount.<br>
3. Fallback heuristic logic executed without waiting for human intervention.
    `
  }
};

function initSentinelSimulator() {
  const buttons = document.querySelectorAll('.scenario-btn');
  const telPanel = document.getElementById('sim-telemetry');
  const aiPanel = document.getElementById('sim-analysis');
  const rerunBtn = document.getElementById('btn-rerun-sim');

  if (!telPanel || !aiPanel) return;

  function loadScenario(key) {
    const sc = SCENARIOS[key];
    if (!sc) return;

    telPanel.innerHTML = '<span class="text-dim">Querying read-only MCP tools...</span>';
    aiPanel.innerHTML = '<span class="text-dim">DeepSeek reasoning engine analyzing telemetry...</span>';

    setTimeout(() => {
      telPanel.innerHTML = sc.telemetry;
    }, 250);

    setTimeout(() => {
      aiPanel.innerHTML = sc.analysis;
    }, 600);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const scKey = btn.getAttribute('data-scenario');
      loadScenario(scKey);
    });
  });

  if (rerunBtn) {
    rerunBtn.addEventListener('click', () => {
      const activeBtn = document.querySelector('.scenario-btn.active');
      const scKey = activeBtn ? activeBtn.getAttribute('data-scenario') : 'crashloop';
      loadScenario(scKey);
    });
  }

  // Load default
  loadScenario('crashloop');
}

/* ==========================================================================
   3. CI/CD Architecture Flow Explorer
   ========================================================================== */
const STAGE_DETAILS = {
  'stage-git': {
    title: 'Stage 01: Git Commit & Branch Protection',
    tech: 'Git • GitHub • Conventional Commits',
    desc: 'Developers commit modular changes following conventional commit syntax. Strict branch protection rules enforce passing CI gates, verified GPG commit signatures, and mandatory code reviews before merge.'
  },
  'stage-ci': {
    title: 'Stage 02: GitHub Actions Automated Build & Test Gate',
    tech: 'GitHub Actions • Pytest • Flake8 • Black',
    desc: 'Parallel GitHub Actions runners trigger automated Pytest suites (unit & integration tests), code style linting, and syntax verification. Builds fail fast if test coverage falls below target.'
  },
  'stage-sec': {
    title: 'Stage 03: Trivy DevSecOps & Container Image Vulnerability Audit',
    tech: 'Trivy Scanner • Container Security • Secret Detection',
    desc: 'Images are built with multi-stage Dockerfiles to minimize attack surface. Trivy scans application dependencies and base OS packages, automatically blocking builds with CRITICAL or HIGH CVEs.'
  },
  'stage-iac': {
    title: 'Stage 04: Terraform Infrastructure as Code (IaC) Sync',
    tech: 'Terraform • Declarative Cloud • State Locking',
    desc: 'Cloud networking, IAM service accounts, security groups, and storage buckets are managed declaratively. Terraform plan runs on PR review, and apply executes automatically upon authorized merge.'
  },
  'stage-k8s': {
    title: 'Stage 05: Kubernetes Zero-Downtime Rollout & HPA Autoscaling',
    tech: 'Kubernetes (Kind/EKS) • Rolling Updates • HPA',
    desc: 'Workloads deploy using zero-downtime rolling update strategies with configured liveness/readiness probes. Horizontal Pod Autoscaler dynamically scales pod replicas based on real-time CPU and request concurrency.'
  },
  'stage-obs': {
    title: 'Stage 06: Prometheus Observability & Grafana Telemetry',
    tech: 'Prometheus • Grafana • Alertmanager',
    desc: 'Prometheus scrapers poll application and node metrics every 15s. Custom Grafana dashboards monitor latency p99, error rates, and resource saturation, firing proactive alerts before customer impact.'
  }
};

function initPipelineExplorer() {
  const stages = document.querySelectorAll('.pipeline-stage');
  const titleEl = document.getElementById('detail-title');
  const techEl = document.getElementById('detail-tech');
  const descEl = document.getElementById('detail-desc');

  if (!stages.length || !titleEl) return;

  stages.forEach(st => {
    st.addEventListener('click', () => {
      stages.forEach(s => s.classList.remove('active'));
      st.classList.add('active');

      const stageKey = st.getAttribute('data-stage');
      const info = STAGE_DETAILS[stageKey];
      if (info) {
        titleEl.textContent = info.title;
        techEl.textContent = info.tech;
        descEl.textContent = info.desc;
      }
    });
  });
}

/* ==========================================================================
   4. Clipboard Helpers & Toast
   ========================================================================== */
function initCopyHandlers() {
  const toast = document.getElementById('toast-msg');

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  const emailChip = document.getElementById('chip-email');
  const phoneChip = document.getElementById('chip-phone');

  if (emailChip) {
    emailChip.addEventListener('click', (e) => {
      navigator.clipboard.writeText('mithuniyer01@gmail.com').catch(() => {});
      showToast('Copied email (mithuniyer01@gmail.com) to clipboard!');
    });
  }

  if (phoneChip) {
    phoneChip.addEventListener('click', (e) => {
      navigator.clipboard.writeText('+91 9032246270').catch(() => {});
      showToast('Copied phone (+91 9032246270) to clipboard!');
    });
  }
}
