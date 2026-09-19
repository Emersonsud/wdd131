// ---------- Footer: current year and last modified ----------
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ---------- Wind chill ----------
// Static values for now (the course doesn't use real-time API data yet)
const temperature = 82; // °F
const windSpeed = 6; // mph

// Wind chill formula (imperial units), as a one-line return
function calculateWindChill(tempF, windMph) {
  return (
    35.74 +
    0.6215 * tempF -
    35.75 * Math.pow(windMph, 0.16) +
    0.4275 * tempF * Math.pow(windMph, 0.16)
  );
}

// Only calculate if conditions are valid: temp <= 50°F and wind > 3 mph
const windChillEl = document.getElementById("windChill");

if (temperature <= 50 && windSpeed > 3) {
  const windChill = calculateWindChill(temperature, windSpeed);
  windChillEl.textContent = `${windChill.toFixed(1)} °F`;
} else {
  windChillEl.textContent = "N/A";
}
