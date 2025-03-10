<?php include '../config.php'; ?>
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: " . BASE_URL . "pages/admin.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Media Coverage - JSVK Admin</title>
    <link rel="stylesheet" href="<?= BASE_URL ?>css/header.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/style.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/forms.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/admin.css">
    <link rel="shortcut icon" href="<?= BASE_URL ?>images/favicon.ico">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <style>
        .upload-preview {
            max-width: 200px;
            max-height: 200px;
            margin-top: 10px;
            display: none;
        }

        .media-preview {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 15px;
        }

        .preview-item {
            position: relative;
            width: 200px;
        }

        .preview-item img,
        .preview-item video {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: 8px;
        }

        .remove-preview {
            position: absolute;
            top: 5px;
            right: 5px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            padding: 5px;
            cursor: pointer;
            color: #dc3545;
        }

        #loader {
            display: none;
            text-align: center;
            margin-top: 20px;
        }

        .form-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background: var(--white);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
        }
    </style>
</head>

<body>
    <div class="dashboard-header">
        <div class="d-flex align-items-center">
            <div class="logo">
                <img src="<?= BASE_URL ?>images/logo.png" alt="JSVK Logo" style="max-width: 40px; margin-right: 10px;">
                <div class="header-text">
                    <h1 style="margin: 0; font-size: 1.2rem;">Add New Media Coverage</h1>
                </div>
            </div>
        </div>
        <div>
            <a href="dashboard.php" class="btn btn-outline btn-sm">
                <i class="fas fa-arrow-left"></i> Back to Dashboard
            </a>
        </div>
    </div>

    <div class="container mt-4">
        <div class="form-container">
            <form action="save_media_coverage.php" method="post" enctype="multipart/form-data" id="mediaCoverageForm">
                <div class="mb-4">
                    <label for="type" class="form-label">Media Type</label>
                    <select class="form-select" id="type" name="type" required>
                        <option value="">Select type...</option>
                        <option value="Print Media">Print Media</option>
                        <option value="Electronic Media">Electronic Media</option>
                        <option value="Online Media">Online Media</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label for="reference_id" class="form-label">Reference ID</label>
                    <input type="text" class="form-control" id="reference_id" name="reference_id" required>
                </div>

                <div class="mb-4">
                    <label for="media" class="form-label">Upload Media</label>
                    <div class="input-group">
                        <input type="file" class="form-control" id="media" name="media[]" multiple
                            accept="image/*,video/*" onchange="handleFileSelect(event)">
                        <label class="input-group-text" for="media">
                            <i class="fas fa-upload"></i>
                        </label>
                    </div>
                    <div class="form-text">Supported formats: Images (JPG, PNG, GIF) and Videos (MP4)</div>
                    <div class="media-preview" id="mediaPreview"></div>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> Save Media Coverage
                    </button>
                    <a href="dashboard.php" class="btn btn-outline">Cancel</a>
                </div>

                <div id="loader">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p>Uploading... Please wait</p>
                </div>
            </form>
        </div>
    </div>

    <script>
        function handleFileSelect(event) {
            const files = event.target.files;
            const preview = document.getElementById('mediaPreview');
            preview.innerHTML = '';

            Array.from(files).forEach((file, index) => {
                const reader = new FileReader();
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';

                reader.onload = function (e) {
                    if (file.type.startsWith('image/')) {
                        previewItem.innerHTML = `
                            <img src="${e.target.result}" alt="Preview">
                            <span class="remove-preview" onclick="removeFile(${index})">
                                <i class="fas fa-times"></i>
                            </span>
                        `;
                    } else if (file.type.startsWith('video/')) {
                        previewItem.innerHTML = `
                            <video src="${e.target.result}" controls></video>
                            <span class="remove-preview" onclick="removeFile(${index})">
                                <i class="fas fa-times"></i>
                            </span>
                        `;
                    }
                };

                reader.readAsDataURL(file);
                preview.appendChild(previewItem);
            });
        }

        function removeFile(index) {
            const input = document.getElementById('media');
            const dt = new DataTransfer();
            const { files } = input;

            for (let i = 0; i < files.length; i++) {
                if (i !== index) dt.items.add(files[i]);
            }

            input.files = dt.files;
            document.querySelectorAll('.preview-item')[index].remove();
        }

        document.getElementById('mediaCoverageForm').addEventListener('submit', function () {
            document.getElementById('loader').style.display = 'block';
            document.querySelector('button[type=submit]').disabled = true;
        });
    </script>
</body>

</html>