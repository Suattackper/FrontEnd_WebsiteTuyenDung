function goToNextStep() {
  // Hide step 1, show step 2
  document.getElementById("step-1").classList.remove("active");
  document.getElementById("step-2").classList.add("active");

  // Update the progress tracker
  document.getElementById("circle-1").classList.add("inactive");
  document.getElementById("circle-2").classList.remove("inactive");
}

function goToPreviousStep() {
  // Hide step 2, show step 1
  document.getElementById("step-2").classList.remove("active");
  document.getElementById("step-1").classList.add("active");

  // Revert the progress tracker
  document.getElementById("circle-2").classList.add("inactive");
  document.getElementById("circle-1").classList.remove("inactive");
}

tinymce.init({
  selector: "#richTextEditor", // Textarea được chuyển đổi thành TinyMCE
  plugins: [
    // Các plugin chỉnh sửa miễn phí
    "anchor",
    "autolink",
    "charmap",
    "codesample",
    "emoticons",
    "image",
    "link",
    "lists",
    "media",
    "searchreplace",
    "table",
    "visualblocks",
    "wordcount",
  ],
  toolbar:
    "undo redo | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | emoticons charmap codesample | table | removeformat",
  menubar: false, // Tùy chọn: Ẩn thanh menu
  branding: false, // Tùy chọn: Loại bỏ nhãn hiệu "Powered by TinyMCE"
  elementpath: false, // Loại bỏ đường dẫn của phần tử (để loại bỏ "p")
});

// ========================== Export Js Start ==============================
// document.getElementById("exportOptions").addEventListener('change', function () {
//   const format = this.value;
//   const table = document.getElementById("studentTable");
//   let data = [];
//   const headers = [];

//   // Get the table headers
//   table.querySelectorAll("thead th").forEach((th) => {
//     headers.push(th.innerText.trim());
//   });

//   // Get the table rows
//   table.querySelectorAll("tbody tr").forEach((tr) => {
//     const row = {};
//     tr.querySelectorAll("td").forEach((td, index) => {
//       row[headers[index]] = td.innerText.trim();
//     });
//     data.push(row);
//   });

//   if (format === "csv") {
//     downloadCSV(data);
//   } else if (format === "json") {
//     downloadJSON(data);
//   }
// });

function previewFile() {
  const previewContainer = document.getElementById("file-preview");
  const files = document.getElementById("file-upload").files;

  for (const file of files) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const previewBox = document.createElement("div");
      previewBox.classList.add("preview-box");

      const img = document.createElement("img");
      img.src = e.target.result;
      previewBox.appendChild(img);

      previewContainer.appendChild(previewBox);
    };
    reader.readAsDataURL(file);
  }
}

function previewBanner() {
  const file = document.getElementById("banner-upload").files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    document.getElementById("banner-preview").src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

// Resume Upload
// Biến toàn cục để lưu trạng thái URL file đã chọn
let fileUrl = ""; // To store the temporary URL for the uploaded file

// Xử lý sự kiện tải file lên
async function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Kiểm tra kích thước file (tối đa 5 MB)
  if (file.size > 5 * 1024 * 1024) {
    alert("File không được vượt quá 5MB.");
    return;
  }

  // Cập nhật thông tin file
  document.getElementById("fileName").textContent = file.name;
  document.getElementById(
    "fileUpdateTime"
  ).textContent = `Cập nhật lần cuối ${new Date().toLocaleString()}`;

  // Tạo URL tạm thời cho file
  if (fileUrl) URL.revokeObjectURL(fileUrl); // Hủy URL trước đó nếu có
  fileUrl = URL.createObjectURL(file);

  // Hiển thị vùng xem trước CV
  const cvPreview = document.getElementById("cvPreview");
  const pdfThumbnail = document.getElementById("pdfThumbnail");
  const wordIcon = document.getElementById("wordIcon");
  cvPreview.style.display = "block";

  // Kiểm tra loại file (PDF hoặc Word)
  const fileExtension = file.name.split(".").pop().toLowerCase();
  if (fileExtension === "pdf") {
    // Hiển thị thumbnail PDF
    pdfThumbnail.style.display = "block";
    wordIcon.style.display = "none";

    // Xử lý hiển thị nội dung PDF (nếu cần)
    const pdf = await pdfjsLib.getDocument(fileUrl).promise;
    const page = await pdf.getPage(1);
    const scale = 1.5;
    const viewport = page.getViewport({ scale });
    const canvas = document.getElementById("pdfThumbnail");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;
  } else {
    // Hiển thị icon Word cho file Word
    pdfThumbnail.style.display = "none";
    wordIcon.style.display = "flex";
  }
}

// Mở file xem trước
function openFilePreview() {
  if (!fileUrl) {
    alert("Không có file nào để xem trước.");
    return;
  }

  const fileExtension = document
    .getElementById("fileName")
    .textContent.split(".")
    .pop()
    .toLowerCase();

  if (fileExtension === "pdf") {
    // Mở file PDF trong tab mới
    window.open(fileUrl, "_blank");
  } else {
    // Kích hoạt tải xuống cho file Word
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = document.getElementById("fileName").textContent;
    link.click();
  }
}

// Hàm xử lý xóa CV
function deleteCV() {
  const cvPreview = document.getElementById("cvPreview");
  const fileName = document.getElementById("fileName");

  // Ẩn vùng xem trước và reset thông tin
  cvPreview.style.display = "none";
  fileName.textContent = "Không có CV nào được tải lên.";
  document.getElementById("fileUpdateTime").textContent = "";

  // Xóa URL tạm thời
  if (fileUrl) URL.revokeObjectURL(fileUrl);
  fileUrl = "";

  // Reset lại input file
  const fileInput = document.getElementById("fileInput");
  fileInput.value = ""; // Reset input file

  // Ẩn modal xác nhận
  const deleteModal = document.getElementById("delete-cv");
  const modal = bootstrap.Modal.getInstance(deleteModal);
  modal.hide();
}

/*=============================================*/

// Cho chuc nang apply cv
const existingCV = document.getElementById("existingCV");
const uploadCV = document.getElementById("uploadCV");
const uploadButton = document.getElementById("uploadButton");
const fileInput = document.getElementById("fileInput");
const fileInfo = document.getElementById("fileInfo");

// Bật/tắt nút "Chọn File" dựa trên radio được chọn
existingCV.addEventListener("change", () => {
  if (existingCV.checked) {
    uploadButton.disabled = true;
    fileInput.value = "";
    fileInfo.textContent = "";
  }
});

uploadCV.addEventListener("change", () => {
  if (uploadCV.checked) {
    uploadButton.disabled = false;
  }
});

// Khi nhấn nút "Chọn File", mở trình quản lý file
uploadButton.addEventListener("click", () => {
  fileInput.click();
});

// Kiểm tra file khi người dùng tải lên
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    // Kiểm tra định dạng file
    const validExtensions = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validExtensions.includes(file.type)) {
      alert("Chỉ chấp nhận file .pdf, .doc, .docx!");
      fileInput.value = "";
      fileInfo.textContent = "";
      return;
    }

    // Kiểm tra dung lượng file
    if (file.size > 5 * 1024 * 1024) {
      // 5MB
      alert("Dung lượng file không được vượt quá 5MB!");
      fileInput.value = "";
      fileInfo.textContent = "";
      return;
    }

    // Hiển thị thông tin file đã chọn
    fileInfo.textContent = `Đã chọn: ${file.name}`;
  }
});

/*=============================================*/
function previewFileJobCategory() {
  const previewContainer = document.getElementById('img-job-category-preview');
  const file = document.getElementById('img-upload-job-category').files[0]; // Lấy file đầu tiên

  // Xóa nội dung hiện tại trong vùng xem trước
  previewContainer.innerHTML = '';

  if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
          const previewBox = document.createElement('div');
          previewBox.classList.add('preview-box');
          
          const img = document.createElement('img');
          img.src = e.target.result;
          img.alt = 'Uploaded Image';
          img.style.maxWidth = '100%'; // Đảm bảo ảnh không vượt quá kích thước container
          previewBox.appendChild(img);
          
          previewContainer.appendChild(previewBox);
      };
      reader.readAsDataURL(file);
  }
}
