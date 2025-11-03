export function loadGoogleMaps(apiKey) {
  return new Promise((resolve, reject) => {
    
    if (window.google?.maps) return resolve(window.google)

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker&v=beta`

    script.onload = () => resolve(window.google)
    script.onerror = reject

    document.head.appendChild(script)
  })
}
