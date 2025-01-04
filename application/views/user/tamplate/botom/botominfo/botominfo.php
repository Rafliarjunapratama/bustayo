
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js"></script>
  
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    
    <script>
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('mainContent');
            const toggleBtn = document.getElementById('toggleBtn');

            sidebar.classList.toggle('active');
            mainContent.classList.toggle('shifted');
            toggleBtn.classList.toggle('sidebar-active');

            // Toggle icon and text
            if (toggleBtn.classList.contains('sidebar-active')) {
                toggleBtn.innerHTML = '✖ Close';
            } else {
                toggleBtn.innerHTML = '☰ Menu';
            }
            
        }
        // script.js
function filterRoutes() {
    const input = document.getElementById('searchInput').value.toUpperCase();
    const routes = document.querySelectorAll('.route-item');

    routes.forEach(route => {
        const text = route.textContent || route.innerText;
        if (text.toUpperCase().indexOf(input) > -1) {
            route.style.display = "";
        } else {
            route.style.display = "none";
        }
    });
}
function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        // Mengubah warna latar belakang setiap span menjadi warna acak
        document.querySelectorAll('.badge').forEach(span => {
            span.style.backgroundColor = getRandomColor();
        });
        
    </script>
</body>
</html>
