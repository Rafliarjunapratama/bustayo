

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js"></script>
    <script src="<?= base_url('assets/js/bus/coridor/personall.js')?>"></script>
 

    
    <script>
        function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        const toggleBtn = document.getElementById('toggleBtn');

        sidebar.classList.toggle('active');
        mainContent.classList.toggle('shifted');
        toggleBtn.classList.toggle('sidebar-active');

        // Toggle icon and text
        toggleBtn.innerHTML = toggleBtn.classList.contains('sidebar-active') ? '✖ Close' : '☰ Menu';
    }

</script>
</body>
</html>
