<div class="container-fluid main-content" id="mainContent">
    <div class="container mt-5">
        <div class="form-container">
            <h2>Tambah Pengguna Baru</h2>
            <form action="<?= site_url('Tablesupiraktif/save') ?>" method="post">
            <div class="form-group">
            <label for="coridor">Coridor</label>
            <input type="text" name="coridor" id="coridor" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="supir">Supir</label>
            <input type="text" name="supir" id="supir" class="form-control" required>
        </div>
                <button type="submit" class="btn btn-primary">Simpan</button>
                <a href="<?= site_url('Tablesupiraktif') ?>" class="btn btn-secondary">Kembali</a>
            </form>
        </div>
    </div>
</div>
