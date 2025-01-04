 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bustayo Tracking</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="https://wallpapercave.com/wp/wp14473479.jpg">
    <script src="<?= base_url('assets/css/bus/info.css')?>"></script>


  </script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
 
    <style>

        
        .form-container {
            border: 1px solid #ddd;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .table-container {
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .table th, .table td {
            vertical-align: middle;
        }
       
 /* Main Content */
.main-content {
    padding-top: 10px; /* Reduce padding here */
    transition: margin-left 0.3s ease;
}

/* Profile Container */
.profile-container {
    padding: 10px; /* Reduce padding here */
    display: flex;
    align-items: center;
}

/* Input fields */
input {
    padding: 6px 8px; /* Adjust padding for input fields */
}

/* Body */
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    overflow-x: hidden;
}

/* Map */
#map {
    height: 400px;
    margin-top: 20px;
    width: 100%;
}

/* Info Box */
.info-box {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    font-size: 14px;
    color: #333;
}

/* Progress Bar */
#progress-bar {
    background: #ddd;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    margin-top: 10px;
}

#progress {
    background: #4CAF50;
    height: 10px;
    width: 0%;
    border-radius: 5px;
}

/* Dashboard Section */
.dashboard-section {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-top: 20px;
    transition: margin-left 0.3s ease;
}

/* Table styling */


.tablee {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

/* Header styling */
.tablee thead {
    background-color: #007bff;
    color: white;
}

.tablee th {
    padding: 10px;
    text-align: left;
    font-weight: 600;
}

/* Body styling */
.tablee tbody tr:nth-child(even) {
    background-color: #f2f2f2;
}

.tablee tbody tr:nth-child(odd) {
    background-color: #e9ecef;
}

.tablee td {
    padding: 10px;
    text-align: left;
}

/* Status styling */
.tablee td:last-child {
    font-weight: bold;
    color: #dc3545;
}

/* Border styling */
.tablee,
.tablee th,
.tablee td {
    border: 1px solid #ddd;
    border-radius: 4px;
}

/* Hover effect */
.tablee tbody tr:hover {
    background-color: #dfe6f0;
}

/* Route Instructions */
.route-instructions {
    margin-top: 20px;
}

.route-instructions h6 {
    font-weight: bold;
}

/* Highlight */
.highlight {
    background-color: #000000;
    color: white;
}

/* Leaflet Routing Container */
.leaflet-routing-container {
    display: none !important;
}

/* Sidebar */
.sidebar {
    position: fixed;
    top: 0;
    left: -270px;
    width: 270px;
    height: 100%;
    background-color: #f8f9fa;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    transition: left 0.3s ease;
    z-index: 1000;
    padding-top: 20px;
    color: #000000;
}

.sidebar.active {
    left: 0;
}

/* Main Content */
.main-content {
    transition: margin-left 0.3s ease;
    padding-top: 20px;
}

.main-content.shifted {
    margin-left: 250px;
}

/* Toggle Button */
.toggle-btn {
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1100;
    background-color: #000000;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, left 0.3s ease;
}

.toggle-btn:hover {
    background-color: #0056b3;
}

.toggle-btn.sidebar-active {
    left: 270px;
    background-color: #dc3545;
}

/* Profile Image */
.profile-image {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}

.profile-container {
    display: flex;
    align-items: center;
    padding: 15px;
}

.sidebar .profile-container img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #000000;
}

/* Nav Link Dropdown */
.nav-link.dropdown-toggle.active {
    color: #000000;
    font-weight: bold;
    background-color: #e9ecef;
    border-radius: 5px;
}

/* Divider Icon */
.divider-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    color: #000000;
}

.divider-icon i {
    font-size: 24px;
    color: #000000;
}

.divider-icon::before,
.divider-icon::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ddd;
    margin: 0 10px;
}

/* Sidebar Text Color */
.sidebar .nav-link,
.sidebar .text-muted,
.sidebar h6 {
    color: #000000;
}

/* Sidebar Hover */
.sidebar .nav-link:hover {
    color: #333333;
}

/* Responsive design */
@media (max-width: 768px) {
    .route-instructions {
        width: 95%;
        padding: 10px;
    }

    .tablee th,
    .tablee td {
        font-size: 0.9rem;
        padding: 8px;
    }
}




    </style>
</head>

