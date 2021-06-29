function SanPhamService() {
  this.layDSSP = function () {
    var promise = axios({
      url: 'https://60d5dc02943aa60017768c68.mockapi.io/products',
      method: 'GET',
    });
    return promise;
  };


  this.themSanPham = function(sp){
    /**
     * POST: method thêm mới sản phẩm
     * data: dữ liệu thêm vào dưới DB
     */
    return axios({
      url: 'https://60d5dc02943aa60017768c68.mockapi.io/products',
      method: 'POST',
      data: sp,
    }
    );
  }

  this.xoaSanPham = function(id){
    return axios({
      url: `https://60d5dc02943aa60017768c68.mockapi.io/products/${id}`,
      method: 'DELETE',
    })
  }

  this.xemSanPham = function(id){
    // GET: lấy data của 1 sp dựa vào id 
    return axios({
      url: `https://60d5dc02943aa60017768c68.mockapi.io/products/${id}`,
      method: 'GET',
    })
  }

  this.capNhatSP = function(id,sp){
    return axios({
      url: `https://60d5dc02943aa60017768c68.mockapi.io/products/${id}`,
      method: 'PUT',
      data:sp
    })
  }

  this.timKiemSP = function(dssp, chuoiTK){
    return dssp.filter(function(sp){
      // Kiểm tra trong chuỗi có chữ ko , nếu có trả index, ko thì trả -1
      return sp.tenSP.toLowerCase().indexOf(chuoiTK.toLowerCase()) !== -1;
    })
  }
}
