document.getElementById("search-btn").addEventListener("click", async () => {

  const input = document.getElementById("city-input").value.trim();
  const card = document.getElementById("weather-card");
  const map = document.getElementById("map-frame");

  if (!input) {
    card.innerHTML = "⚠ Escribe una ciudad de México";
    return;
  }

  card.innerHTML = "🔄 Buscando datos en México...";

  try {

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input + ", Mexico")}&limit=1`
    );

    const data = await res.json();

    if (!data.length) {
      card.innerHTML = "❌ Ciudad no encontrada en México";
      return;
    }

    const lugar = data[0];

    // Simulación clima
    const temp = (Math.random() * 30 + 5).toFixed(1);
    const hum = Math.floor(Math.random() * 100);

    // Iconos según clima
    const icons = ["☀️", "🌤️", "⛅", "🌧️", "⛈️"];
    const icon = icons[Math.floor(Math.random() * icons.length)];

    // Separar ciudad bonito
    const display = lugar.display_name.split(",").slice(0, 3).join(",");

    card.innerHTML = `
      <div class="weather-icon">${icon}</div>

      <h2>${input}, México</h2>

      <p>${display}</p>

      <hr style="margin:10px 0; border:1px solid #38bdf8">

      <p><b>🌡 Temperatura de lugar:</b> ${temp}°C</p>
      <p><b>💧 Humedad:</b> ${hum}%</p>
      <p><b>📍 Lat:</b> ${lugar.lat}</p>
      <p><b>📍 Lng:</b> ${lugar.lon}</p>
    `;

    // MAPA GOOGLE
    map.src = `https://www.google.com/maps?q=${lugar.lat},${lugar.lon}&z=12&output=embed`;

  } catch (err) {
    card.innerHTML = "❌ Error de conexión";
  }

});