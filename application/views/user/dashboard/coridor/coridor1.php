

<!-- Main Content -->
<div class="container-fluid main-content" id="mainContent">
    <div class="row">
        <div class="col-md-12">
            <div class="dashboard-section">
                <h5>Snapshot: Perjalanan Mobil coridor <?php echo $coridor ?></h5>

                <!-- Map Section -->
                <div id="map"></div>

                <!-- Info Box -->
                <div class="info-box mt-4">
                    <h3>Perjalanan Mobil</h3>
                    <p id="status">Loading route...</p>
                    <div id="progress-bar">
                        <div id="progress"></div>
                    </div>
                </div>

                <div class="route-instructions">
                        
                        <table class="table table-bordered">
                            <thead class="thead-light">
                                <tr>
                                    <th>No.</th>
                                    <th>Instruksi</th>
                                    <th>Jarak</th>
                                    <th>Estimasi Waktu</th>
                                    
                                </tr>
                            </thead>
                            <tbody id="routeTableBody">
                                <!-- Konten tabel akan diisi oleh JavaScript -->
                            </tbody>
                        </table>
                    </div>

                <!-- Tabel Deskripsi Perjalanan -->
                <div class="route-instructions">
    <h6>Location</h6>
    <table class="tablee table-bordered">
        <thead class="thead-light">
            <tr>
                <th>No.</th>
                <th>Lokasi</th>
                <th>Status</th>
                <th>Estimasi Waktu</th>
            </tr>
        </thead>
        <tbody id="kucing"></tbody>
    </table>
</div>

            </div>
        </div>
    </div>
</div>
