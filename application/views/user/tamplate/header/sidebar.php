
<body>
    <!-- Toggle Button -->
    <button class="toggle-btn" id="toggleBtn" onclick="toggleSidebar()">☰ Menu</button>

    <!-- Sidebar -->
    <div class="sidebar" id="sidebar">
        <div class="profile-container">
            <img src="<?= base_url('assets/img/upload/' . $gambar); ?>" alt="Profile Picture" class="profile-image">
            <div>
                <h6 class="mb-0"> <?php echo $username; ?></h6>
                <span class="text-muted small"><?php echo $role; ?></span>
            </div>
        </div>
        <hr>
        <div class="search-box mt-3 ms-3 me-3 d-flex align-items-center justify-content-center text-center">
            <span class="search-text">Tracking Bus Tayo</span>
        </div>
        <hr>
        <ul class="nav flex-column">
    <li class="nav-item"><a class="nav-link active" href="/bustayo/Journey"> <i class="fas fa-map-marker-alt"></i>  Tracker</a></li>

    <!-- Dropdown Analysis Perjalanan User -->
<li class="nav-item">
    <a class="nav-link dropdown-toggle" href="#userJourneyDropdown" data-toggle="collapse" aria-expanded="false" aria-controls="userJourneyDropdown" id="userJourneyDropdownBtn">
    <i class="fas fa-route"></i>  Terminal Perjalanan Terdekat
    </a>
    <div class="collapse divider-icon" id="userJourneyDropdown">
        <ul class="nav flex-column ml-3">
            <li class="c"><a class="nav-link" href="/bustayo/person">Semuah Perjalanan Terdekat</a></li>
            <li class="nav-item"><a class="nav-link" href="/bustayo/person/coridor1">Perjalanan Terdekat Coridor 1</a></li>
            <li class="nav-item"><a class="nav-link" href="/bustayo/person/coridor2">Perjalanan Terdekat Coridor 2</a></li>
            <li class="nav-item"><a class="nav-link" href="/bustayo/person/coridor3">Perjalanan Terdekat Coridor 3</a></li>
            <li class="nav-item"><a class="nav-link" href="/bustayo/person/coridor4">Perjalanan Terdekat Coridor 4</a></li>
        </ul>
    </div>
</li>

<!-- Dropdown Coridor Terminal -->
<li class="nav-item">
    <a class="nav-link dropdown-toggle" href="#coridorTerminalDropdown" data-toggle="collapse" aria-expanded="false" aria-controls="coridorTerminalDropdown" id="coridorTerminalDropdownBtn">
    <i class="fas fa-bus-alt"></i> Coridor Terminal
    </a>
    <div class="collapse divider-icon" id="coridorTerminalDropdown">
        <ul class="nav flex-column ml-3">
 
            <li class="nav-item"><a class="nav-link" href="/bustayo/Coridor">Coridor 1</a></li>
            <li class="nav-item"><a class="nav-link" href="/bustayo/coridor/Coridor2">Coridor 2</a></li>
            <li class="nav-item"><a class="nav-link" href="/bustayo/coridor/Coridor3">Coridor 3</a></li>
            <li class="nav-item"><a class="nav-link" href="/bustayo/coridor/Coridor4">Coridor 4</a></li>
        </ul>
    </div>
</li>


    <li class="nav-item"><a class="nav-link" href="/bustayo/info"><i class="fas fa-info-circle"></i> Infomasi</a></li>
    <li class="nav-item"><a class="nav-link" href="/bustayo/profile"><i class="fas fa-user-cog"></i> Pengaturan Profile</a></li>
    <li class="nav-item"><a class="nav-link" href="/bustayo/logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
</ul>

    </div>
