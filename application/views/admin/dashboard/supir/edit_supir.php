<div class="container-fluid main-content" id="mainContent">
    <div class="container mt-5">
        <div class="form-container">
            <h2>Edit Pengguna</h2>
            <form action="<?= site_url('Tablesupiraktif/update/' . $supiraktif->id) ?>" method="post" enctype="multipart/form-data">

                <input type="hidden" name="id" value="<?= $supiraktif->id ?>">

                <div class="form-group">
            <label for="coridor">Coridor</label>
            <input type="text" name="coridor" id="coridor" class="form-control" value="<?= $supiraktif->coridor ?>" required>
        </div>
        <div class="form-group">
            <label for="supir">Supir</label>
            <input type="text" name="supir" id="supir" class="form-control" value="<?= $supiraktif->supir ?>" required>
        </div>
                <button type="submit" class="btn btn-primary">Update</button>
                <a href="<?= site_url('Tableuser') ?>" class="btn btn-secondary">Kembali</a>
            </form>
        </div>
    </div>
</div>