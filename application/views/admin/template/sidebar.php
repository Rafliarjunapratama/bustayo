
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
    <li class="nav-item"><a class="nav-link active" href="/bustayo/admin"> <i class="fas fa-map-marker-alt"></i>  Tracker</a></li>
    
    <li class="nav-item"><a class="nav-link" href="/bustayo/Tableuser"><i class="fas fa-user-shield"></i> Table User</a></li>
    <li class="nav-item"><a class="nav-link" href="/bustayo/Tablesupiraktif"><i class="fa fa-drivers-license"></i> Table Supir</a></li>
    <li class="nav-item"><a class="nav-link" href="/bustayo/admin/profile"><i class="fas fa-user-cog"></i> Pengaturan Profile</a></li>
    <li class="nav-item"><a class="nav-link" href="/bustayo/logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
</ul>

    </div>
