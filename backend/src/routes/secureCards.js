import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.type('html').send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NameCard · Secure Card Builder</title>
  <!-- Use the same font as the public editor -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <!-- Load the shared NameCard stylesheet. Note: cdcwebsite/styles.css is not present in this deploy, so we omit it. -->
  <link rel="stylesheet" href="/cdcwebsite/styles.css" />
  <link rel="stylesheet" href="/nc-static/namecard.css" />
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a href="/nc-static/cdcwebsite/index.html#home" class="brand">
        <img src="/image/logoCDC.png" alt="CDC symbol" class="brand-logo" />
        <img src="/image/nom.png" alt="Cœur Du Ciel (CDC)" class="brand-wordmark" />
      </a>
      <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
        <span></span>
        <span></span>
      </button>
      <nav class="main-nav">
        <a href="/nc-static/cdcwebsite/index.html#home" class="nav-link">Home</a>
        <a href="/nc-static/cdcwebsite/index.html#about" class="nav-link">About</a>
        <a href="/nc-static/cdcwebsite/index.html#services" class="nav-link">Services</a>
        <a href="/nc-static/cdcwebsite/index.html#portfolio" class="nav-link">Portfolio</a>
        <a href="/nc-static/cdcwebsite/index.html#contact" class="nav-link">Contact</a>
        <a href="/secure-dashboard" class="nav-link">Dashboard</a>
      </nav>
    </div>
  </header>

  <main class="container">
    <h1>Secure NameCard Builder</h1>
    <p class="muted">Create database-backed NameCards for your staff. Scans will appear on the secure dashboard for your company.</p>

    <section id="access-section">
      <p id="accessInfo" class="muted"></p>
    </section>

    <section class="form-section" id="form-section" style="display:none;">
      <h2>Create NameCard</h2>
      <form id="card-form">
        <div class="field-row">
          <label>
            First name
            <input
              type="text"
              id="firstName"
              pattern="[A-Za-zÀ-ÿ\s'&#96;\-]+"
              title="Please use letters, spaces, hyphens or apostrophes only"
              inputmode="text"
              required
            />
          </label>
          <label>
            Last name
            <input
              type="text"
              id="lastName"
              pattern="[A-Za-zÀ-ÿ\s'&#96;\-]+"
              title="Please use letters, spaces, hyphens or apostrophes only"
              inputmode="text"
              required
            />
          </label>
        </div>

        <div class="field-row">
          <label>
            Mobile no.
            <input
              type="text"
              id="mobile"
              placeholder="+33 6 12 34 56 78"
              pattern="[0-9\s\(\)\+\-]{6,20}"
              title="Numbers, spaces, parentheses and + - characters only"
              inputmode="tel"
              required
            />
          </label>
          <label>
            Office no.
            <input
              type="text"
              id="office"
              placeholder="+33 1 23 45 67 89"
              pattern="[0-9\s\(\)\+\-]{6,20}"
              title="Numbers, spaces, parentheses and + - characters only"
              inputmode="tel"
            />
          </label>
        </div>

        <div class="field-row">
          <label>
            Company
            <input type="text" id="company" inputmode="text" />
          </label>
          <label>
            Post / Position
            <input type="text" id="position" inputmode="text" />
          </label>
        </div>

        <label>
          Email
          <input type="email" id="email" placeholder="name@example.com" />
        </label>

        <label>Address</label>
        <div class="field-row">
          <label>
            Street
            <input type="text" id="addressStreet" />
          </label>
          <label>
            City
            <input type="text" id="addressCity" />
          </label>
        </div>
        <div class="field-row">
          <label>
            State / Region
            <input type="text" id="addressRegion" />
          </label>
          <label>
            ZIP, Country
            <input type="text" id="addressZipCountry" />
          </label>
        </div>
          <div class="export-link-row" style="margin-top: 1rem;">
            <input type="file" id="bgImageInput" accept="image/*" style="display:none;" />
            <button type="button" id="changeBgBtn" class="export-link-button" style="margin-right:0.5rem;">Change background</button>
            <button type="button" id="toggleMoveModeBtn" class="export-link-button">Move text</button>
          </div>
          <div id="bgMenu" style="display:none; margin-top:0.5rem; padding:0.75rem; border:1px solid #ddd; border-radius:8px; background:#fff5ef; max-width:560px;">
            <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; width:100%;">
              <button type="button" id="bgUploadBtn" class="export-link-button">Choose image…</button>
              <button type="button" id="toggleMoveBgBtn" class="export-link-button">Move background</button>
            </div>
            <div style="display:flex; align-items:center; gap:10px; width:100%; margin-top:8px;">
              <label style="font-size:0.9rem; color:#555;"><input type="radio" name="bgFit" id="bgFitCover" value="cover" checked> Cover</label>
              <label style="font-size:0.9rem; color:#555;"><input type="radio" name="bgFit" id="bgFitContain" value="contain"> Contain</label>
              <label style="font-size:0.9rem; color:#555; margin-left:auto;">Overlay:
                <input type="range" id="bgOverlay" min="0" max="0.35" step="0.01" value="0.15" style="vertical-align:middle; width:180px; margin-left:0.35rem;">
              </label>
            </div>
          </div>
        </div>

        <div style="margin-top:0.8rem; display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap;">
          <button type="submit" id="createCardBtn" class="export-link-button">Create card</button>
          <button type="button" id="backToDashboardBtn" class="export-link-button">Back to dashboard</button>
        </div>
        <div id="createStatus" class="status"></div>
      </form>
    </section>

    <section id="preview-section" style="display:none;">
      <h2 style="font-size:1rem; margin:0 0 0.6rem 0; color:#333;">Live preview</h2>
      <div class="output-section">
        <div class="card-column">
          <div id="cardPreview" class="design-card" style="max-width: 560px; width: 100%;">
            <div class="design-text-block">
              <div class="design-header-row">
                <img src="/image/logoCDC.png" alt="CDC" class="design-logo" />
                <div class="design-header-text">
                  <div class="design-company" id="designCompany">Company</div>
                </div>
              </div>
              <div class="design-name" id="designName">Your Name</div>
              <div class="design-name-line"></div>
              <div class="design-position" id="designPosition">Post / Position</div>
              <div class="design-contact-row">
                <span class="design-contact-icon">☎</span>
                <span class="design-line" id="designPhones">+00 0000000000</span>
              </div>
              <div class="design-contact-row">
                <span class="design-contact-icon">✉</span>
                <span class="design-line" id="designEmail">name@example.com</span>
              </div>
              <div class="design-contact-row">
                <span class="design-contact-icon">📍</span>
                <span class="design-line" id="designAddress">Address will appear here</span>
              </div>
            </div>
          </div>
          <div class="export-link-row" style="margin-top: 1.5rem;">
            <button type="button" onclick="window.location.href='/nc-static/export.html'" class="export-link-button">Open export preview</button>
          </div>
        </div>
      </div>
    </section>

    <section id="result-section" style="display:none;">
      <h2 style="font-size:1rem; margin:0 0 0.6rem 0; color:#333;">Scan link &amp; QR</h2>
      <p class="muted">Share this link behind a QR code or short URL. Each scan will be logged in the secure dashboard.</p>
      <div class="output-section">
        <div class="qr-section">
          <p id="scanUrlText" style="font-size:0.85rem; word-break:break-all; margin-bottom:0.5rem;"></p>
          <div id="qrBox" class="qr-box"></div>
          <a id="openScanBtn" class="export-link-button" href="#" target="_blank" rel="noopener" style="margin-top:0.75rem; display:none;">Open preview page</a>
        </div>
      </div>
    </section>
  </main>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
  <script src="/secure-static/secure-bg.js"></script>
  <script src="/nc-static/script.js"></script>
  <script>
    (function() {
      var accessInfo = document.getElementById('accessInfo');
      var formSection = document.getElementById('form-section');
      var previewSection = document.getElementById('preview-section');
      var resultSection = document.getElementById('result-section');
      var cardForm = document.getElementById('card-form');
      var createCardBtn = document.getElementById('createCardBtn');
      var backToDashboardBtn = document.getElementById('backToDashboardBtn');
      var createStatus = document.getElementById('createStatus');
      var scanUrlText = document.getElementById('scanUrlText');
      var qrBox = document.getElementById('qrBox');
      var openScanBtn = document.getElementById('openScanBtn');

      var firstNameInput = document.getElementById('firstName');
      var lastNameInput = document.getElementById('lastName');
      var mobileInput = document.getElementById('mobile');
      var officeInput = document.getElementById('office');
      var companyInput = document.getElementById('company');
      var positionInput = document.getElementById('position');
      var emailInput = document.getElementById('email');
      var addressStreetInput = document.getElementById('addressStreet');
      var addressCityInput = document.getElementById('addressCity');
      var addressRegionInput = document.getElementById('addressRegion');
      var addressZipCountryInput = document.getElementById('addressZipCountry');

      var designNameEl = document.getElementById('designName');
      var designCompanyEl = document.getElementById('designCompany');
      var designPositionEl = document.getElementById('designPosition');
      var designPhonesEl = document.getElementById('designPhones');
      var designEmailEl = document.getElementById('designEmail');
      var designAddressEl = document.getElementById('designAddress');

      var authToken = '';
      var currentUser = null;

      var LOCAL_KEY_LAST = 'namecard_last';

      function saveLastDraft() {
        try {
          var data = {
            firstName: (firstNameInput && firstNameInput.value || '').trim(),
            lastName: (lastNameInput && lastNameInput.value || '').trim(),
            mobile: (mobileInput && mobileInput.value || '').trim(),
            office: (officeInput && officeInput.value || '').trim(),
            company: (companyInput && companyInput.value || '').trim(),
            position: (positionInput && positionInput.value || '').trim(),
            email: (emailInput && emailInput.value || '').trim(),
            addressStreet: (addressStreetInput && addressStreetInput.value || '').trim(),
            addressCity: (addressCityInput && addressCityInput.value || '').trim(),
            addressRegion: (addressRegionInput && addressRegionInput.value || '').trim(),
            addressZipCountry: (addressZipCountryInput && addressZipCountryInput.value || '').trim()
          };
          if (window.localStorage) {
            window.localStorage.setItem(LOCAL_KEY_LAST, JSON.stringify(data));
          }
        } catch (_) {}
      }

      function setStatus(message, type) {
        createStatus.textContent = message || '';
        createStatus.className = 'status' + (type ? ' ' + type : '');
      }

      function renderQr(text) {
        if (!qrBox) return;
        qrBox.innerHTML = '';
        if (!text) return;
        try {
          new QRCode(qrBox, {
            text: text,
            width: 256,
            height: 256,
            correctLevel: QRCode.CorrectLevel.L
          });
        } catch (e) {
          qrBox.textContent = 'Unable to generate QR code.';
        }
      }

      function updatePreview() {
        if (!designNameEl || !designCompanyEl || !designPositionEl || !designPhonesEl || !designEmailEl || !designAddressEl) {
          return;
        }

        var firstName = (firstNameInput && firstNameInput.value || '').trim();
        var lastName = (lastNameInput && lastNameInput.value || '').trim();
        var company = (companyInput && companyInput.value || '').trim();
        var position = (positionInput && positionInput.value || '').trim();
        var mobile = (mobileInput && mobileInput.value || '').trim();
        var office = (officeInput && officeInput.value || '').trim();
        var email = (emailInput && emailInput.value || '').trim();
        var street = (addressStreetInput && addressStreetInput.value || '').trim();
        var city = (addressCityInput && addressCityInput.value || '').trim();
        var region = (addressRegionInput && addressRegionInput.value || '').trim();
        var zipCountry = (addressZipCountryInput && addressZipCountryInput.value || '').trim();

        var nameDisplay = (firstName || lastName) ? (firstName + (firstName && lastName ? ' ' : '') + lastName) : 'Your Name';
        var companyDisplay = company || 'Company';
        var positionDisplay = position || 'Post / Position';

        var phones = [];
        if (mobile) phones.push(mobile);
        if (office) phones.push(office);
        var phonesDisplay = phones.length ? phones.join(' / ') : '+00 0000000000';

        var emailDisplay = email || 'name@example.com';

        var addressParts = [];
        if (street) addressParts.push(street);
        var cityLine = '';
        if (city) cityLine += city;
        if (zipCountry) {
          cityLine += (cityLine ? ' ' : '') + zipCountry;
        }
        if (region) {
          cityLine += (cityLine ? ', ' : '') + region;
        }
        if (cityLine) addressParts.push(cityLine);
        var addressDisplay = addressParts.length ? addressParts.join('\\n') : 'Address will appear here';

        designNameEl.textContent = nameDisplay;
        designCompanyEl.textContent = companyDisplay;
        designPositionEl.textContent = positionDisplay;
        designPhonesEl.textContent = phonesDisplay;
        designEmailEl.textContent = emailDisplay;
        designAddressEl.textContent = addressDisplay;
      }

      function loadAuth() {
        try {
          authToken = window.localStorage.getItem('nc_auth_token') || '';
          var userJson = window.localStorage.getItem('nc_auth_user');
          if (authToken && userJson) {
            currentUser = JSON.parse(userJson);
          }
        } catch (e) {
          authToken = '';
          currentUser = null;
        }
      }

      function initAccess() {
        loadAuth();
        if (!authToken || !currentUser) {
          accessInfo.textContent = 'You are not signed in. Use the secure dashboard login first, then return here. You will be redirected now.';
          formSection.style.display = 'none';
          if (previewSection) previewSection.style.display = 'none';
          resultSection.style.display = 'none';
          setTimeout(function() {
            window.location.href = '/secure-dashboard';
          }, 1500);
          return;
        }

        var role = currentUser.role;
        if (role === 'cdc_admin' || role === 'tenant_admin' || role === 'manager') {
          var companyName = currentUser.tenantName || '';
          if (companyName) {
            accessInfo.textContent = 'Signed in as ' + (currentUser.displayName || currentUser.email || 'user') + ' (' + role + ') for ' + companyName + '.';
          } else {
            accessInfo.textContent = 'Signed in as ' + (currentUser.displayName || currentUser.email || 'user') + ' (' + role + ').';
          }
          formSection.style.display = 'block';
          if (previewSection) previewSection.style.display = 'block';
          updatePreview();
        } else {
          accessInfo.textContent = 'Your role (' + role + ') does not allow creating NameCards. Please contact your administrator.';
          formSection.style.display = 'none';
          if (previewSection) previewSection.style.display = 'none';
          resultSection.style.display = 'none';
        }
      }

      if (backToDashboardBtn) {
        backToDashboardBtn.addEventListener('click', function() {
          window.location.href = '/secure-dashboard';
        });
      }

      if (cardForm) {
        cardForm.addEventListener('submit', function(evt) {
          evt.preventDefault();

          if (!authToken) {
            setStatus('Missing auth token. Please sign in via the secure dashboard first.', 'error');
            return;
          }

          var firstName = (firstNameInput.value || '').trim();
          var lastName = (lastNameInput.value || '').trim();
          var mobile = (mobileInput.value || '').trim();

          if (!firstName || !lastName || !mobile) {
            setStatus('Please fill at least first name, last name and mobile.', 'error');
            return;
          }

          var office = (officeInput.value || '').trim();
          var company = (companyInput.value || '').trim();
          var position = (positionInput.value || '').trim();
          var email = (emailInput.value || '').trim();
          var street = (addressStreetInput.value || '').trim();
          var city = (addressCityInput.value || '').trim();
          var region = (addressRegionInput.value || '').trim();
          var zipCountry = (addressZipCountryInput.value || '').trim();

          // Persist latest draft so export/preview pages mirror the same content
          saveLastDraft();

          // Use a literal "\\n" in the client script so the address uses line breaks
          // without breaking this server-side template string.
          var address = [street, city, region, zipCountry].filter(function(s) { return s; }).join('\\n');

          createCardBtn.disabled = true;
          setStatus('Creating card…', '');

          fetch('/api/cards', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': authToken
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              mobile: mobile,
              office: office,
              company: company,
              position: position,
              email: email,
              address: address,
              street: street,
              city: city,
              region: region,
              zipCountry: zipCountry
            })
          })
            .then(function(resp) { return resp.json(); })
            .then(function(data) {
              createCardBtn.disabled = false;
              if (!data || !data.success || !data.card || !data.card.scanUrl) {
                setStatus((data && data.message) || 'Failed to create card.', 'error');
                return;
              }

              var scanUrl = data.card.scanUrl;
              scanUrlText.textContent = scanUrl;
              renderQr(scanUrl);
              resultSection.style.display = 'block';
              if (openScanBtn) { openScanBtn.href = scanUrl; openScanBtn.style.display = 'inline-flex'; }
              try { if (window.localStorage) localStorage.setItem('namecard_last_scanUrl', scanUrl); } catch(_){ }
              setStatus('Card created.', 'ok');
            })
            .catch(function(err) {
              console.error('Error creating card via secure builder:', err);
              createCardBtn.disabled = false;
              setStatus('Error while creating card.', 'error');
            });
        });
      }

      var previewInputs = [
        firstNameInput,
        lastNameInput,
        emailInput,
        addressStreetInput,
        addressCityInput,
        addressRegionInput,
        addressZipCountryInput,
        mobileInput,
        officeInput,
        companyInput,
        positionInput
      ];

      previewInputs.forEach(function(el) {
        if (!el) return;
        el.addEventListener('input', function() {
          updatePreview();
          saveLastDraft();
        });
      });

      initAccess();
    })();
  </script>
</body>
</html>`);
});

export default router;

