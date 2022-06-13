let dsDienthoai;
let Danh_sach_Cap_nhat = [];

Khoi_dong_Du_lieu();

function Khoi_dong_Du_lieu() {
  if (sessionStorage.getItem("Danh_sach_Chon") != undefined) {
    Danh_sach_Cap_nhat = JSON.parse(sessionStorage.getItem("Danh_sach_Chon"));
    Xuat_San_pham_Mua(Danh_sach_Cap_nhat, Th_Danh_sach_San_pham_Mua);
  }
}

function Xuat_San_pham_Mua(Danh_sach_Mua, Th_Cha) {
  Th_Cha.innerHTML = "";
  var noi_dung_HTML = ``;
  Danh_sach_Mua.forEach((San_pham_Mua) => {
    let thanhTien = San_pham_Mua.So_luong * San_pham_Mua.Don_gia_Ban;
    noi_dung_HTML += `
        <tr>
            <td scope="row" class="text-center">
                <img src=${Dia_chi_server}/${
      San_pham_Mua.Ma_so
    }.png style="width:80px" />
            </td >
            <td style="vertical-align: middle;" class="text-nowrap">${
              San_pham_Mua.Ten
            }</td>
            <td style="vertical-align: middle;text-align: right;">
                <input onchange="soLuong('${
                  San_pham_Mua.Ma_so
                }',this)" type="number" min="1" max="10" value="${
      San_pham_Mua.So_luong
    }" class="text-right" />
            </td>
            <td style="vertical-align:middle;text-align: right;">${Tao_Chuoi_The_hien_So_nguyen_duong(
              San_pham_Mua.Don_gia_Ban
            )} <sup><u>đ</u></sup></td>
            <td style="vertical-align: middle;text-align: right;">${Tao_Chuoi_The_hien_So_nguyen_duong(
              thanhTien
            )} <sup><u>đ</u></sup></td>
            <td style="vertical-align: middle;text-align: center;" class='xoa' onclick="xoaGiohang('${
              San_pham_Mua.Ma_so
            }')"> 
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            </td>
        </tr >
        `;
  });
  noi_dung_HTML += `
        <tr>
                <td colspan="6" id="Th_Tong" class="price" style="text-align: right;"></td>
                
        </tr>
    `;
  Th_Cha.innerHTML = noi_dung_HTML;
  tongThanhtien();
}

function tongThanhtien() {
  let kq = 0;
  Danh_sach_Cap_nhat = JSON.parse(sessionStorage.getItem("Danh_sach_Chon"));
  Danh_sach_Cap_nhat.forEach((dt) => {
    kq += dt.So_luong * dt.Don_gia_Ban;
  });
  Th_Tong.innerHTML = `<strong>Tổng thành tiền:</strong> ${Tao_Chuoi_The_hien_So_nguyen_duong(
    kq
  )} <sup><u>đ</u></sup>`;
}

function soLuong(maSo, sl) {
  let tr = sl.parentNode.parentNode;
  let soLuong = sl.value;
  let dt = Danh_sach_Cap_nhat.find((x) => x.Ma_so == maSo);
  dt.So_luong = Number(soLuong);
  sessionStorage.setItem("Danh_sach_Chon", JSON.stringify(Danh_sach_Cap_nhat));
  let thanhTien = Number(soLuong) * Number(dt.Don_gia_Ban);
  tr.children[4].innerHTML = `${Tao_Chuoi_The_hien_So_nguyen_duong(
    thanhTien
  )} <sup><u>đ</u></sup>`;
  tongThanhtien();
}

const xoaGiohang = (maSo) => {
  let vt = Danh_sach_Cap_nhat.findIndex((x) => x.Ma_so == maSo);
  Danh_sach_Cap_nhat.splice(vt, 1);
  if (Danh_sach_Cap_nhat.length > 0) {
    sessionStorage.setItem(
      "Danh_sach_Chon",
      JSON.stringify(Danh_sach_Cap_nhat)
    );
    Xuat_San_pham_Mua(Danh_sach_Cap_nhat, Th_Danh_sach_San_pham_Mua);
    tongThanhtien();
  } else {
    Th_Bo_qua.click();
  }
};

///////////////////////////////////////////////
function Xuat_Thong_tin_Dat_hang_Thanh_cong(Th_Cha, Ds_Phieu_Dat) {
  let Ho_ten = Th_Ho_ten.value;
  let Dien_thoai = Th_Dien_thoai.value;
  let Email = Th_Email.value;
  let Dia_chi = Th_Dia_chi.value;

  let noi_dung_HTML = `
    <div class="col-md-12 table-responsive">
    <table class="table table-sm table-bordered table-striped table-hover">
        <thead class="bg-primary text-white">
            <tr class="text-center">
                <th>Hình </th>
                <th>Tên </th>
                <th>Số lượng </th>
                <th>Đơn giá Bán</th>
                <th>Thành tiền</th>
            </tr>
        </thead>
    `;
  let Tong = 0;
  Ds_Phieu_Dat.forEach((Dien_thoai_Mua) => {
    let thanhTien = Dien_thoai_Mua.So_luong * Dien_thoai_Mua.Don_gia_Ban;
    noi_dung_HTML += `
        <tbody>
        <tr>
            <td scope="row" class="text-center">
                <img src=${Dia_chi_server}/${
                  Dien_thoai_Mua.Ma_so
                }.png style="width:80px" />
            </td >
            <td style="vertical-align: middle;" class="text-nowrap">${
              Dien_thoai_Mua.Ten
            }</td>
            <td style="vertical-align: middle;text-align: right;">${
              Dien_thoai_Mua.So_luong
            }</td>
            <td style="vertical-align:middle;text-align: right;">${Tao_Chuoi_The_hien_So_nguyen_duong(
              Dien_thoai_Mua.Don_gia_Ban
            )} <sup><u>đ</u></sup></td>
            <td style="vertical-align: middle;text-align: right;">${Tao_Chuoi_The_hien_So_nguyen_duong(
              thanhTien
            )} <sup><u>đ</u></sup></td>
        </tr >
        `;
    Tong += Dien_thoai_Mua.So_luong * Dien_thoai_Mua.Don_gia_Ban;
  });
  noi_dung_HTML += `
    <tr>
        <td colspan="5" class="text-right text-danger"><strong>Tổng thành tiền:${Tao_Chuoi_The_hien_So_nguyen_duong(
          Tong
        )} <sup><u>đ</u></sup> </strong></td>
    </tr>
    <tr>
        <td colspan="5"><h5 class="text-secondary">Chào Quí khách: ${Ho_ten}<br>
        Nhân viên Chúng tôi sẽ giao hàng theo địa chỉ: ${Dia_chi}<br>
        Liên hệ quí khách qua số điện thoại: ${Dien_thoai}<br>
        Email: ${Email}
        </h5>     
        </td>
    </tr>
    <tr>
        <td colspan="5" class="text-center"><button class="btn btn-primary" onclick="window.location='../index.html'" >Xác nhận</button></td>
    </tr>    
    
    </tbody>
    </table>
    </div>
    `;
  Th_Cha.innerHTML = noi_dung_HTML;
}

Th_Bo_qua.onclick = () => {
  // Xóa Session
  sessionStorage.removeItem("Danh_sach_Chon");
  // Chuyển trang
  window.location = `../index.html`;
};

Th_Dong_y.onclick = () => {
  var dsDonhang = [];
  if (
    Th_Ho_ten.value == "" ||
    Th_Dien_thoai.value == "" ||
    Th_Email.value == ""
  ) {
    Th_Thong_bao.innerHTML = "<strong>Nhập thông tin giao hàng ...</strong>";
    return false;
  }

  // Tạo danh sách đơn hàng
  Danh_sach_Cap_nhat.forEach((Dien_thoai) => {
    var Phieu_Dat = {
      "Ngay_Dat_hang": new Date().toLocaleDateString(),
      "Ngay_Giao_hang": new Date(Th_Ngay_Giao_hang.value).toLocaleDateString(),
      "So_luong": parseInt(Dien_thoai.So_luong),
      "Don_gia_Ban": parseInt(Dien_thoai.Don_gia_Ban),
      "Tien": parseInt(Dien_thoai.Don_gia_Ban) * parseInt(Dien_thoai.So_luong),
      "Trang_thai": "CHUA_GIAO_HANG",
      "Khach_hang": {
        "Ho_ten": document.querySelector("#Th_Ho_ten").value,
        "Dien_thoai": document.querySelector("#Th_Dien_thoai").value,
        "Email": document.querySelector("#Th_Email").value,
        "Dia_chi": document.querySelector("#Th_Dia_chi").value
      },
    };
    // Tạo Đơn hàng
    var maso=Dien_thoai.Ma_so;
    var donHang = {
      key: maso,
      Danh_sach_Cap_nhat: Phieu_Dat,
      dathang: Phieu_Dat
    };

    dsDonhang.push(donHang);
    // console.log(dsDonhang)
  });

  apiDathang(dsDonhang).then(result=>{
    console.log(result);
    // Xóa session
    // Th_XoaCarts.click();
  }).catch(err=>{
    console.log(err);
  })

  setTimeout(() => {
    Th_Thong_bao.innerHTML =
      "<strong>Cám ơn Quí khách đã mua hàng. Xác nhận Đơn hàng</strong>";
    Th_Chuc_nang.style.display = "none";
    Xuat_Thong_tin_Dat_hang_Thanh_cong(Th_Cha, Danh_sach_Cap_nhat);
    sessionStorage.removeItem("Danh_sach_Chon");
  }, 3000);

};

