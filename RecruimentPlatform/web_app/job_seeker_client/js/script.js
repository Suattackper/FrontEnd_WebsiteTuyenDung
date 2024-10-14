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
