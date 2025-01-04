<div class="container-fluid main-content" id="mainContent">
<div class="container mt-5">
    <div class="table-container">
        <h2>Daftar Pengguna</h2>
        <a href="<?= site_url('Tableuser/add') ?>" class="btn btn-success mb-3">Tambah Pengguna</a>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Image</th>
                    <th>Role ID</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($users as $user): ?>
                    <tr>
                        <td><?= $user->id ?></td>
                        <td><?= $user->username ?></td>
                        <td><?= $user->email ?></td>
                        <td><img src="<?= base_url('assets/img/upload/' . $user->image); ?>" alt="Image" width="50"></td>
                        <td><?= $user->role; ?></td> 


                        <td>
                            <a href="<?= site_url('Tableuser/edit/' . $user->id) ?>" class="btn btn-warning btn-sm">Edit</a>
                            <a href="<?= site_url('Tableuser/delete/' . $user->id) ?>" class="btn btn-danger btn-sm" onclick="return confirm('Apakah Anda yakin ingin menghapus pengguna ini?')">Hapus</a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>
