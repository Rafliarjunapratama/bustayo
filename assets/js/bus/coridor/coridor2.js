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

 // Daftar lokasi
 const locationss = [
      
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

    function populateTable() {
        const tableBody = document.getElementById("kucing");

        locationss.forEach((location, index) => {
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

    window.onload = populateTable;