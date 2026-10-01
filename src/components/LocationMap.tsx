// Keyless Google Maps embed — no API key or third-party account needed.
export default function LocationMap() {
  return (
    <div style={{ width: '100%', height: '420px' }}>
      <iframe
        title="Truhlářstvím za štěstím — mapa"
        src="https://maps.google.com/maps?q=U+Elektry+650%2F2%2C+198+00+Praha+9&t=&z=15&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style={{ display: 'block', border: 'none', filter: 'grayscale(20%)' }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
