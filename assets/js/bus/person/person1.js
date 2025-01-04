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
    { name: "Terminal Poris Plawad", coords: [-6.172841094620176, 106.66477390995415] },
    { name: "Ebony", coords: [-6.172046002920318, 106.66050999976655] },
    { name: "Benteng Betawi", coords: [-6.1739313346629325, 106.65580860179305] },
    { name: "Kober", coords: [-6.174262315849556, 106.64830237603464] },
    { name: "Stasiun Tanah Tinggi 1", coords: [-6.175183336836818, 106.64661874591431] },
    { name: "Pengayoman/ Sbr Mall Balekota", coords: [-6.175068576006352, 106.64792352652198] },
    { name: "Golden Tulip", coords: [-6.184229337611009, 106.64312072877756] },
    { name: "PLN Uid Banten", coords: [-6.184314668812388, 106.64284177904364] },
    { name: "Mall Bale Kota", coords: [-6.181134659055779, 106.64344062159495] },
    { name: "Imigrasi", coords: [-6.16656464800696, 106.64532329006413] },
    { name: "Pesanggrahan", coords: [-6.183148643890295, 106.63795353618889] },
    { name: "Satria", coords: [-6.171063658867185, 106.63649829943805] },
    { name: "Pintu Air", coords: [-6.168717332808358, 106.63418072880671] },
    { name: "PLN", coords: [-6.17140146709288, 106.63185012686773] },
    { name: "Robinson", coords: [-6.174169686350489, 106.63036699868316] },
    { name: "Pos", coords: [-6.177039343125726, 106.62624542304812] },
    { name: "Sinar Hati", coords: [-6.179036366238737, 106.62233369831348] },
    { name: "Pabuaran", coords: [-6.180656019573931, 106.6202283383918] },
    { name: "SPBU Cimone", coords: [-6.184051334558015, 106.61890853693869] },
    { name: "Mall Icon", coords: [-6.185513334490783, 106.61650562159508] },
    { name: "Terminal Cimone", coords: [-6.18622934763629, 106.61312032504202] },
    { name: "Pasar Cimone", coords: [-6.185085999790866, 106.61232290995426] },
    { name: "RSU Anisa", coords: [-6.187201683192736, 106.60500313588565] },
    { name: "Uwung Jaya", coords: [-6.188314668528202, 106.60093999461058] },
    { name: "Keroncong", coords: [-6.189729333184623, 106.59080270625141] },
    { name: "GOR Jatiuwung", coords: [-6.196529070409261, 106.58686240126958] },
    { name: "Kompleks Ruko Jatiuwung", coords: [-6.194218675523705, 106.58560416392332] },
    { name: "Yonif Mekanis", coords: [-6.19729800335668, 106.58104145228255] },
    { name: "Magnolia Residence Jatake", coords: [-6.199869336452954, 106.57441416392334] }

    
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
