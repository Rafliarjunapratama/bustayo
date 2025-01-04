
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


/////////////////////////////////////// tabel coridor 1/////////////////////////
 // Daftar lokasi
 const locationss = [
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