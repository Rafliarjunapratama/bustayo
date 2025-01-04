<div class="container-fluid main-content" id="mainContent">
<?php if ($this->session->flashdata('success')): ?>
    <div class="alert alert-success">
        <?php echo $this->session->flashdata('success'); ?>
    </div>
<?php endif; ?>

<?php if ($this->session->flashdata('error')): ?>
    <div class="alert alert-danger">
        <?php echo $this->session->flashdata('error'); ?>
    </div>
<?php endif; ?>

<form action="<?php echo site_url('admin/update_profile'); ?>" method="post" enctype="multipart/form-data">
    <div class="container bg-white shadow rounded p-4 my-4">
        <div class="d-flex align-items-center mb-4">
            <img alt="Profile picture" id="profileImage" class="rounded-circle me-3" src="<?= base_url('assets/img/upload/' . $gambar); ?>" width="100" height="100"/>
            <div>
                <h2 class="h4"><?php echo $username; ?></h2>
                <p class="text-muted mb-0"><?php echo $role; ?></p>
            </div>
            <button type="submit" class="btn btn-primary ms-auto">Edit</button>
        </div>

        <!-- Profile Picture Uploader with Preview -->
        <div class="mb-3">
    <label for="profilePictureInput" class="form-label">Profile Picture</label>
    <input type="file" class="form-control" id="profilePictureInput" name="image" accept="image/*" onchange="previewImage(event)">
    <div id="previewContainer" class="mt-3 d-none">
        <img id="previewImage" class="img-thumbnail" alt="Preview" width="100" height="100">
        <button type="button" class="btn btn-danger mt-2" onclick="cancelImage()">Cancel</button>
    </div>
</div>



        <div class="row mb-3">
            <div class="col">
                <label class="form-label">Username</label>
                <input name="username" type="text" class="form-control" placeholder="Change your username">
            </div>
            <div class="col">
                <label class="form-label">Password</label>
                <input name="pass" type="text" class="form-control" placeholder="Change your password">
            </div>
        </div>

        <div class="mt-4">
            <h3 class="h5">My Email Address</h3>
            <div class="d-flex align-items-center mt-3">
                <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                    <i class="fas fa-envelope"></i>
                </div>
                <div>
                    <p class="mb-0"><?php echo $emailo; ?></p>
                </div>
            </div>
        </div>
    </div>
</form>
