
<body>
    <!-- Toggle Button -->
    <button class="toggle-btn" id="toggleBtn" onclick="toggleSidebar()">☰ Menu</button>

    <!-- Sidebar -->
    <div class="sidebar" id="sidebar">
        
        <hr>
        <div class="search-box mt-3 ms-3 me-3 d-flex align-items-center justify-content-center text-center">
            <span class="search-text">Tracking Bus Tayo</span>
        </div>
        <hr>
        <ul class="nav flex-column">
    <li class="nav-item"><a class="nav-link active" href="/bustayo/utama"> <i class="fas fa-map-marker-alt"></i>  Tracker</a></li>

    

<!-- Dropdown Coridor Terminal -->
<li class="nav-item">
    <a class="nav-link dropdown-toggle" href="#coridorTerminalDropdown" data-toggle="collapse" aria-expanded="false" aria-controls="coridorTerminalDropdown" id="coridorTerminalDropdownBtn">
    <i class="fas fa-bus-alt"></i> Coridor Terminal
    </a>
    <div class="collapse divider-icon" id="coridorTerminalDropdown">
        <ul class="nav flex-column ml-3">
            
 
            <li class="nav-item"><a class="nav-link" href="/bustayo/utama/coridor1">Coridor 1</a></li>
            <li class="nav-item"><a class="nav-link" href="/bustayo/utama/Coridor2">Coridor 2</a></li>
            <li class="nav-item"><a class="nav-link" href="/bustayo/utama/Coridor3">Coridor 3</a></li>
            <li class="nav-item"><a class="nav-link" href="/bustayo/utama/Coridor4">Coridor 4</a></li>
        </ul>
    </div>
</li>


    <li class="nav-item"><a class="nav-link" href="/bustayo/utama/info"><i class="fas fa-info-circle"></i> Infomasi</a></li>
 
    <li class="nav-item"><a class="nav-link" href="/bustayo/login"><i class="fas fa-sign-in-alt"></i> Login</a></li>
</ul>

    </div>
