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
    { name: "RS Hermina Cadas", coords: [-6.150052645378145, 106.594353138482] },
    { name: "SPBU Cadas", coords: [-6.148388646046187, 106.59088436762569] },
    { name: "Simpang Cadas", coords: [-6.148113982841846, 106.59212780810245] },
    { name: "Amal Cadas 2", coords: [-6.148588652864637, 106.5971363504306] },
    { name: "Pabrik PT Battery Technology Indonesia 2", coords: [-6.14917280557722, 106.60102389293327] },
    { name: "Pabrik Oppo 2", coords: [-6.155230239606748, 106.60692396165581] },
    { name: "Pabrik PT Sse", coords: [-6.157219989683628, 106.60904853693852] },
    { name: "Bayur", coords: [-6.160427364112248, 106.61546022624589] },
    { name: "SMKN 7", coords: [-6.160004085877, 106.62045779964491] },
    { name: "Kampung Baru", coords: [-6.160231819559397, 106.62477620742199] },
    { name: "Pintu Sepuluh", coords: [-6.160416333125893, 106.6280395066085] },
    { name: "RS Sari Asih", coords: [-6.16443772539385, 106.62952949324598] },
    { name: "SMPN 29", coords: [-6.166605551523699, 106.63052289957885] },
    { name: "Asrama Polisi", coords: [-6.167096804815511, 106.63149429167974] },
    { name: "Pintu Air", coords: [-6.168769456356484, 106.6341638432167] },
    { name: "Hotel Mandala", coords: [-6.165062620774749, 106.63463364252277] },
    { name: "Dishub Kota Tangerang", coords: [-6.161705989926968, 106.63332853693849] },
    { name: "Bedeng", coords: [-6.158871083684693, 106.63153682288122] },
    { name: "Dongkel", coords: [-6.155832115725811, 106.63232263258516] },
    { name: "SDN Neglasari 2", coords: [-6.1543249000207405, 106.6323507222806] },
    { name: "Jalan Aeropolis", coords: [-6.143880256151326, 106.6325739292555] },
    { name: "Polsek Neglasari", coords: [-6.141553612162768, 106.63271444308688] },
    { name: "M1 Tod SHIA", coords: [-6.135862029319001, 106.63346864548397] }
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
    timeout: 3000,  // Menetapkan waktu maksimum 5 detik
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
