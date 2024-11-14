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

function downloadCSV(data) {
  const csv = data.map((row) => Object.values(row).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "students.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function downloadJSON(data) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "students.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

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
  const file = document.getElementById('banner-upload').files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
      document.getElementById('banner-preview').src = reader.result;
  };

  if (file) {
      reader.readAsDataURL(file);
  }
}