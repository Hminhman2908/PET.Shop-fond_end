// let cuahang ={};
let duLieu = {};
let dsSanpham =[];
let chuDe = 0;
let nhom = [
    { tieuDe: "Chủ đề" },
    { tieuDe: "Mobiles", ds: [{ maSo: "ALL", Ten: "Tất cả" }, { maSo: "IPHONE", Ten: "Hệ điều hành IOS" }, { maSo: "ANDROID", Ten: "Hệ điều hành ANDROID" }] },
    { tieuDe: "Tivis", ds: [{ maSo: "ALL", Ten: "Tất cả" }, { maSo: "SONY", Ten: "Tivi Sony" }, { maSo: "SAMSUNG", Ten: "Tivi Samsung" }, { maSo: "KHAC", Ten: "Tivi Khác" }] },
    { tieuDe: "Foods", ds: [{ maSo: "ALL", Ten: "Tất cả" }, { maSo: "CA_PHE", Ten: "Cafe & Sinh tố" }, { maSo: "MON_AN", Ten: "Thức ăn nhanh" }] }
];



Khoi_dong_Du_lieu().then(result=>{
    duLieu.dsDienthoai=result.dsDienthoai
    duLieu.dsTivi=result.dsTivi
    duLieu.dsMathang=result.dsMathang

    duLieu.dsMathang.sort((a, b) => a.Ma_so.localeCompare(b.Ma_so))
    dsSanpham=duLieu.dsDienthoai.concat(duLieu.dsTivi, duLieu.dsMathang)

    xuatDanhsachGiamgia(duLieu.dsDienthoai, 'Mobiles', Th_dsDienthoai, 4)
    xuatDanhsachGiamgia(duLieu.dsTivi, 'Tivis', Th_dsTivi, 4)
    xuatDanhsachGiamgia(duLieu.dsMathang, 'Foods', Th_dsMathang, 4)
    xuatDanhsachBanchay(duLieu.dsTivi, carouselId)
    xuatChudeLeft(0)

    Mobiles.onclick=()=>{
        chuDe=1
        xuatChudeLeft(chuDe)
        xuatChude(duLieu.dsDienthoai, 'Mobiles', Th_dsDienthoai)
        xuatDanhsachBanchay(duLieu.dsDienthoai, carouselId)
    }

    Tivis.onclick=()=>{
        chuDe=2
        xuatChudeLeft(chuDe)
        xuatChude(duLieu.dsTivi, 'Tivis', Th_dsDienthoai)
        xuatDanhsachBanchay(duLieu.dsTivi, carouselId)
    }

    Foods.onclick=()=>{
        chuDe=3
        xuatChudeLeft(chuDe)
        xuatChude(duLieu.dsMathang, 'Foods', Th_dsDienthoai)
        xuatDanhsachBanchay(duLieu.dsMathang, carouselId)
    }

    All.onclick=()=>{
        chuDe=0
        xuatChudeLeft(chuDe)
        xuatDanhsachGiamgia(duLieu.dsDienthoai, 'Mobiles', Th_dsDienthoai, 4)
        xuatDanhsachGiamgia(duLieu.dsTivi, 'Tivis', Th_dsTivi, 4)
        xuatDanhsachGiamgia(duLieu.dsMathang, 'Foods', Th_dsMathang, 4)
    }

    Contact.onclick = () => {
        window.location = './pages/lienhe.html'
    }

    //Sắp xếp
    document.querySelector("#Th_Sap_xep").onchange=()=>{
        let chon=document.querySelector("#Th_Sap_xep").value;
        switch (parseInt(chon)) {
            case 1:
                Sap_Tang_theo_Ten()
                break;
            case 2:
                Sap_Giam_theo_Ten()
                break;
            case 3:
                Sap_Tang_Gia()
                break;
            case 4:
                Sap_Giam_Gia()
                break;
            default:
                console.log('Khong biet')

        }
    }
    // Lọc giá
    document.querySelector("#Th_Loc_gia").onchange = () => {
        let value = document.querySelector("#Th_Loc_gia").value;
        //console.log(value);
        let ds = value.split("-");
        //console.log(ds);
        let bd = Number(ds[0]);
        let kt = Number(ds[1]);
        // console.log(`Bắt đầu: ${bd} - Kết thúc: ${kt}`);
        
        if (chuDe == 1) {
            let dsGia = duLieu.dsDienthoai.filter(item => item.Don_gia_Ban >= bd && item.Don_gia_Ban <= kt)
            xuatChude(dsGia, 'Mobiles', Th_dsDienthoai)
        } else if (chuDe == 2){
            let dsGia = duLieu.dsTivi.filter(item => item.Don_gia_Ban >= bd && item.Don_gia_Ban <= kt)
            xuatChude(dsGia, 'Tivis', Th_dsDienthoai)
        } else if (chuDe == 3){
            let dsGia = duLieu.dsMathang.filter(item => item.Don_gia_Ban >= bd && item.Don_gia_Ban <= kt)
            xuatChude(dsGia, 'Foods', Th_dsDienthoai)
        } else{
            let dsGia = dsSanpham.filter(item => item.Don_gia_Ban >= bd && item.Don_gia_Ban <= kt)
            xuatChude(dsGia, 'All', Th_dsDienthoai)
            // return false;
        }

    }


    Tim.onclick = () => {
        let gt = gtTim.value.trim();
        if (gt == "") {
            All.click()
            gtTim.value = ''
            return false
        }
        let dsTim = dsSanpham.filter(x => x.Ten.toLowerCase().includes(gt.toLowerCase()))
        xuatChude(dsTim, `Tìm theo : ${gt} `, Th_dsDienthoai)
    }

    if (sessionStorage.getItem("Danh_sach_Chon") != undefined) {
        ds = JSON.parse(sessionStorage.getItem("Danh_sach_Chon"))
        Th_Gio_hang.innerHTML = `<u>${ds.length}</u>`
    }
})
// Xây dựng các hàm sắp xếp
// Sắp xếp
function Sap_Tang_theo_Ten() {
    // Là chuỗi
    let dsTangtheoTen=[];
    if (chuDe == 1) {
        dsTangtheoTen=duLieu.dsDienthoai.sort((a, b) => a.Ten.localeCompare(b.Ten))
        xuatChude(duLieu.dsDienthoai, 'Mobiles', Th_dsDienthoai)
    } else if (chuDe == 2){
        dsTangtheoTen=duLieu.dsTivi.sort((a, b) => a.Ten.localeCompare(b.Ten))
        xuatChude(duLieu.dsTivi, 'Tivis', Th_dsDienthoai)
    } else if (chuDe == 3){
        dsTangtheoTen=duLieu.dsMathang.sort((a, b) => a.Ten.localeCompare(b.Ten))
        xuatChude(duLieu.dsMathang, 'Foods', Th_dsDienthoai)
    } else{
        dsTangtheoTen=dsSanpham.sort((a, b) => a.Ten.localeCompare(b.Ten))
        xuatChude(dsSanpham, 'All', Th_dsDienthoai)
        // return false;
    }
}
function Sap_Giam_theo_Ten() {
    // Là chuỗi
    let dsGiamtheoTen=[];
    if (chuDe == 1) {
        dsGiamtheoTen=duLieu.dsDienthoai.sort((a, b) => b.Ten.localeCompare(a.Ten))
        xuatChude(duLieu.dsDienthoai, 'Mobiles', Th_dsDienthoai)
    } else if (chuDe == 2){
        dsGiamtheoTen=duLieu.dsTivi.sort((a, b) => b.Ten.localeCompare(a.Ten))
        xuatChude(duLieu.dsTivi, 'Tivis', Th_dsDienthoai)
    } else if (chuDe == 3){
        dsGiamtheoTen=duLieu.dsMathang.sort((a, b) => b.Ten.localeCompare(a.Ten))
        xuatChude(duLieu.dsMathang, 'Foods', Th_dsDienthoai)
    } else{
        dsTangtheoTen=dsSanpham.sort((a, b) => b.Ten.localeCompare(a.Ten))
        xuatChude(dsSanpham, 'All', Th_dsDienthoai)
        // return false;
    }
}

function Sap_Tang_Gia() {
    // Là số
    let dsSaptanggia=[];
    if (chuDe == 1) {
        dsSaptanggia=duLieu.dsDienthoai.sort((a, b) => {
            return parseInt(a.Don_gia_Ban) - parseInt(b.Don_gia_Ban)
        })
        xuatChude(duLieu.dsDienthoai, 'Mobiles', Th_dsDienthoai)
    } else if (chuDe == 2){
        dsSaptanggia=duLieu.dsTivi.sort((a, b) => {
            return parseInt(a.Don_gia_Ban) - parseInt(b.Don_gia_Ban)
        })
        xuatChude(duLieu.dsTivi, 'Tivis', Th_dsDienthoai)
    } else if (chuDe == 3){
        dsSaptanggia=duLieu.dsMathang.sort((a, b) => {
            return parseInt(a.Don_gia_Ban) - parseInt(b.Don_gia_Ban)
        })
        xuatChude(duLieu.dsMathang, 'Foods', Th_dsDienthoai)
    } else{
        dsSaptanggia=dsSanpham.sort((a, b) => {
            return parseInt(a.Don_gia_Ban) - parseInt(b.Don_gia_Ban)
        })
        xuatChude(dsSanpham, 'All', Th_dsDienthoai)
        // return false;
    }

}
function Sap_Giam_Gia() {
    // Là số
    let dsSapgiamgia=[];
    if (chuDe == 1) {
        dsSapgiamgia=duLieu.dsDienthoai.sort((a, b) => {
            return parseInt(b.Don_gia_Ban) - parseInt(a.Don_gia_Ban)
        })
        xuatChude(duLieu.dsDienthoai, 'Mobiles', Th_dsDienthoai)
    } else if (chuDe == 2){
        dsSapgiamgia=duLieu.dsTivi.sort((a, b) => {
            return parseInt(b.Don_gia_Ban) - parseInt(a.Don_gia_Ban)
        })
        xuatChude(duLieu.dsTivi, 'Tivis', Th_dsDienthoai)
    } else if (chuDe == 3){
        dsSapgiamgia=duLieu.dsMathang.sort((a, b) => {
            return parseInt(b.Don_gia_Ban) - parseInt(a.Don_gia_Ban)
        })
        xuatChude(duLieu.dsMathang, 'Foods', Th_dsDienthoai)
    } else{
        dsSaptanggia=dsSanpham.sort((a, b) => {
            return parseInt(b.Don_gia_Ban) - parseInt(a.Don_gia_Ban)
        })
        xuatChude(dsSanpham, 'All', Th_dsDienthoai)
        // return false;
    }

}


// function Xuat_Thong_tin_Cua_hang(Cua_hang, Th_Cha) {
//     var Chuoi_HTML = `
//     <div class="row pt-2">
//         <div id="header"
//           class="col-12 col-md-2 col-xl-2 text-center align-content-center justify-content-center display-3">
//           <img src="${Dia_chi_server}/${Cua_hang.Ma_so}.png" class="img-fluid hinh">
//         </div>
//         <div class="col-10 col-md-10 col-xl-10">
//           <h1 class="mb-0 text-primary text-center">${Cua_hang.Ten}</h1>
//           <blockquote class="blockquote" style="text-align: center;">

//             <footer class="blockquote-footer"> <cite title="Source Title">Phục vụ Quí khách 24/7</cite>
//             </footer>
//             <footer class="blockquote-footer"> <cite title="Source Title">
//                 <i class="fa fa-home" aria-hidden="true"></i> : ${Cua_hang.Dia_chi}</cite>
//             </footer>
//             <footer class="blockquote-footer"> <cite title="Source Title">
//                 <i class="fa fa-envelope-o" aria-hidden="true"></i> : admin@thutran.com -
//                 <i class="fa fa-phone" aria-hidden="true"></i>: <a href="tel:08 777 6666">${Cua_hang.Dien_thoai}</a>
//               </cite></footer>
//           </blockquote>
//         </div>
//       </div>
//     `
//     Th_Cha.innerHTML = Chuoi_HTML
// }
// apidsCuahang().then(result=>{
//     cuaHang=result;
//     Xuat_Thong_tin_Cua_hang(cuaHang,Th_Cuahang)
// })

// Xây dựng Hàm Xuất Sản phẩm Chủ đề left
function xuatSanphamtheoChude(masoNhom) {
    let dsSanphamChude = []
    if (chuDe == 1) {
        if (masoNhom != "ALL") {
            dsSanphamChude = duLieu.dsDienthoai.filter(x => x.Nhom_Dien_thoai.Ma_so == masoNhom)
        } else {
            Mobiles.click()
            return false
        }

    } else if (chuDe == 2) {
        if (masoNhom != "ALL") {
            dsSanphamChude = duLieu.dsTivi.filter(x => x.Nhom_Tivi.Ma_so == masoNhom)
        } else {
            Tivis.click()
            return false
        }
    } else if (chuDe == 3) {
        if (masoNhom != "ALL") {
            dsSanphamChude = duLieu.dsMathang.filter(x => x.Nhom_Mat_hang.Ma_so == masoNhom)
        } else {
            Foods.click()
            return false
        }

    }
    let tD=nhom[chuDe].ds.find(x=>x.maSo==masoNhom)
    xuatChude(dsSanphamChude, tD.Ten , Th_dsDienthoai)
}

// Xây dựng Hàm Xuất Chủ đề left 
function xuatChudeLeft(chuDe = 0) {

    let html = `<h3 class="text-white p-2" style="background-color: #91c1e2;">${nhom[chuDe].tieuDe}</h3>`;

    if (chuDe != 0) {
        html = `<h3 class="bg-danger text-white p-2">${nhom[chuDe].tieuDe}</h3>`;
        nhom[chuDe].ds.forEach((item, index) => {
            html += `
            <div class="form-check border-bottom pt-2 pb-2 text-primary">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="r" id="" onchange="xuatSanphamtheoChude(this.value)" value="${item.maSo}" ${(index == 0) ? "checked" : ""}>
                    ${item.Ten}
                </label>
            </div>
            `
        })
    } else {
        html += `
        <ul class="list-group mb-2">
            <li class="list-group-item">
                <a class="nav-link" href="javaScript:All.click()">
                    <i class="fa fa-list-ul" aria-hidden="true"></i> Discount Products</a>
            </li>
            <li class="list-group-item">
                <a class="nav-link" href="javaScript:Mobiles.click()">
                    <i class="fa fa-apple" aria-hidden="true"></i> Mobiles</a>
            </li>
            <li class="list-group-item ">
                <a class="nav-link" href="javaScript:Tivis.click()">
                    <i class="fa fa-television" aria-hidden="true"></i> Tivis</a>
            </li>
            <li class="list-group-item ">
                <a class="nav-link" href="javaScript:Foods.click()">
                    <i class="fa fa-thumbs-o-up" aria-hidden="true"></i> Foods</a>
            </li>
        </ul>                   
        `
    }
    chuDeLeft.innerHTML = html
}

//Xuất danh sách giảm giá
function xuatDanhsachGiamgia(ds, tieuDe, theHien, soSp) {
    theHien.innerHTML = ''
    ds = ds.slice(0, soSp)
    let html = `<div class='col-12 mb-1'><h3 class="text-white p-2" style="background-color: #91c1e2;">${tieuDe} <small>(${ds.length})</small></h3></div>`
    
    ds.forEach((item, index) => {
        html += `
                    <div class="col-6 col-md-4 col-xl-3 mb-2">
                        <div class="card v-100">
                            <img class="card-img-top" src="${Dia_chi_server}/${item.Ma_so}.png" alt="${item.Ten}" title="${item.Ten}" >
                            <div class="card-body">
                                <h6 class="card-title text-success">${item.Ten}</h6>
                                <p class="card-text text-danger text-center">${Tao_Chuoi_The_hien_So_nguyen_duong(item.Don_gia_Ban * 0.8)} <sup><u>đ</u></sup></p>
                                <div class="text-right">
                                    <a class="btn btn-sm btn-danger" onclick="themGiohang('${item.Ma_so}')">
                                        <i class="fa fa-shopping-cart text-white" aria-hidden="true"></i>
                                    </a>
                                    <a class="btn btn-sm btn-outline-primary" onclick="chiTietSanPham('${item.Ma_so}')" >
                                        <i class="fa fa-book text-primary" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
        `
    })
    theHien.innerHTML = html;

};

// Xuất Danh sách bán chạy
function xuatDanhsachBanchay(Danh_sach, Th_Cha) {
    let ds = Danh_sach.slice(0, 3);
    let html = `<ol class="carousel-indicators mt-1 mb-1">
    <li data-target="#carouselId" data-slide-to="0" class="active"></li>
    <li data-target="#carouselId" data-slide-to="1"></li>
    <li data-target="#carouselId" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner" role="listbox" >`;
    ds.forEach((item, index) => {
        html += `<div class="carousel-item ${index == 0 ? 'active' : ''}">
        <img src="${Dia_chi_server}/${item.Ma_so}.png" alt="${item.Ten}" loading="lazy"  class="img-fluid">
      </div>`
    })
    html += `</div>
    <a class="carousel-control-prev" href="#carouselId" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselId" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>`
    Th_Cha.innerHTML = html;

}

// Chủ đề
function xuatChude(ds, tieuDe, theHien) {
    theHien.innerHTML = ''
    Th_dsTivi.innerHTML = ``
    Th_dsMathang.innerHTML = ``
    let html = `<div class='col-12 mb-1'><h3 class="bg-danger text-white p-2">${tieuDe} <small>(${ds.length})</small></h3></div>`
    ds.forEach((item, index) => {
        let ten=item.Ten.concat('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
        html += `
                    <div class="col-6 col-md-4 col-xl-3 mb-2">
                        <div class="card v-100">
                            <img class="card-img-top" ${(index > 3) ? 'loading="lazy"' : ''} src="${Dia_chi_server}/${item.Ma_so}.png" alt="${item.Ma_so}" title="${item.Ten}">
                            <div class="card-body">
                                <h6 class="card-title text-success">${item.Ten}</h6>
                                <p class="card-text text-danger text-center">${Tao_Chuoi_The_hien_So_nguyen_duong(item.Don_gia_Ban)} <sup><u>đ</u></sup></p>
                                <div class="text-right">
                                    <a class="btn btn-sm btn-danger" onclick="themGiohang('${item.Ma_so}')">
                                        <i class="fa fa-shopping-cart text-white" aria-hidden="true"></i>
                                    </a>
                                    <a class="btn btn-sm btn-outline-primary" onclick="chiTietSanPham('${item.Ma_so}')" >
                                        <i class="fa fa-book text-primary" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
       `
    })
    theHien.innerHTML = html;
}

// Xây dựng Hàm Tìm 
function KeyCode(event) {

    if (event.keyCode == 13) {
        let gt = event.target.value
        if (gt == "") {
            All.click()
            gtTim.value = ''
            return false
        }
        let dsTim = dsSanpham.filter(x => x.Ten.toLowerCase().includes(gt.toLowerCase()))
        xuatChude(dsTim, `Tìm theo : ${gt} `, Th_dsDienthoai)
    }
}

//Xây dựng Hàm Giỏ hàng
function themGiohang(id) {

    //Lưu Session 
    var ds = []
    if (sessionStorage.getItem("Danh_sach_Chon") != undefined) {
        ds = JSON.parse(sessionStorage.getItem("Danh_sach_Chon"))
    }

    var vt = ds.indexOf(x => x.Ma_so == id)

    if (vt == -1) {
        let tmp = dsSanpham.find(x => x.Ma_so == id);
        let sp = {
            "Ma_so": id,
            "Ten": tmp.Ten,
            "So_luong": 1,
            "Don_gia_Ban": Number(tmp.Don_gia_Ban)
        }
        ds.push(sp) // Thêm
    }

    if (ds.length > 0) {
        sessionStorage.setItem("Danh_sach_Chon", JSON.stringify(ds))
    } else {
        sessionStorage.removeItem("Danh_sach_Chon")
    }
    Th_Gio_hang.innerHTML = `<u>${ds.length}</u>`

}

//Xây dựng Hàm chi tiết sản phẩm
function chiTietSanPham(maSo) {
    let item = dsSanpham.find(x => x.Ma_so == maSo)
    modalTitle.innerHTML = item.Ten
    let html = `
        <img src="${Dia_chi_server}/${item.Ma_so}.png" class="img-fluid">
        <p class="text-danger text-center mt-2">Giá Bán: ${Tao_Chuoi_The_hien_So_nguyen_duong(item.Don_gia_Ban)} <sup><u>đ</u></sup></p>
    `
    modalBody.innerHTML = html;
    showModal.click()

}