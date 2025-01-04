<div class="container-fluid main-content" id="mainContent">
<div class="container mt-5">
    <div class="table-container">
        <h2>Daftar Pengguna</h2>
        <a href="<?= site_url('Tablesupiraktif/add') ?>" class="btn btn-success mb-3">Tambah Pengguna</a>
        <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Coridor</th>
                        <th>Supir</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($supiraktifs as $supiraktif): ?>
                        
                        
                        <tr>
                            <td><?= $supiraktif->id ?></td>
                            <td><?= $supiraktif->coridor ?></td>
                            <td><?= $supiraktif->supir ?></td>
                            <td>
                                <a href="<?= site_url('Tablesupiraktif/edit/' . $supiraktif->id) ?>" class="btn btn-warning btn-sm">Edit</a>
                                <a href="<?= site_url('Tablesupiraktif/delete/' . $supiraktif->id) ?>" class="btn btn-danger btn-sm" onclick="return confirm('Apakah Anda yakin ingin menghapus pengguna ini?')">Hapus</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
    </div>
</div>
