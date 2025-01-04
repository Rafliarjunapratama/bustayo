
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

// Inisialisasi Peta dan Fokus pada Terminal Poris Plawad
var map = L.map('map').setView(locations[0].coords, 18);  // Fokus pada Terminal Poris Plawad

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

// Marker Mobil, dimulai dari Terminal Poris Plawad
var carMarker = L.marker(locations[0].coords, { icon: carIcon }).addTo(map);

// Ikon Halte Bus
var busStopIcon = L.icon({
    iconUrl: 'https://img.icons8.com/fluency/48/bus-stop.png',  // URL untuk ikon halte bus
    iconSize: [40, 40],  // Ukuran ikon
    iconAnchor: [20, 20]  // Anchor poin ikon
});

// Daftar Lokasi dengan Titik Halte Bus


// Menambahkan Marker untuk Setiap Lokasi dengan Ikon Halte Bus
locations.forEach(function(location) {
    L.marker(location.coords, { icon: busStopIcon })
        .addTo(map)
        .bindPopup(location.name);
});

// Start Point (Titik Awal)
var startPoint = L.marker(locations[0].coords, { icon: busStopIcon }).addTo(map)
    .bindPopup("Start Point - Terminal Poris Plawad");

// Routing Control dengan Rute Tercepat
var routeControl = L.Routing.control({
    waypoints: [
        L.latLng(startPoint.getLatLng()),  // Start Point di Terminal Poris Plawad
        ...locations.map(location => L.latLng(location.coords)),  // Semua titik dari daftar lokasi
        L.latLng(startPoint.getLatLng())  // Kembali ke Start Point
    ],
    createMarker: function() { return null; },  // Menghilangkan marker default
    routeWhileDragging: true,
    show: false,  // Menonaktifkan instruksi di peta
    router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',  // URL untuk OSRM
        profile: 'driving'  // Profil rute yang diinginkan
    })
}).addTo(map);



// Fungsi untuk menerjemahkan teks menggunakan MyMemory API
function translateText(text, callback) {
    var url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=en|id';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var translatedText = data.responseData.translatedText;
            callback(translatedText);  // Mengirim teks terjemahan ke callback
        })
        .catch(err => console.error('Translation Error:', err));
}

// Fungsi yang dipanggil saat rute ditemukan
function onRoutesFound(e) {
    var route = e.routes[0].coordinates;
    var instructions = e.routes[0].instructions;
    var totalPoints = route.length;
    var i = 0;
    var totalDistanceCovered = 0;

    // Kosongkan isi tabel sebelum memasukkan data baru
    document.getElementById('routeTableBody').innerHTML = '';

    // Fungsi untuk Menggerakkan Mobil Sesuai Waktu Instruksi
    function moveCar(index) {
        if (index < instructions.length) {
            var instruksi = instructions[index];
            var distance = instruksi.distance;
            var duration = instruksi.time;
            var stepPoints = route.slice(i, i + Math.ceil(duration));

            var j = 0;
            function animateStep() {
                if (j < stepPoints.length) {
                    carMarker.setLatLng(stepPoints[j]);
                    j++;
                    var progress = (i / totalPoints) * 100;
                    document.getElementById('progress').style.width = progress + '%';

                    totalDistanceCovered += (j > 1) ? stepPoints[j - 1].distanceTo(stepPoints[j - 2]) : 0;
                    highlightCurrentInstruction(index, totalDistanceCovered);

                    setTimeout(animateStep, (duration * 3000 / stepPoints.length) * 0.5);

                } else {
                    i += stepPoints.length;
                    moveCar(index + 1);
                }
            }

            animateStep();
        } else {
            i = 0;
            moveCar(0);
        }
    }

    document.getElementById('status').textContent = 'Perjalanan dimulai!';
    moveCar(0);

    // Mengisi Tabel dengan Instruksi Rute yang Diterjemahkan
    var routeTableBody = document.getElementById('routeTableBody');
    instructions.forEach(function(instruksi, index) {
        translateText(instruksi.text, function(translatedText) {
            var distanceText = instruksi.distance >= 1000 ? (instruksi.distance / 1000).toFixed(2) + ' km' : instruksi.distance + ' meter';
            var row = document.createElement('tr');
            row.setAttribute('data-distance', instruksi.distance);

            row.innerHTML = '<td>' + (index + 1) + '</td><td>' + translatedText + '</td><td>' + distanceText + '</td><td>' + Math.ceil(instruksi.time / 60) + ' menit</td>';
            routeTableBody.appendChild(row);
        });
    });
}

// Hapus event listener 'routesfound' sebelumnya jika ada
routeControl.off('routesfound');

// Tambahkan event listener 'routesfound' yang baru
routeControl.on('routesfound', onRoutesFound);

// Fungsi untuk Menyoroti Baris Instruksi yang Sedang Dilewati Mobil
function highlightCurrentInstruction(currentIndex, distanceCovered) {
    var rows = document.querySelectorAll('#routeTableBody tr');
    rows.forEach(function(row, index) {
        if (index === currentIndex) {
            row.classList.add('highlight');
        } else {
            row.classList.remove('highlight');
        }
    });
}
///////////////////// coridor 2 //////////////////////////

// Array for route to Location B
var locationsB = [
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

// Initialize second bus marker for Location B
var carMarkerB = L.marker(locationsB[0].coords, { icon: carIcon }).addTo(map);

// Routing Control for Bus 2
var routeControlB = L.Routing.control({
    waypoints: [
        L.latLng(locationsB[0].coords),
        ...locationsB.map(location => L.latLng(location.coords))
    ],
    createMarker: function() { return null; },  // Disable default markers
    routeWhileDragging: true,
    show: false,
    router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: 'driving'
    }),
    lineOptions: {  // Set warna garis rute
        styles: [{ color: 'blue', opacity: 0.7, weight: 5 }]
    }
}).addTo(map);

// Event listener for Bus 2 route
routeControlB.on('routesfound', function(e) {
    var route = e.routes[0].coordinates;
    var instructions = e.routes[0].instructions;
    var i = 0;

    function moveCarB(index) {
        if (index < instructions.length) {
            var instruksi = instructions[index];
            var stepPoints = route.slice(i, i + Math.ceil(instruksi.time));

            var j = 0;
            function animateStepB() {
                if (j < stepPoints.length) {
                    carMarkerB.setLatLng(stepPoints[j]);
                    j++;
                    setTimeout(animateStepB, 500);  // Adjust timing as needed
                } else {
                    i += stepPoints.length;
                    moveCarB(index + 1);
                }
            }
            animateStepB();
        }
    }

    moveCarB(0);

    // Populate table for route B (similar to route A if needed)
    var routeTableBodyB = document.getElementById('routeTableBodyB');
    instructions.forEach(function(instruksi, index) {
        translateText(instruksi.text, function(translatedText) {
            var distanceText = instruksi.distance >= 1000 ? (instruksi.distance / 1000).toFixed(2) + ' km' : instruksi.distance + ' meter';
            var row = document.createElement('tr');
            row.innerHTML = '<td>' + (index + 1) + '</td><td>' + translatedText + '</td><td>' + distanceText + '</td><td>' + Math.ceil(instruksi.time / 60) + ' menit</td>';
            routeTableBodyB.appendChild(row);
        });
    });
});

// Optionally, add bus stops for Route B if needed
locationsB.forEach(function(location) {
    L.marker(location.coords, { icon: busStopIcon })
        .addTo(map)
        .bindPopup(location.name);
});


/////////////////////////////////////// coridor 3 ///////////////////////////////////////////////////////////////


var locationsc = [
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

// Initialize second bus marker for Location B
var carMarkerc = L.marker(locationsc[0].coords, { icon: carIcon }).addTo(map);

// Routing Control for Bus 2
var routeControlc = L.Routing.control({
    waypoints: [
        L.latLng(locationsc[0].coords),
        ...locationsc.map(location => L.latLng(location.coords))
    ],
    createMarker: function() { return null; },  // Disable default markers
    routeWhileDragging: true,
    show: false,
    router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: 'driving'
    }),
    lineOptions: {  // Set warna garis rute
        styles: [{ color: 'purple', opacity: 0.7, weight: 5 }]
    }
}).addTo(map);

// Event listener for Bus 2 route
routeControlc.on('routesfound', function(e) {
    var route = e.routes[0].coordinates;
    var instructions = e.routes[0].instructions;
    var i = 0;

    function moveCarc(index) {
        if (index < instructions.length) {
            var instruksi = instructions[index];
            var stepPoints = route.slice(i, i + Math.ceil(instruksi.time * 2)); // perbaiki jumlah langkah per waktu

            var j = 0;
            function animateStepc() {
                if (j < stepPoints.length) {
                    carMarkerc.setLatLng(stepPoints[j]);
                    j++;
                    setTimeout(animateStepc, 500); // Coba kurangi waktu penundaan
                } else {
                    i += stepPoints.length;
                    moveCarc(index + 1); // Lanjut ke instruksi berikutnya
                }
            }
            animateStepc();
        }
    }

    moveCarc(0);

    var routeTableBodyc = document.getElementById('routeTableBodyc');
    instructions.forEach(function(instruksi, index) {
        translateText(instruksi.text, function(translatedText) {
            var distanceText = instruksi.distance >= 1000 ? (instruksi.distance / 1000).toFixed(2) + ' km' : instruksi.distance + ' meter';
            var row = document.createElement('tr');
            row.innerHTML = '<td>' + (index + 1) + '</td><td>' + translatedText + '</td><td>' + distanceText + '</td><td>' + Math.ceil(instruksi.time / 60) + ' menit</td>';
            routeTableBodyc.appendChild(row);
        });
    });
});


// Optionally, add bus stops for Route B if needed
locationsc.forEach(function(location) {
    L.marker(location.coords, { icon: busStopIcon })
        .addTo(map)
        .bindPopup(location.name);
});



///////////////////////////////// coridor 4 ////////////////////////////
var locationsd = [
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

// Initialize second bus marker for Location B
// Initialize second bus marker for Location B
var carMarkerd = L.marker(locationsd[0].coords, { icon: carIcon }).addTo(map);

// Routing Control for Bus 2
var routeControld = L.Routing.control({
    waypoints: [
        L.latLng(locationsd[0].coords),
        ...locationsd.map(location => L.latLng(location.coords))
    ],
    createMarker: function() { return null; },  // Disable default markers
    routeWhileDragging: true,
    show: false,
    router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: 'driving'
    }),
    lineOptions: {  // Set warna garis rute
        styles: [{ color: 'green', opacity: 0.7, weight: 5 }]
    }
}).addTo(map);

// Event listener for Bus 2 route
routeControld.on('routesfound', function(e) {
    var route = e.routes[0].coordinates;
    var instructions = e.routes[0].instructions;
    var i = 0;

    function moveCard(index) {
        if (index < instructions.length) {
            var instruksi = instructions[index];
            var stepPoints = route.slice(i, i + Math.ceil(instruksi.time));

            var j = 0;
            function animateStepd() {
                if (j < stepPoints.length) {
                    // Update posisi marker carMarkerd, bukan carMarkerc
                    carMarkerd.setLatLng(stepPoints[j]);
                    j++;
                    setTimeout(animateStepd, 500);  // Adjust timing as needed
                } else {
                    i += stepPoints.length;
                    moveCard(index + 1);
                }
            }
            animateStepd();
        }
    }

    // Start moving the second bus
    moveCard(0);

    // Populate table for route B
    var routeTableBodyd = document.getElementById('routeTableBodyd');
    instructions.forEach(function(instruksi, index) {
        translateText(instruksi.text, function(translatedText) {
            var distanceText = instruksi.distance >= 1000 ? (instruksi.distance / 1000).toFixed(2) + ' km' : instruksi.distance + ' meter';
            var row = document.createElement('tr');
            row.innerHTML = '<td>' + (index + 1) + '</td><td>' + translatedText + '</td><td>' + distanceText + '</td><td>' + Math.ceil(instruksi.time / 60) + ' menit</td>';
            routeTableBodyd.appendChild(row);
        });
    });
});

// Optionally, add bus stops for Route B if needed
locationsd.forEach(function(location) {
    L.marker(location.coords, { icon: busStopIcon })
        .addTo(map)
        .bindPopup(location.name);
});


// Optionally, add bus stops for Route B if needed
locationsd.forEach(function(location) {
    L.marker(location.coords, { icon: busStopIcon })
        .addTo(map)
        .bindPopup(location.name);
});


/////////////////////////////////////// tabel coridor 1/////////////////////////
 // Daftar lokasi

 ////////////////////coridor 1/////////////////////////
 const locationss1 = [
    { name: "Terminal Poris Plawad", time: 1 },
    { name: "Ebony", time: 2 },
    { name: "Benteng Betawi", time: 3 },
    { name: "Kober", time: 4 },
    { name: "Stasiun Tanah Tinggi 1", time: 10 },
    { name: "Pengayoman/ Sbr Mall Balekota", time: 7 },
    { name: "Golden Tulip", time: 8 },
    { name: "PLN Uid Banten", time: 9 },
    { name: "Mall Bale Kota", time: 12 },
    { name: "Imigrasi", time: 13 },
    { name: "Pesanggrahan", time: 14 },
    { name: "Satria", time: 15 },
    { name: "Pintu Air", time: 16 },
    { name: "PLN", time: 17 },
    { name: "Robinson", time: 18 },
    { name: "Pos", time: 19 },
    { name: "Sinar Hati", time: 20 },
    { name: "Pabuaran", time: 21 },
    { name: "SPBU Cimone", time: 22 },
    { name: "Mall Icon", time: 23 },
    { name: "Terminal Cimone", time: 24 },
    { name: "Pasar Cimone", time: 25 },
    { name: "RSU Anisa", time: 26 },
    { name: "Uwung Jaya", time: 27 },
    { name: "Keroncong", time: 28 },
    { name: "GOR Jatiuwung", time: 29 },
    { name: "Kompleks Ruko Jatiuwung", time: 30 },
    { name: "Yonif Mekanis", time: 31 },
    { name: "Magnolia Residence Jatake", time: 32 }
];
///////////////////////// coridor 2////////////////////////////////
const locationss2 = [
      
    { name: "TAMAN Royal", time: 0.60 },
    { name: "Stasiun Tanah Tinggi 1", time: 6 },
    { name: "Kehakiman", time: 6.30 },
    { name: "Pengayoman/ Sbr Mall Balekota", time: 7 },
    { name: "SDN Sukasari Enam 1", time: 8 },
    { name: "Buaran", time: 9 },
    { name: "Tangerang City Mall 1", time: 12 },
    { name: "PDAM", time: 13 },
    { name: "Gereja Pantekosta", time: 16 },
    { name: "Masjid Baiturrahman 1/ Bojong", time: 18 },
    { name: "Jalan Kavling Pemda", time: 19 },
    { name: "TAMAN Pisang", time: 20 },
    { name: "Jalan Sawo", time: 21 },
    { name: "Borobudur Raya", time: 22 },
    { name: "Alun - Alun Pam", time: 24 }
];

/////////////////// coridor 3 //////////////////////////

const locationss3 = [
    { name: "CBD Ciledug", time: 0.60 },
    { name: "SDN PONDOK Bahar 4/ Ciledug Indah", time: 6 },
    { name: "Sudirmara Pinang", time: 6.30 },
    { name: "Mts", time: 7 },
    { name: "Kunciran", time: 8 },
    { name: "Kenanga 1", time: 9 },
    { name: "Poris Plawad Indah", time: 12 },
    { name: "Poris Plawad", time: 13 },
    { name: "RS Emc", time: 16 },
    { name: "Veteran", time: 18 },
    { name: "Laksa Kor.3", time: 19 },
    { name: "Tangcity Mall Sisi Belakang/ Lobi Perintis", time: 20 }
];

//////////////////////////// coridor 4 ////////////////////////////////////////

const locationss4 = [
    { name: "RS Hermina Cadas", time: 0.60 },
    { name: "SPBU Cadas", time: 6 },
    { name: "Simpang Cadas", time: 6.30 },
    { name: "Amal Cadas 2", time: 7 },
    { name: "Pabrik PT Battery Technology Indonesia 2", time: 8 },
    { name: "Pabrik Oppo 2", time: 9 },
    { name: "Pabrik PT Sse", time: 12 },
    { name: "Bayur", time: 13 },
    { name: "SMKN 7", time: 16 },
    { name: "Kampung Baru", time: 18 },
    { name: "Pintu Sepuluh", time: 19 },
    { name: "RS Sari Asih", time: 20 },
    { name: "SMPN 29", time: 21 },
    { name: "Asrama Polisi", time: 22 },
    { name: "Pintu Air", time: 24 },
    { name: "Hotel Mandala", time: 26 },
    { name: "Dishub Kota Tangerang", time: 28 },
    { name: "Bedeng", time: 30 },
    { name: "Dongkel", time: 32 },
    { name: "SDN Neglasari 2", time: 34 },
    { name: "Jalan Aeropolis", time: 36 },
    { name: "Polsek Neglasari", time: 38 },
    { name: "M1 Tod SHIA", time: 40 }
];

    function startCountdown(row, time) {
        const statusCell = row.querySelector(".status");
        const estimationCell = row.querySelector(".estimation");

        let remainingTime = time * 60; // waktu dalam detik
        const interval = setInterval(() => {
            let minutes = Math.floor(remainingTime / 60);
            let seconds = remainingTime % 60;
            estimationCell.textContent = `${minutes} menit ${seconds} detik`;

            if (remainingTime <= 0) {
                clearInterval(interval);
                statusCell.textContent = "Sudah Tiba";
                estimationCell.textContent = "0 menit 0 detik";
                row.classList.add("arrived"); // mengubah gaya ketika tiba
            }

            remainingTime--;
        }, 1000 );
    }
/////////////////////// table jadwal coridor 1/////////////////////////////////////////
    function populateTable1() {
        const tableBody = document.getElementById("coridor1");

        locationss1.forEach((location, index) => {
            const row = document.createElement("tr");
            
            const cellNo = document.createElement("td");
            cellNo.textContent = index + 1;
            row.appendChild(cellNo);

            const cellLocation = document.createElement("td");
            cellLocation.textContent = location.name;
            row.appendChild(cellLocation);

            const cellStatus = document.createElement("td");
            cellStatus.className = "status";
            cellStatus.textContent = "Sedang dalam perjalanan";
            row.appendChild(cellStatus);

            const cellEstimation = document.createElement("td");
            cellEstimation.className = "estimation";
            row.appendChild(cellEstimation);

            tableBody.appendChild(row);

            // Mulai hitungan mundur
            startCountdown(row, location.time);
        });
    }





/////////////////////// table jadwal coridor 2/////////////////////////////////////////
function populateTable2() {
    const tableBody = document.getElementById("coridor2");

    locationss2.forEach((location, index) => {
        const row = document.createElement("tr");
        
        const cellNo = document.createElement("td");
        cellNo.textContent = index + 1;
        row.appendChild(cellNo);

        const cellLocation = document.createElement("td");
        cellLocation.textContent = location.name;
        row.appendChild(cellLocation);

        const cellStatus = document.createElement("td");
        cellStatus.className = "status";
        cellStatus.textContent = "Sedang dalam perjalanan";
        row.appendChild(cellStatus);

        const cellEstimation = document.createElement("td");
        cellEstimation.className = "estimation";
        row.appendChild(cellEstimation);

        tableBody.appendChild(row);

        // Mulai hitungan mundur
        startCountdown(row, location.time);
    });
}

/////////////////////// table jadwal coridor 3/////////////////////////////////////////
function populateTable3() {
    const tableBody = document.getElementById("coridor3");

    locationss3.forEach((location, index) => {
        const row = document.createElement("tr");
        
        const cellNo = document.createElement("td");
        cellNo.textContent = index + 1;
        row.appendChild(cellNo);

        const cellLocation = document.createElement("td");
        cellLocation.textContent = location.name;
        row.appendChild(cellLocation);

        const cellStatus = document.createElement("td");
        cellStatus.className = "status";
        cellStatus.textContent = "Sedang dalam perjalanan";
        row.appendChild(cellStatus);

        const cellEstimation = document.createElement("td");
        cellEstimation.className = "estimation";
        row.appendChild(cellEstimation);

        tableBody.appendChild(row);

        // Mulai hitungan mundur
        startCountdown(row, location.time);
    });
}

/////////////////////// table jadwal coridor 4/////////////////////////////////////////
function populateTable4() {
    const tableBody = document.getElementById("coridor4");

    locationss4.forEach((location, index) => {
        const row = document.createElement("tr");
        
        const cellNo = document.createElement("td");
        cellNo.textContent = index + 1;
        row.appendChild(cellNo);

        const cellLocation = document.createElement("td");
        cellLocation.textContent = location.name;
        row.appendChild(cellLocation);

        const cellStatus = document.createElement("td");
        cellStatus.className = "status";
        cellStatus.textContent = "Sedang dalam perjalanan";
        row.appendChild(cellStatus);

        const cellEstimation = document.createElement("td");
        cellEstimation.className = "estimation";
        row.appendChild(cellEstimation);

        tableBody.appendChild(row);

        // Mulai hitungan mundur
        startCountdown(row, location.time);
    });
}

window.onload = function() {
    populateTable1(); // Menampilkan tabel koridor 1
    populateTable2();
    populateTable3();
    populateTable4();
      // Menampilkan tabel koridor 2
};