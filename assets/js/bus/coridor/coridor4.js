// Inisialisasi Peta dan Fokus pada Terminal Poris Plawad
var map = L.map('map').setView([-6.150052645378145, 106.594353138482], 18);  // Fokus pada Terminal Poris Plawad

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
var carMarker = L.marker([-6.150052645378145, 106.594353138482], { icon: carIcon }).addTo(map);

// Ikon Halte Bus
var busStopIcon = L.icon({
    iconUrl: 'https://img.icons8.com/fluency/48/bus-stop.png',  // URL untuk ikon halte bus
    iconSize: [40, 40],  // Ukuran ikon
    iconAnchor: [20, 20]  // Anchor poin ikon
});

// Daftar Lokasi dengan Titik Halte Bus
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



// Menambahkan Marker untuk Setiap Lokasi dengan Ikon Halte Bus
locations.forEach(function(location) {
    L.marker(location.coords, { icon: busStopIcon })
        .addTo(map)
        .bindPopup(location.name);
});

// Start Point (Titik Awal)
var startPoint = L.marker(locations[0].coords, { icon: busStopIcon }).addTo(map)
    .bindPopup("RS Hermina Cadas");

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