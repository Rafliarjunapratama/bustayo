// Inisialisasi Peta
var map = L.map('map').setView([-6.200000, 106.816666], 13);  // Koordinat Jakarta

// Set Tile Layer OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Ikon Mobil
var carIcon = L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=KXKIFxpA3E9g&format=png&color=000000',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});



// Ikon Halte Bus
var busStopIcon = L.icon({
    iconUrl: 'https://img.icons8.com/fluency/48/bus-stop.png',  // URL untuk ikon halte bus
    iconSize: [40, 40],  // Ukuran ikon
    iconAnchor: [20, 20]  // Anchor poin ikon
});

// Titik-titik yang ditambahkan (dari bawah ke atas)
var locations = [
    { name: "CBD Ciledug", coords: [-6.224506016506443, 106.70850145228289] },
    { name: "SDN PONDOK Bahar 4/ Ciledug Indah", coords: [-6.221951338605795, 106.69907122419416] },
    { name: "Sudirmara Pinang", coords: [-6.221291392595264, 106.68843416919593] },
    { name: "Mts", coords: [-6.215603104495711, 106.6880399140661] },
    { name: "Kunciran", coords: [-6.214287270339439, 106.6779934710267] },
    { name: "Kenanga 1", coords: [-6.137129473486055, 106.67419988278213] },
    { name: "Poris Plawad Indah", coords: [-6.190632640874684, 106.66870786925428] },
    { name: "Poris Plawad", coords: [-6.171999618604605, 106.66461407593208] },
    { name: "RS Emc", coords: [-6.1843846667080795, 106.64772926577469] },
    { name: "Veteran", coords: [-6.184558692626777, 106.64177749182863] },
    { name: "Laksa Kor.3", coords: [-6.191147772249799, 106.63841864323523] },
    { name: "Tangcity Mall Sisi Belakang/ Lobi Perintis", coords: [-6.193308188698745, 106.63326828710218] },
];

// Menambahkan marker untuk setiap lokasi dengan ikon halte bus
locations.forEach(function(location) {
    L.marker(location.coords, { icon: busStopIcon })  // Menggunakan ikon halte bus
        .addTo(map)
        .bindPopup(location.name);  // Menampilkan nama lokasi saat marker diklik
});

// Routing Control untuk rute dari titik A ke titik B
var routeControl = L.Routing.control({
    waypoints: [],  // Akan diisi kemudian dengan lokasi pengguna dan terminal terdekat
    createMarker: function() { return null; },  // Menghilangkan marker default
    routeWhileDragging: true,   
    show: false  // Menonaktifkan instruksi di peta
}).addTo(map);

// *** Kode GPS Lokasi Perangkat Selular ***
// Ikon Orang untuk menandai lokasi GPS perangkat
var personIcon = L.icon({
    iconUrl: 'https://img.icons8.com/color/48/person-male.png',  // URL untuk ikon orang
    iconSize: [40, 40],  // Ukuran ikon
    iconAnchor: [20, 40]  // Anchor poin ikon
});

// Fungsi untuk menangani lokasi yang berhasil diambil
function onLocationFound(e) {
    var latlng = e.latlng; // Koordinat lokasi perangkat

    // *** Menghitung Jarak ke Terminal Terdekat ***
    var nearestTerminal = locations.reduce(function(prev, curr) {
        var prevDistance = latlng.distanceTo(L.latLng(prev.coords));
        var currDistance = latlng.distanceTo(L.latLng(curr.coords));
        return (currDistance < prevDistance) ? curr : prev;
    });

    var distanceToNearestTerminal = latlng.distanceTo(L.latLng(nearestTerminal.coords));
    var distanceText = distanceToNearestTerminal >= 1000 ? (distanceToNearestTerminal / 1000).toFixed(2) + ' km' : Math.round(distanceToNearestTerminal) + ' meter';

    // Marker untuk lokasi pengguna dengan deskripsi jarak ke terminal terdekat
    var personMarker = L.marker(latlng, { icon: personIcon }).addTo(map);
    personMarker.bindPopup('Lokasi Anda<br>Jarak ke terminal terdekat (' + nearestTerminal.name + '): ' + distanceText).openPopup();  // Memasukkan jarak ke terminal dalam deskripsi

    // Mengatur rute dari lokasi pengguna ke terminal terdekat
    routeControl.setWaypoints([
        L.latLng(latlng),  // Lokasi pengguna sebagai titik awal
        L.latLng(nearestTerminal.coords)  // Lokasi terminal terdekat sebagai tujuan
    ]);
}

// Fungsi jika ada error saat menemukan lokasi
function onLocationError(e) {
    alert(e.message);  // Menampilkan pesan error
}

// Meminta akses ke lokasi perangkat
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

// Memulai pelacakan lokasi pengguna
// Memulai pelacakan lokasi pengguna
map.locate({
    setView: true,
    maxZoom: 16,
    watch: true,
    enableHighAccuracy: true,
    timeout: 5000,  // Menetapkan waktu maksimum 5 detik
    maximumAge: 0 // Menggunakan data yang diambil dalam 10 detik terakhir
});


// Tombol untuk menemukan lokasi pengguna
var locateButton = L.control({ position: 'topleft' });

locateButton.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    div.innerHTML = '<a href="#" title="Temukan Lokasi" onclick="map.locate({setView: true, maxZoom: 16})"><i class="fas fa-location-arrow"></i></a>';
    return div;
};

locateButton.addTo(map);
