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
    { name: "Terminal Poris Plawad", coords: [-6.173196661389159, 106.6648292657745] },
    { name: "TAMAN Royal", coords: [-6.172451018915644, 106.66058950661976] },
    { name: "Stasiun Tanah Tinggi 1", coords: [-6.17518529560928, 106.64543757926681] },
    { name: "Kehakiman", coords: [-6.175731342466263, 106.64464583045391] },
    { name: "Pengayoman/sberang", coords: [-6.175221325747773, 106.64804082529777] },
    { name: "Mall Balekota", coords: [-6.1810984485217455, 106.6434243655086] },
    { name: "SDN Sukasari Enam 1", coords: [-6.189651998314097, 106.64195363879016] },
    { name: "Buaran", coords: [-6.1927846705998535, 106.63835072344655] },
    { name: "Tangerang City Mall 1", coords: [-6.193967335947928, 106.63609218111843] },
    { name: "PDAM", coords: [-6.195830667477715, 106.6293414522826] },
    { name: "Gereja Pantekosta", coords: [-6.196954691804651, 106.62587043598944] },
    { name: "Masjid Baiturrahman 1/Bojong", coords: [-6.2089586236032615, 106.61928677866656] },
    { name: "Jalan Kavling Pemda", coords: [-6.2105395560787935, 106.6168565938816] },
    { name: "TAMAN Pisang", coords: [-6.210542681253071, 106.61486489275937] },
    { name: "Jalan Sawo", coords: [-6.213572669361649, 106.60743820187838] },
    { name: "Borobudur Raya", coords: [-6.199209736886848, 106.60808980575533] },
    { name: "Alun - Alun Pam", coords: [-6.206802387966601, 106.60524659130787] }
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
    maximumAge: 10000  // Menggunakan data yang diambil dalam 10 detik terakhir
});


// Tombol untuk menemukan lokasi pengguna
var locateButton = L.control({ position: 'topleft' });

locateButton.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    div.innerHTML = '<a href="#" title="Temukan Lokasi" onclick="map.locate({setView: true, maxZoom: 16})"><i class="fas fa-location-arrow"></i></a>';
    return div;
};

locateButton.addTo(map);
