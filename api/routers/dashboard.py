"""
app/routers/dashboard.py
-------------------------
Interactive Test Console for ListingLab API.
Zero external CDN dependencies - 100% self-contained so it works in any browser,
even with strict privacy shields or offline.
"""
from fastapi import APIRouter
from fastapi.responses import HTMLResponse

router = APIRouter(tags=["dashboard"])

DASHBOARD_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ListingLab API Console</title>
  <style>
    :root {
      --bg: #14100C;
      --card-bg: #1D1712;
      --card-border: rgba(232, 220, 200, 0.15);
      --accent: #FF7A30;
      --text: #E8DCC8;
      --text-muted: #B8AC96;
      --success: #34D399;
      --code-bg: #0C0A08;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 24px;
      line-height: 1.5;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--card-border);
      margin-bottom: 24px;
    }
    .title { font-size: 24px; font-weight: bold; color: var(--accent); }
    .status-badge {
      background: rgba(52, 211, 153, 0.15);
      color: var(--success);
      border: 1px solid rgba(52, 211, 153, 0.3);
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 24px;
    }
    @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 20px;
    }
    .card-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .badge-method {
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: bold;
    }
    .post { background: #059669; color: white; }
    .get { background: #2563EB; color: white; }
    .form-group { margin-bottom: 12px; }
    label { display: block; font-size: 13px; color: var(--text-muted); margin-bottom: 6px; }
    input[type="file"], input[type="text"] {
      width: 100%;
      padding: 10px;
      background: var(--code-bg);
      border: 1px solid var(--card-border);
      border-radius: 6px;
      color: var(--text);
      font-size: 14px;
    }
    button {
      background: var(--accent);
      color: #14100C;
      font-weight: bold;
      border: none;
      padding: 10px 18px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: opacity 0.2s;
    }
    button:hover { opacity: 0.9; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    pre {
      background: var(--code-bg);
      border: 1px solid var(--card-border);
      border-radius: 6px;
      padding: 12px;
      font-size: 12px;
      font-family: monospace;
      color: #A7F3D0;
      overflow-x: auto;
      max-height: 220px;
      margin-top: 12px;
    }
    .preview-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 12px;
      margin-top: 14px;
    }
    .preview-card {
      background: var(--code-bg);
      border: 1px solid var(--card-border);
      border-radius: 6px;
      padding: 8px;
      text-align: center;
    }
    .preview-card img {
      width: 100%;
      height: 120px;
      object-fit: cover;
      border-radius: 4px;
    }
    .preview-card a {
      color: var(--accent);
      font-size: 11px;
      text-decoration: none;
      display: block;
      margin-top: 4px;
      word-break: break-all;
    }
    .preview-card span { font-size: 12px; font-weight: bold; display: block; margin-bottom: 4px; }
    .savings-badge {
      display: inline-block;
      background: rgba(52, 211, 153, 0.2);
      color: var(--success);
      padding: 6px 12px;
      border-radius: 6px;
      font-weight: bold;
      margin-top: 8px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="title">ListingLab API Test Console</div>
      <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">FastAPI Backend ↔ Cloudinary Integration</div>
    </div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <a href="/docs" style="color: var(--accent); font-size: 13px;">Swagger Docs</a>
      <a href="/openapi.json" style="color: var(--accent); font-size: 13px;">OpenAPI JSON</a>
      <span class="status-badge">● API Active</span>
    </div>
  </div>

  <div class="grid">
    <!-- Upload Section -->
    <div class="card">
      <div class="card-title">
        <span class="badge-method post">POST</span>
        <span>/api/upload</span>
      </div>
      <div class="form-group">
        <label>Select an image to upload</label>
        <input type="file" id="uploadFile" accept="image/*">
      </div>
      <button id="uploadBtn" onclick="handleUpload()">Upload Image</button>
      <div id="uploadStatus" style="font-size: 12px; color: var(--text-muted); margin-top: 8px;"></div>
      <pre id="uploadOutput">// Upload result will appear here...</pre>
    </div>

    <!-- Process Section -->
    <div class="card">
      <div class="card-title">
        <span class="badge-method get">GET</span>
        <span>/api/process</span>
      </div>
      <div class="form-group">
        <label>Cloudinary Public ID</label>
        <input type="text" id="processPublicId" placeholder="e.g. listinglab/originals/sample">
      </div>
      <button id="processBtn" onclick="handleProcess()">Generate Transformations</button>
      <div id="savingsContainer" style="display: none;">
        <span class="savings-badge" id="savingsBadge">Size Saved: --%</span>
      </div>
      <div class="preview-container" id="processPreviews"></div>
      <pre id="processOutput">// Transformation result will appear here...</pre>
    </div>

    <!-- Library Section -->
    <div class="card">
      <div class="card-title">
        <span class="badge-method get">GET</span>
        <span>/api/library</span>
      </div>
      <button onclick="handleLibrary()">Fetch Cloudinary Library</button>
      <div class="preview-container" id="libraryPreviews"></div>
      <pre id="libraryOutput">// Library items will appear here...</pre>
    </div>

    <!-- Stats Section -->
    <div class="card">
      <div class="card-title">
        <span class="badge-method get">GET</span>
        <span>/api/stats</span>
      </div>
      <button onclick="handleStats()">Fetch Analytics Stats</button>
      <pre id="statsOutput">// Analytics stats will appear here...</pre>
    </div>
  </div>

  <script>
    async function handleUpload() {
      const fileInput = document.getElementById('uploadFile');
      if (!fileInput.files[0]) {
        alert('Please choose an image file first.');
        return;
      }
      const btn = document.getElementById('uploadBtn');
      const status = document.getElementById('uploadStatus');
      const output = document.getElementById('uploadOutput');
      
      btn.disabled = true;
      status.textContent = 'Uploading to Cloudinary...';
      output.textContent = '// Uploading...';
      
      try {
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        output.textContent = JSON.stringify(data, null, 2);
        
        if (res.ok && data.publicId) {
          status.textContent = 'Uploaded successfully!';
          document.getElementById('processPublicId').value = data.publicId;
          handleProcess();
        } else {
          status.textContent = 'Upload error: ' + (data.message || res.statusText);
        }
      } catch (err) {
        output.textContent = '// Network error: ' + err.message;
        status.textContent = 'Error connecting to backend.';
      } finally {
        btn.disabled = false;
      }
    }

    async function handleProcess() {
      const publicId = document.getElementById('processPublicId').value.trim();
      if (!publicId) {
        alert('Please enter or upload an image to get a publicId.');
        return;
      }
      const output = document.getElementById('processOutput');
      const previews = document.getElementById('processPreviews');
      const savingsContainer = document.getElementById('savingsContainer');
      const savingsBadge = document.getElementById('savingsBadge');
      
      output.textContent = '// Processing transformations...';
      previews.innerHTML = '';
      savingsContainer.style.display = 'none';

      try {
        const res = await fetch('/api/process?publicId=' + encodeURIComponent(publicId));
        const data = await res.json();
        output.textContent = JSON.stringify(data, null, 2);

        if (res.ok && data.urls) {
          savingsBadge.textContent = 'Size Saved: ' + data.sizeSavedPct + '%';
          savingsContainer.style.display = 'block';

          const platforms = ['original', 'optimized', 'instagram', 'feed', 'marketplace', 'banner'];
          platforms.forEach(p => {
            if (data.urls[p]) {
              const card = document.createElement('div');
              card.className = 'preview-card';
              card.innerHTML = `
                <span>${p.toUpperCase()}</span>
                <img src="${data.urls[p]}" alt="${p}" loading="lazy">
                <a href="${data.urls[p]}" target="_blank">Open URL</a>
              `;
              previews.appendChild(card);
            }
          });
        }
      } catch (err) {
        output.textContent = '// Network error: ' + err.message;
      }
    }

    async function handleLibrary() {
      const output = document.getElementById('libraryOutput');
      const previews = document.getElementById('libraryPreviews');
      output.textContent = '// Fetching library...';
      previews.innerHTML = '';

      try {
        const res = await fetch('/api/library');
        const data = await res.json();
        output.textContent = JSON.stringify(data, null, 2);

        if (res.ok && Array.isArray(data)) {
          data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'preview-card';
            card.innerHTML = `
              <span>${item.publicId.split('/').pop()}</span>
              <img src="${item.thumbUrl}" alt="thumb" loading="lazy">
              <span style="font-size: 11px; color: var(--text-muted);">${new Date(item.createdAt).toLocaleDateString()}</span>
            `;
            card.style.cursor = 'pointer';
            card.onclick = () => {
              document.getElementById('processPublicId').value = item.publicId;
              handleProcess();
            };
            previews.appendChild(card);
          });
        }
      } catch (err) {
        output.textContent = '// Network error: ' + err.message;
      }
    }

    async function handleStats() {
      const output = document.getElementById('statsOutput');
      output.textContent = '// Fetching stats...';

      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        output.textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        output.textContent = '// Network error: ' + err.message;
      }
    }

    window.addEventListener('DOMContentLoaded', () => {
      handleStats();
      handleLibrary();
    });
  </script>
</body>
</html>
"""

@router.get("/", response_class=HTMLResponse, include_in_schema=False)
@router.get("/dashboard", response_class=HTMLResponse, include_in_schema=False)
async def dashboard():
    """Serve the self-contained ListingLab test dashboard."""
    return DASHBOARD_HTML
