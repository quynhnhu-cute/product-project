var sanPhamService = new SanPhamService();
function getEle(id) {
  return document.getElementById(id);
}

function renderTable() {}

var layDanhSachSP = function () {
  sanPhamService
    .layDSSP()
    .then(function (result) {
      renderTable(result.data);
      setLocalStorage(result.data);
    })
    .catch(function (err) {
      console.log(err);
    });
};

function xoaSanPham(id) {
  sanPhamService
    .xoaSanPham(id)
    .then(function (result) {
      // Load lại ds sp sau khi xóa thành công
      layDanhSachSP();
    
      
      // Ẩn model sau khi cập nhật thành công

      
      
    })
    .catch(function (error) {
      console.log(error);
    });
}

var capNhatSanPham = function(id){
  var tenSP = document.getElementById("TenSP").value;
  var gia = document.querySelector("#GiaSP").value;
  var hinhAnh = document.querySelector("#HinhSP").value;
  var moTa = document.querySelector("#moTa").value;
  var sp = new SanPham(tenSP, gia, hinhAnh, moTa);
  
  sanPhamService.capNhatSP(id,sp).then(function(result){
    // alert('Success');
    document.querySelector("#myModal .close").click();
      layDanhSachSP();
  }).catch(function(error){
      console.log(error);
  });
}

var xemSanPham = function (id) {
  sanPhamService
    .xemSanPham(id)
    .then(function (result) {
      console.log(result.data);
      // var myModal = document.querySelector("#myModal");
      document.getElementById("TenSP").value = result.data.tenSP;
      document.querySelector("#GiaSP").value = result.data.gia;
      document.querySelector("#HinhSP").value = result.data.hinhAnh;
      document.querySelector("#moTa").innerHTML = result.data.moTa;
      document.querySelector(".modal-footer").innerHTML = `<button class="btn btn-success" onclick="capNhatSanPham('${id}')" >Cập nhật</button>`
    })
    .catch(function (error) {
      console.log(error);
    });
};
function renderTable(mangSP) {
  var content = "";
  mangSP.map(function (item, index) {
    content += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.tenSP}</td>
        <td>${item.gia}</td>
        <td><img src="${item.hinhAnh}" ></td>
        <td>${item.moTa}</td>
        <td>
          <button class="btn btn-danger" onclick="xoaSanPham('${
            item.id
          }')">Xóa</button>
          <button class="btn btn-success" onclick="xemSanPham('${
            item.id
          }')" data-toggle="modal" data-target="#myModal">Xem</button>
        </td>
      </tr>
    `;
  });
  getEle("tblDanhSachSP").innerHTML = content;
}

layDanhSachSP();

var themSanPham = function () {

  /**
   * Lấy thông tin từ form
   */

  var tenSP = document.getElementById("TenSP").value;
  var gia = document.querySelector("#GiaSP").value;
  var hinhAnh = document.querySelector("#HinhSP").value;
  var moTa = document.querySelector("#moTa").value;

  /**
   * Khởi tạo đối tượng sản phầm
   */

  var sp = new SanPham(tenSP, gia, hinhAnh, moTa);
  // console.log(sp);

  /**
   * Gọi API để lưu data xuống DB
   */

  sanPhamService
    .themSanPham(sp)
    .then(function (result) {
      layDanhSachSP();
    })
    .catch(function (error) {
      console.log(error);
    });
};

document.querySelector("#btnThemSP").onclick = function () {
  /**
   * Clear data
   */

  ///Clear data trên form sau khi cập nhật
  getEle('formSP').reset();
  var modalFooter = document.querySelector(".modal-footer");
  modalFooter.innerHTML = `<button class="btn btn-success" onclick="themSanPham()">Thêm sản phẩm</button>`;
};

document.querySelector('#ipTimKiem').addEventListener('keyup', function(){
  var chuoiTK = document.querySelector("#ipTimKiem").value;
  var arrSP = getLocalStorage();
  var result = sanPhamService.timKiemSP(arrSP, chuoiTK);
  renderTable(result);
  
})
function setLocalStorage(dssp) {
  localStorage.setItem("DSSP", JSON.stringify(dssp));
}

function getLocalStorage() {
  if (localStorage.getItem("DSSP")) {
    return JSON.parse(localStorage.getItem("DSSP"));
  }
}
