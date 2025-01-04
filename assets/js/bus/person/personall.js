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
    { name: "Terminal Poris Plawad coridor1", coords: [-6.172841094620176, 106.66477390995415] },
    { name: "Ebony coridor1", coords: [-6.172046002920318, 106.66050999976655] },
    { name: "Benteng Betawi coridor1", coords: [-6.1739313346629325, 106.65580860179305] },
    { name: "Kober coridor1", coords: [-6.174262315849556, 106.64830237603464] },
    { name: "Stasiun Tanah Tinggi 1 coridor1", coords: [-6.175183336836818, 106.64661874591431] },
    { name: "Pengayoman/ Sbr Mall Balekota coridor1", coords: [-6.175068576006352, 106.64792352652198] },
    { name: "Golden Tulip coridor1", coords: [-6.184229337611009, 106.64312072877756] },
    { name: "PLN Uid Banten coridor1", coords: [-6.184314668812388, 106.64284177904364] },
    { name: "Mall Bale Kota coridor1", coords: [-6.181134659055779, 106.64344062159495] },
    { name: "Imigrasi coridor1", coords: [-6.16656464800696, 106.64532329006413] },
    { name: "Pesanggrahan coridor1", coords: [-6.183148643890295, 106.63795353618889] },
    { name: "Satria coridor1", coords: [-6.171063658867185, 106.63649829943805] },
    { name: "Pintu Air coridor1", coords: [-6.168717332808358, 106.63418072880671] },
    { name: "PLN coridor1", coords: [-6.17140146709288, 106.63185012686773] },
    { name: "Robinson coridor1", coords: [-6.174169686350489, 106.63036699868316] },
    { name: "Pos coridor1", coords: [-6.177039343125726, 106.62624542304812] },
    { name: "Sinar Hati coridor1", coords: [-6.179036366238737, 106.62233369831348] },
    { name: "Pabuaran coridor1", coords: [-6.180656019573931, 106.6202283383918] },
    { name: "SPBU Cimone coridor1", coords: [-6.184051334558015, 106.61890853693869] },
    { name: "Mall Icon coridor1", coords: [-6.185513334490783, 106.61650562159508] },
    { name: "Terminal Cimone coridor1", coords: [-6.18622934763629, 106.61312032504202] },
    { name: "Pasar Cimone coridor1", coords: [-6.185085999790866, 106.61232290995426] },
    { name: "RSU Anisa coridor1", coords: [-6.187201683192736, 106.60500313588565] },
    { name: "Uwung Jaya coridor1", coords: [-6.188314668528202, 106.60093999461058] },
    { name: "Keroncong coridor1", coords: [-6.189729333184623, 106.59080270625141] },
    { name: "GOR Jatiuwung coridor1", coords: [-6.196529070409261, 106.58686240126958] },
    { name: "Kompleks Ruko Jatiuwung coridor1", coords: [-6.194218675523705, 106.58560416392332] },
    { name: "Yonif Mekanis coridor1", coords: [-6.19729800335668, 106.58104145228255] },
    { name: "Magnolia Residence Jatake coridor1", coords: [-6.199869336452954, 106.57441416392334] },
    

    { name: "Terminal Poris Plawad coridor 2", coords: [-6.173196661389159, 106.6648292657745] },
    { name: "TAMAN Royal coridor 2", coords: [-6.172451018915644, 106.66058950661976] },
    { name: "Stasiun Tanah Tinggi 1 coridor 2", coords: [-6.17518529560928, 106.64543757926681] },
    { name: "Kehakiman coridor 2", coords: [-6.175731342466263, 106.64464583045391] },
    { name: "Pengayoman/sberang coridor 2", coords: [-6.175221325747773, 106.64804082529777] },
    { name: "Mall Balekota coridor 2", coords: [-6.1810984485217455, 106.6434243655086] },
    { name: "SDN Sukasari Enam 1 coridor 2", coords: [-6.189651998314097, 106.64195363879016] },
    { name: "Buaran coridor 2", coords: [-6.1927846705998535, 106.63835072344655] },
    { name: "Tangerang City Mall 1 coridor 2", coords: [-6.193967335947928, 106.63609218111843] },
    { name: "PDAM coridor 2", coords: [-6.195830667477715, 106.6293414522826] },
    { name: "Gereja Pantekosta coridor 2", coords: [-6.196954691804651, 106.62587043598944] },
    { name: "Masjid Baiturrahman 1/Bojong coridor 2", coords: [-6.2089586236032615, 106.61928677866656] },
    { name: "Jalan Kavling Pemda coridor 2", coords: [-6.2105395560787935, 106.6168565938816] },
    { name: "TAMAN Pisang coridor 2", coords: [-6.210542681253071, 106.61486489275937] },
    { name: "Jalan Sawo coridor 2", coords: [-6.213572669361649, 106.60743820187838] },
    { name: "Borobudur Raya coridor 2", coords: [-6.199209736886848, 106.60808980575533] },
    { name: "Alun - Alun Pam coridor 2", coords: [-6.206802387966601, 106.60524659130787] },
    

    { name: "CBD Ciledug coridor 3", coords: [-6.224506016506443, 106.70850145228289] },
    { name: "SDN PONDOK Bahar 4/ Ciledug Indah coridor 3", coords: [-6.221951338605795, 106.69907122419416] },
    { name: "Sudirmara Pinang coridor 3", coords: [-6.221291392595264, 106.68843416919593] },
    { name: "Mts coridor 3", coords: [-6.215603104495711, 106.6880399140661] },
    { name: "Kunciran coridor 3", coords: [-6.214287270339439, 106.6779934710267] },
    { name: "Kenanga 1 coridor 3", coords: [-6.137129473486055, 106.67419988278213] },
    { name: "Poris Plawad Indah coridor 3", coords: [-6.190632640874684, 106.66870786925428] },
    { name: "Poris Plawad coridor 3", coords: [-6.171999618604605, 106.66461407593208] },
    { name: "RS Emc coridor 3", coords: [-6.1843846667080795, 106.64772926577469] },
    { name: "Veteran coridor 3", coords: [-6.184558692626777, 106.64177749182863] },
    { name: "Laksa Kor.3 coridor 3", coords: [-6.191147772249799, 106.63841864323523] },
    { name: "Tangcity Mall Sisi Belakang/ Lobi Perintis coridor 3", coords: [-6.193308188698745, 106.63326828710218] },
    

    { name: "RS Hermina Cadas coridor 4", coords: [-6.150052645378145, 106.594353138482] },
{ name: "SPBU Cadas coridor 4", coords: [-6.148388646046187, 106.59088436762569] },
{ name: "Simpang Cadas coridor 4", coords: [-6.148113982841846, 106.59212780810245] },
{ name: "Amal Cadas 2 coridor 4", coords: [-6.148588652864637, 106.5971363504306] },
{ name: "Pabrik PT Battery Technology Indonesia 2 coridor 4", coords: [-6.14917280557722, 106.60102389293327] },
{ name: "Pabrik Oppo 2 coridor 4", coords: [-6.155230239606748, 106.60692396165581] },
{ name: "Pabrik PT Sse coridor 4", coords: [-6.157219989683628, 106.60904853693852] },
{ name: "Bayur coridor 4", coords: [-6.160427364112248, 106.61546022624589] },
{ name: "SMKN 7 coridor 4", coords: [-6.160004085877, 106.62045779964491] },
{ name: "Kampung Baru coridor 4", coords: [-6.160231819559397, 106.62477620742199] },
{ name: "Pintu Sepuluh coridor 4", coords: [-6.160416333125893, 106.6280395066085] },
{ name: "RS Sari Asih coridor 4", coords: [-6.16443772539385, 106.62952949324598] },
{ name: "SMPN 29 coridor 4", coords: [-6.166605551523699, 106.63052289957885] },
{ name: "Asrama Polisi coridor 4", coords: [-6.167096804815511, 106.63149429167974] },
{ name: "Pintu Air coridor 4", coords: [-6.168769456356484, 106.6341638432167] },
{ name: "Hotel Mandala coridor 4", coords: [-6.165062620774749, 106.63463364252277] },
{ name: "Dishub Kota Tangerang coridor 4", coords: [-6.161705989926968, 106.63332853693849] },
{ name: "Bedeng coridor 4", coords: [-6.158871083684693, 106.63153682288122] },
{ name: "Dongkel coridor 4", coords: [-6.155832115725811, 106.63232263258516] },
{ name: "SDN Neglasari 2 coridor 4", coords: [-6.1543249000207405, 106.6323507222806] },
{ name: "Jalan Aeropolis coridor 4", coords: [-6.143880256151326, 106.6325739292555] },
{ name: "Polsek Neglasari coridor 4", coords: [-6.141553612162768, 106.63271444308688] },
{ name: "M1 Tod SHIA coridor 4", coords: [-6.135862029319001, 106.63346864548397] }

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
