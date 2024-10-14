
function goToNextStep() {
    // Hide step 1, show step 2
    document.getElementById('step-1').classList.remove('active');
    document.getElementById('step-2').classList.add('active');

    // Update the progress tracker
    document.getElementById('circle-1').classList.add('inactive');
    document.getElementById('circle-2').classList.remove('inactive');
}


function goToPreviousStep() {
    // Hide step 2, show step 1
    document.getElementById('step-2').classList.remove('active');
    document.getElementById('step-1').classList.add('active');

    // Revert the progress tracker
    document.getElementById('circle-2').classList.add('inactive');
    document.getElementById('circle-1').classList.remove('inactive');
}

function previewLogo() {
    const file = document.getElementById('logo-upload').files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        document.getElementById('logo-preview').src = reader.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

function previewBanner() {
    const file = document.getElementById('banner-upload').files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        document.getElementById('banner-preview').src = reader.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

function previewImage() {
    const file = document.getElementById('imageUpload').files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        const newImg = document.createElement('img');
        newImg.src = reader.result;
        newImg.style.width = "150px";
        newImg.style.height = "150px";
        newImg.style.objectFit = "cover";
        newImg.style.borderRadius = "8px";
        newImg.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";

        const imageGallery = document.querySelector('.image-gallery');
        imageGallery.insertBefore(newImg, imageGallery.firstChild); // Chèn ảnh mới vào đầu danh sách
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}


 // Khởi tạo TinyMCE cho phần Mô tả công ty
tinymce.init({
    selector: '#richTextEditor', // Textarea được chuyển đổi thành TinyMCE
    plugins: [
        // Các plugin chỉnh sửa miễn phí
        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount'
    ],
    toolbar: 'undo redo | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | emoticons charmap codesample | table | removeformat',
    menubar: false, // Tùy chọn: Ẩn thanh menu
    branding: false, // Tùy chọn: Loại bỏ nhãn hiệu "Powered by TinyMCE"
    elementpath: false // Loại bỏ đường dẫn của phần tử (để loại bỏ "p")
});