let Duong_dan_Du_lieu="./data"
// const Dia_chi_server ="http://localhost:8080"
const Dia_chi_server ="https://js-hmm-server.herokuapp.com"

function Doc_Du_lieu(tapTin){
    return new Promise((Ket_qua, Loi) => {
        let Du_lieu = {}
        let http = new XMLHttpRequest()
        http.onload = () => {
            let Chuoi_JSON = http.responseText
            Du_lieu = JSON.parse(Chuoi_JSON)
            Ket_qua(Du_lieu)
        }
        let url = `${Duong_dan_Du_lieu}/${tapTin}`
        http.open("GET", url)
        http.send()
    })
    
}

async function Khoi_dong_Du_lieu() {
    let dsDienthoai = await Doc_Du_lieu('Dien_thoai.json')
    let dsTivi = await Doc_Du_lieu('Ti_vi.json')
    let dsMathang = await Doc_Du_lieu('Mat_hang.json')
    spinner.style.display = 'none';
    mainContainer.style.visibility='visible'
    return { dsDienthoai, dsTivi, dsMathang }
}

function apidsCuahang() {
    return new Promise((Ket_qua, Loi) => {
        var Du_lieu = {}
        var http = new XMLHttpRequest()
        http.onload = () => {
            var strJSONdsCuahang = http.responseText
            Du_lieu = JSON.parse(strJSONdsCuahang)
            Ket_qua(Du_lieu)
        }
        var url = `${Dia_chi_server}/dsCuahang`
        http.open("GET",url)
        http.send();
    })
}

function apidsDienthoai(){
    return new Promise((Ket_qua, Loi)=>{
        var Du_lieu ={};
        var http =new XMLHttpRequest()
        http.onload=()=>{
            var strJSONdsDienthoai=http.responseText
            Du_lieu=JSON.parse(strJSONdsDienthoai)
            Ket_qua(Du_lieu)
        }
        var url = `${Dia_chi_server}/dsDienthoai`
        http.open("GET",url)
        http.send();
    })
}

function apidsTivi(){
    return new Promise((Ket_qua, Loi)=>{
        var Du_lieu ={};
        var http =new XMLHttpRequest()
        http.onload=()=>{
            var strJSONdsTivi=http.responseText
            Du_lieu=JSON.parse(strJSONdsTivi)
            Ket_qua(Du_lieu)
        }
        var url = `${Dia_chi_server}/dsTivi`
        http.open("GET",url)
        http.send();
    })
}

function apidsMathang(){
    return new Promise((Ket_qua, Loi)=>{
        var Du_lieu ={};
        var http =new XMLHttpRequest()
        http.onload=()=>{
            var strJSONdsMathang=http.responseText
            Du_lieu=JSON.parse(strJSONdsMathang)
            Ket_qua(Du_lieu)
        }
        var url = `${Dia_chi_server}/dsMathang`
        http.open("GET",url)
        http.send();
    })
}

const apiDathang=(dsDonhang)=>{
    return new Promise((Ket_qua, Loi) => {
        let Du_lieu = {}
        let http = new XMLHttpRequest()
        http.onload = () => {
            var Chuoi_JSON = http.responseText
            Du_lieu = JSON.parse(Chuoi_JSON)
            Ket_qua(Du_lieu)
        }
        let Tham_so = `Dathang`
        let url = `${Dia_chi_server}/${Tham_so}`
        http.open("POST", url)
        http.send(JSON.stringify(dsDonhang))
    })
}

// Xử lý biến Số nguyên
function Nhap_So_nguyen_duong(Th_So_nguyen) {
    var Kq = {}
    Kq.So_nguyen = parseInt(Th_So_nguyen.value.trim())
    Kq.Hop_le = !isNaN(Kq.So_nguyen) && Kq.So_nguyen > 0
    return Kq
}

function Tao_Chuoi_The_hien_So_nguyen_duong(So_nguyen) {
    var Chuoi_The_hien = ""
    var Chuoi_So_nguyen = So_nguyen.toString()
    var So_Ky_so = Chuoi_So_nguyen.length
    if (So_Ky_so % 3 == 0) {
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    } else if (So_Ky_so % 3 == 1) {
        Chuoi_The_hien = Chuoi_So_nguyen[0]
        if (So_Ky_so > 1)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(1)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."

        }
    } else if (So_Ky_so % 3 == 2) {
        Chuoi_The_hien = Chuoi_So_nguyen[0] + Chuoi_So_nguyen[1]
        if (So_Ky_so > 2)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(2)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    }
    return Chuoi_The_hien
}
// Xử lý Biến Số thực
function Nhap_So_thuc_duong(Th_So_thuc) {
    var Kq = {}
    Kq.So_thuc = parseInt(Th_So_thuc.value.trim())
    Kq.Hop_le = !isNaN(Kq.So_thuc) && Kq.So_thuc > 0
    return Kq
}

function Tao_Chuoi_The_hien_So_thuc_duong(So_thuc, So_so_le) {
    So_thuc = parseFloat(So_thuc)
    var Chuoi_The_hien = ""
    if (!So_so_le)
        So_so_le = 2
    var Thanh_phan_con = So_thuc
        .toFixed(So_so_le)
        .split(".")
    Chuoi_The_hien = Tao_Chuoi_The_hien_So_nguyen_duong(Thanh_phan_con[0])
    if (Thanh_phan_con.length == 2 && parseInt(Thanh_phan_con[1]) != 0 && So_so_le > 0)
        Chuoi_The_hien += "," + Tao_Chuoi_The_hien_So_nguyen_duong(Thanh_phan_con[1])
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Tien(So_tien, n) {
    if (!n)
        n = 0

    var Chuoi_The_hien = Tao_Chuoi_The_hien_So_thuc_duong(So_tien, n)

    return Chuoi_The_hien
}

// Xử lý với Biến Ngày
function La_Ngay_Hien_hanh(Ngay) {
    var Ngay_Hien_hanh = new Date()
    Ngay = new Date(Ngay)
    var Kq = Ngay_Hien_hanh.getDate() == Ngay.getDate() &&
        Ngay_Hien_hanh.getMonth() == Ngay.getMonth() &&
        Ngay_Hien_hanh.getFullYear() == Ngay.getFullYear()

    return Kq
}

function Tao_Chuoi_The_hien_Ngay(Ngay) {
    var Chuoi_The_hien = ""
    if (!Ngay)
        Ngay = new Date()
    Chuoi_The_hien = Ngay.getDate() + "/" + (Ngay.getMonth() + 1) + "/" + Ngay.getFullYear()
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Gio(Ngay) {
    var Chuoi_The_hien = ""
    if (!Ngay)
        Ngay = new Date()
    Chuoi_The_hien = Ngay.getHours() + ":" + Ngay.getMinutes() + ":" + Ngay.getMinutes()
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Ngay_Gio(Ngay) {
    var Chuoi_The_hien = Tao_Chuoi_The_hien_Ngay(Ngay) + " " + Tao_Chuoi_The_hien_Gio(Ngay)
    return Chuoi_The_hien
}

function Kiem_tra_Ngay(Chuoi_ngay) {
    var Thanh_phan_con = Chuoi_ngay.split("/")
    var Hop_le = Thanh_phan_con.length == 3 && !isNaN(Thanh_phan_con[0]) && !isNaN(Thanh_phan_con[1]) && !isNaN(Thanh_phan_con[2])
    if (Hop_le) {
        var Ng = parseInt(Thanh_phan_con[0])
        var Th = parseInt(Thanh_phan_con[1])
        var Nm = parseInt(Thanh_phan_con[2])
        var So_ngay_cua_Th = new Date(Nm, Th, 0).getDate()
        // var So_ngay_cua_Th = new Date(Nm, Th+1 , 0).getDate()
        Hop_le = Ng >= 1 && Ng <= So_ngay_cua_Th && Th >= 1 && Th <= 12 && Nm > 0
    }
    return Hop_le
}

function Nhap_Ngay(Th_Ngay) {
    var Kq = {}
    var Chuoi_Ngay = Th_Ngay
        .value
        .trim()
    Kq.Hop_le = Kiem_tra_Ngay(Chuoi_Ngay)
    if (Kq.Hop_le) {
        var Thanh_phan_con = Chuoi_ngay.split("/")
        Kq.Ngay = new Date(Thanh_phan_con[1] + "-" + Thanh_phan_con[0] + "-" + Thanh_phan_con[2])
    }

    return Kq
}