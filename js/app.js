// Renderuje całą stronę na podstawie danych z js/data.js. Nie ma kroku budowania —
// wystarczy edytować data.js i odświeżyć stronę.

(function () {
  "use strict";

  // Kolory tras — zsynchronizowane z paletą w css/style.css (--trip-1 itd.).
  // Leaflet ustawia kolory jako atrybuty SVG (nie przez arkusz stylów), więc
  // tu używamy wprost wartości hex zamiast var(), dla pewnej zgodności.
  const TRIP_COLORS = {
    "trip-1": "#0f8b9c",
    "trip-2": "#c1603c",
    "trip-3": "#d69a3e",
    "trip-4": "#7a6a9c",
  };

  // ---------- Google Maps helpery ----------

  function gmapsShow(lat, lng) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }

  function gmapsNav(lat, lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }

  function gmapsFullRoute(hotel, stops) {
    const origin = `${hotel.lat},${hotel.lng}`;
    const waypoints = stops.map((p) => `${p.lat},${p.lng}`).join("|");
    const params = new URLSearchParams({
      api: "1",
      origin,
      destination: origin,
    });
    let url = `https://www.google.com/maps/dir/?${params.toString()}`;
    if (waypoints) url += `&waypoints=${encodeURIComponent(waypoints)}`;
    return url;
  }

  function mapButtons(lat, lng, size) {
    const cls = size === "sm" ? "btn btn--sm" : "btn";
    return `
      <div class="point-actions">
        <a class="${cls} btn--outline" href="${gmapsShow(lat, lng)}" target="_blank" rel="noopener">Pokaż w Google Maps</a>
        <a class="${cls} btn--solid" href="${gmapsNav(lat, lng)}" target="_blank" rel="noopener">Nawiguj</a>
      </div>`;
  }

  function esc(s) {
    const div = document.createElement("div");
    div.textContent = s == null ? "" : String(s);
    return div.innerHTML;
  }

  // ---------- Leaflet ikony ----------

  function pinIcon({ label, colorClass, size = 30, extraClass = "" }) {
    return L.divIcon({
      className: "",
      html: `<div class="pin ${colorClass} ${extraClass}"><span>${label}</span></div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2],
    });
  }

  function hotelIcon() {
    return pinIcon({ label: "🏨", colorClass: "pin--hotel", size: 34 });
  }

  function kebabIcon() {
    return pinIcon({ label: "🍢", colorClass: "pin--kebab", size: 28 });
  }

  // ---------- Popup content ----------

  // Więcej miejsca na auto-panowanie od góry, bo popup domyślnie otwiera się nad pinezką
  // (a mapy na telefonie są niskie, więc łatwo o przycięcie przy górnej krawędzi).
  const POPUP_OPTIONS = { autoPanPadding: [16, 70] };

  function popupHtml(name, time, desc) {
    return `<div class="leaflet-popup-custom">
      <strong>${esc(name)}</strong>${time ? ` <span class="muted small">· ${esc(time)}</span>` : ""}
      ${desc ? `<p>${esc(desc)}</p>` : ""}
    </div>`;
  }

  // ---------- Render: karta hotelu ----------

  function renderHotelCard() {
    const el = document.getElementById("hotel-card");
    el.innerHTML = `
      <h2>🏨 ${esc(HOTEL.name)}</h2>
      <p class="muted">${esc(HOTEL.address)} · ${HOTEL.lat}, ${HOTEL.lng}</p>
      ${mapButtons(HOTEL.lat, HOTEL.lng)}
    `;
  }

  // ---------- Render: rozkład tygodnia ----------

  function renderWeekPlan() {
    const list = document.getElementById("week-plan-list");
    list.innerHTML = WEEK_PLAN.map(
      (d) => `<li><span class="week-plan__day">${esc(d.day)}</span><span>${esc(d.plan)}</span></li>`
    ).join("");
    document.getElementById("week-plan-note").textContent = WEEK_PLAN_NOTE;
  }

  // ---------- Render: mapa ogólna ----------

  function renderOverviewMap() {
    const map = L.map("map-overview", { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> współtwórcy',
    }).addTo(map);

    const bounds = [];

    L.marker([HOTEL.lat, HOTEL.lng], { icon: hotelIcon() })
      .addTo(map)
      .bindPopup(popupHtml(HOTEL.name, "baza", HOTEL.address), POPUP_OPTIONS);
    bounds.push([HOTEL.lat, HOTEL.lng]);

    TRIPS.forEach((trip) => {
      trip.points
        .filter((p) => p.kind === "poi" || p.kind === "meal")
        .forEach((p) => {
          const marker = L.circleMarker([p.lat, p.lng], {
            radius: 9,
            weight: 2,
            color: "#fff",
            fillColor: TRIP_COLORS[trip.color] || "#0f8b9c",
            fillOpacity: 1,
            className: `dot ${trip.color}`,
          }).addTo(map);
          marker.bindPopup(popupHtml(`${trip.number}.${p.name}`, p.time, trip.title), POPUP_OPTIONS);
          bounds.push([p.lat, p.lng]);
        });
    });

    KEBABS.forEach((k) => {
      L.marker([k.lat, k.lng], { icon: kebabIcon() })
        .addTo(map)
        .bindPopup(popupHtml(k.name, "kebab", k.place), POPUP_OPTIONS);
      bounds.push([k.lat, k.lng]);
    });

    if (bounds.length) map.fitBounds(bounds, { padding: [24, 24] });
  }

  // ---------- Render: sekcja wycieczki ----------

  function pointPhotosHtml(point) {
    const photos = point.photos || (point.photo ? [point.photo] : []);
    if (!photos.length) return "";
    return `<div class="point-photos${photos.length > 1 ? " point-photos--multi" : ""}">
      ${photos
        .map(
          (src) => `<img src="img/${src}" alt="${esc(point.photoAlt || point.name)}" loading="lazy" decoding="async">`
        )
        .join("")}
    </div>`;
  }

  function renderTripCard(point, num, colorClass) {
    const icon = point.kind === "meal" ? "🍽️" : "📍";
    return `
      <li class="timeline-item timeline-item--stop ${colorClass}">
        <div class="timeline-num">${num}</div>
        <div class="timeline-body card">
          <div class="timeline-head">
            <span class="timeline-time">${esc(point.time)}</span>
            <h3>${icon} ${esc(point.name)}</h3>
          </div>
          ${pointPhotosHtml(point)}
          ${point.desc ? `<p>${esc(point.desc)}</p>` : ""}
          ${mapButtons(point.lat, point.lng)}
          ${
            point.alt
              ? `<div class="alt-box">
                  <p class="alt-box__label">Alternatywa: ${esc(point.alt.name)}</p>
                  ${point.alt.desc ? `<p class="muted small">${esc(point.alt.desc)}</p>` : ""}
                  ${mapButtons(point.alt.lat, point.alt.lng, "sm")}
                </div>`
              : ""
          }
        </div>
      </li>`;
  }

  function renderHotelLeg(point) {
    const label = point.kind === "hotel-start" ? "Start" : "Koniec";
    return `
      <li class="timeline-item timeline-item--hotel">
        <div class="timeline-num timeline-num--hotel">🏨</div>
        <div class="timeline-body">
          <span class="timeline-time">${esc(point.time)}</span>
          <strong>${esc(point.name)}</strong>
          ${point.desc ? `<p class="muted small">${esc(point.desc)}</p>` : ""}
        </div>
      </li>`;
  }

  function renderTripSection(trip) {
    const numbered = trip.points.filter((p) => p.kind === "poi" || p.kind === "meal");
    numbered.forEach((p, i) => (p._num = i + 1));

    const timelineHtml = trip.points
      .map((p) => (p._num ? renderTripCard(p, p._num, trip.color) : renderHotelLeg(p)))
      .join("");

    const routeUrl = gmapsFullRoute(HOTEL, numbered);

    const section = document.createElement("section");
    section.className = "section trip-section";
    section.id = trip.id;
    section.innerHTML = `
      <h2 class="section-title">
        <span class="trip-badge ${trip.color}">${trip.number}</span>
        ${esc(trip.title)}
        <span class="trip-subtitle">— ${esc(trip.subtitle)}</span>
      </h2>
      <div class="card">
        <p class="muted"><strong>Transport:</strong> ${esc(trip.transport)}</p>
        <a class="btn btn--solid btn--wide ${trip.color}" href="${routeUrl}" target="_blank" rel="noopener">🗺️ Cała trasa w Google Maps</a>
      </div>
      <div class="card">
        <div class="map map--trip" id="map-${trip.id}"></div>
        <p class="map-attribution">Mapa: © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a></p>
      </div>
      <ol class="timeline">${timelineHtml}</ol>
    `;
    document.getElementById("trips-container").appendChild(section);

    renderTripMap(trip, numbered);
  }

  function renderTripMap(trip, numbered) {
    const map = L.map(`map-${trip.id}`, { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> współtwórcy',
    }).addTo(map);

    const bounds = [];
    const routeLatLngs = [];

    routeLatLngs.push([HOTEL.lat, HOTEL.lng]);
    L.marker([HOTEL.lat, HOTEL.lng], { icon: hotelIcon() })
      .addTo(map)
      .bindPopup(popupHtml(HOTEL.name, "start / koniec", ""), POPUP_OPTIONS);
    bounds.push([HOTEL.lat, HOTEL.lng]);

    numbered.forEach((p) => {
      routeLatLngs.push([p.lat, p.lng]);
      L.marker([p.lat, p.lng], { icon: pinIcon({ label: p._num, colorClass: trip.color }) })
        .addTo(map)
        .bindPopup(popupHtml(`${p._num}. ${p.name}`, p.time, p.desc), POPUP_OPTIONS);
      bounds.push([p.lat, p.lng]);

      if (p.alt) {
        L.marker([p.alt.lat, p.alt.lng], {
          icon: pinIcon({ label: "±", colorClass: trip.color, size: 24, extraClass: "pin--alt" }),
        })
          .addTo(map)
          .bindPopup(popupHtml(`Alternatywa: ${p.alt.name}`, "", p.alt.desc), POPUP_OPTIONS);
        bounds.push([p.alt.lat, p.alt.lng]);
      }
    });

    routeLatLngs.push([HOTEL.lat, HOTEL.lng]);
    L.polyline(routeLatLngs, {
      color: TRIP_COLORS[trip.color] || "#0f8b9c",
      weight: 4,
      opacity: 0.85,
      dashArray: "1,8",
      className: `route-line ${trip.color}`,
    }).addTo(map);

    if (bounds.length) map.fitBounds(bounds, { padding: [28, 28] });
  }

  // ---------- Render: taby wycieczek w nawigacji ----------

  function renderTripTabs() {
    const anchor = document.getElementById("trip-tabs-anchor");
    const frag = document.createDocumentFragment();
    TRIPS.forEach((trip) => {
      const a = document.createElement("a");
      a.href = `#${trip.id}`;
      a.className = "tab";
      a.textContent = `${trip.number}. ${trip.title}`;
      frag.appendChild(a);
    });
    anchor.replaceWith(frag);
  }

  // ---------- Render: transport ----------

  function renderTransport() {
    document.getElementById("transport-intro").textContent = TRANSPORT_INFO.intro;
    document.getElementById("transport-options").innerHTML = TRANSPORT_INFO.options
      .map((o) => `<div class="option"><h3>${esc(o.title)}</h3><p>${esc(o.desc)}</p></div>`)
      .join("");

    if (TRANSPORT_INFO.bus) {
      document.getElementById("transport-bus").innerHTML = `
        <h3>🚌 ${esc(TRANSPORT_INFO.bus.title)}</h3>
        <p>${esc(TRANSPORT_INFO.bus.desc)}</p>
      `;
    }
  }

  // ---------- Render: kebaby ----------

  function renderKebabs() {
    document.getElementById("kebaby-list").innerHTML = KEBABS.map(
      (k) => `
      <div class="card">
        <h3>🍢 ${esc(k.name)}</h3>
        <p class="muted small">${esc(k.place)}</p>
        <p>${esc(k.desc)}</p>
        ${mapButtons(k.lat, k.lng)}
      </div>`
    ).join("");
  }

  // ---------- Render: praktyczne info ----------

  function renderPracticalInfo() {
    const i = PRACTICAL_INFO;
    document.getElementById("info-card").innerHTML = `
      <ul class="info-list">
        <li>🌡️ ${esc(i.weather)}</li>
        <li>🌅 ${esc(i.sunrise)}</li>
        <li>🌇 ${esc(i.sunset)}</li>
      </ul>
      <p class="muted small">${esc(i.note)}</p>
    `;
  }

  // ---------- Render: źródła zdjęć ----------

  function renderCredits() {
    document.getElementById("credits-list").innerHTML = PHOTO_CREDITS.map(
      (c) => `
      <li>
        <strong>${esc(c.title)}</strong> — autor: ${esc(c.author)},
        licencja: <a href="${c.licenseUrl}" target="_blank" rel="noopener">${esc(c.license)}</a>,
        <a href="${c.sourceUrl}" target="_blank" rel="noopener">źródło na Wikimedia Commons</a>
      </li>`
    ).join("");
  }

  // ---------- Menu (hamburger) ----------

  function initMenu() {
    const toggle = document.getElementById("menu-toggle");
    const tabbar = document.getElementById("tabbar");

    function closeMenu() {
      tabbar.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }
    function openMenu() {
      tabbar.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", () => {
      if (tabbar.hidden) openMenu();
      else closeMenu();
    });

    // zamknij po kliknięciu w link (zakładkę)
    tabbar.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeMenu();
    });

    // zamknij po kliknięciu poza menu
    document.addEventListener("click", (e) => {
      if (tabbar.hidden) return;
      if (tabbar.contains(e.target) || toggle.contains(e.target)) return;
      closeMenu();
    });

    // zamknij klawiszem Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !tabbar.hidden) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  // ---------- Scrollspy dla nawigacji ----------

  function initScrollspy() {
    const tabs = Array.from(document.querySelectorAll(".tab"));
    const sections = tabs
      .map((t) => document.querySelector(t.getAttribute("href")))
      .filter(Boolean);

    const byId = new Map(tabs.map((t) => [t.getAttribute("href").slice(1), t]));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tabs.forEach((t) => t.classList.remove("is-active"));
            const tab = byId.get(entry.target.id);
            if (tab) tab.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
  }

  // ---------- Init ----------

  document.addEventListener("DOMContentLoaded", () => {
    renderHotelCard();
    renderWeekPlan();
    renderTripTabs();
    TRIPS.forEach(renderTripSection);
    renderTransport();
    renderKebabs();
    renderPracticalInfo();
    renderCredits();
    renderOverviewMap();
    initScrollspy();
    initMenu();
  });
})();
