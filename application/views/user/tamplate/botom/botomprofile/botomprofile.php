
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <script>
    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        const toggleBtn = document.getElementById('toggleBtn');

        sidebar.classList.toggle('active');
        mainContent.classList.toggle('shifted');
        toggleBtn.classList.toggle('sidebar-active');

        // Change the icon of toggle button based on sidebar status
        if (sidebar.classList.contains('active')) {
            toggleBtn.innerHTML = 'X';
        } else {
            toggleBtn.innerHTML = '☰ Menu';
        }
    }

   

    function previewImage(event) {
    const input = event.target;
    const previewContainer = document.getElementById('previewContainer');
    const previewImage = document.getElementById('previewImage');

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewContainer.classList.remove('d-none'); // Menampilkan container preview
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function cancelImage() {
    document.getElementById('profilePictureInput').value = "";
    document.getElementById('previewContainer').classList.add('d-none'); // Menyembunyikan container preview
}

</script>

</body>
</html>

 