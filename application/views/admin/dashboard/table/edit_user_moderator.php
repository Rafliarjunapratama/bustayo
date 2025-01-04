<div class="container-fluid main-content" id="mainContent">
    <div class="container mt-5">
        <div class="form-container">
            <h2>Edit Pengguna</h2>
            <form action="<?= site_url('Tableuser/update') ?>" method="post" enctype="multipart/form-data">

                <input type="hidden" name="id" value="<?= $user->id ?>">
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" name="username" value="<?= $user->username ?>" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" name="email" value="<?= $user->email ?>" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="text" class="form-control" id="password" name="password" value="<?= $user->password ?>" required>
                </div>
                

    <input type="hidden" name="current_image" value="<?= $user->image ?>"> <!-- Nama file gambar lama -->
    <div class="mb-3">
                        <label for="role_id" class="form-label">Role</label>
                        <select class="form-select" id="role_id" name="role_id" required>
    <option value="2" <?= (isset($users->role) && $users->role == 2) ? 'selected' : ''; ?>>Moderator</option>
    <option value="3" <?= (isset($users->role) && $users->role == 3) ? 'selected' : ''; ?>>User</option>
</select>
                </div>
    <div class="mb-3">
        <label for="image" class="form-label">Image</label>
        <input type="file" class="form-control" id="image" name="image">
    </div>

                <div class="mb-3">
                <input type="hidden" class="form-control" id="username" name="role_id" value="3" required>
                    </div>
                <button type="submit" class="btn btn-primary">Update</button>
                <a href="<?= site_url('Tableuser') ?>" class="btn btn-secondary">Kembali</a>
            </form>
        </div>
    </div>
</div>
    