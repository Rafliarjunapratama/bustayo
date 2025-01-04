<div class="container-fluid main-content" id="mainContent">
    <div class="container mt-5">
        <div class="form-container">
            <h2>Tambah Pengguna Baru</h2>
            <form action="<?= site_url('Tableuser/save') ?>" method="post">
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" name="username" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" name="email" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" required>
                </div>
                <div class="mb-3">
                    <label for="role_id" class="form-label">Role</label>
                    <select class="form-select" id="role_id" name="role_id" required>
    <option value="1" <?= (isset($users->role) && $users->role == 1) ? 'selected' : ''; ?>>Admin</option>
    <option value="2" <?= (isset($users->role) && $users->role == 2) ? 'selected' : ''; ?>>Moderator</option>
    <option value="3" <?= (isset($users->role) && $users->role == 3) ? 'selected' : ''; ?>>User</option>
</select>

                </div>
                <button type="submit" class="btn btn-primary">Simpan</button>
                <a href="<?= site_url('Tableuser') ?>" class="btn btn-secondary">Kembali</a>
            </form>
        </div>
    </div>
</div>
