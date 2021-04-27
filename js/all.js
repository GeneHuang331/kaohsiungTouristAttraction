let data = []; //ajax 資料
let districtList = []; //高雄地區物件陣列
let sortedData = [] //篩選過的 ajax 資料
let xhr = new XMLHttpRequest();
xhr.open('get', 'https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c', true);
//true 是非同步
xhr.send('null');
xhr.onload = function () {
    if (xhr.status == 200) {
        // 獲取ajax資料
        getData();
        //初始化
        init();

    } else {
        alert('資料取得錯誤！！');
    }
}


function getData() {
    data = JSON.parse(xhr.responseText).data.XML_Head.Infos.Info;
}
function init() {
    getDistrictList();
    renderDistrictSelect();
    renderDistrictList(data);
}
function renderDistrictSelect() {
    let str = '';
    for (let i = 0; i < districtList.length; i++) {
        str += `
        <option value="${districtList[i].code}">${districtList[i].name}</option>
        `;
    }
    document.querySelectorAll('.selectWrap select')[0].innerHTML += str;
}
function renderDistrictList(sortedData) {
    let str = ``;
    for (let i = 0; i < sortedData.length; i++) {
        let placeName = sortedData[i].Name; //地名
        let districtName = getName(sortedData[i].Zipcode); //區
        let openTime = sortedData[i].Opentime; //營業時間
        let add = sortedData[i].Add; // 地名
        let tel = sortedData[i].Tel; // 電話
        let pic = sortedData[i].Picture1; // 圖片
        str += `
        <li class="col-6">
        <div class="districtItem">
            <div class="itemBanner" style='background:url(${pic}) center center no-repeat;'>
                <h4>
                    ${placeName}
                </h4>
                <div>${districtName}</div>
            </div>
            <div class="itemInfo">
                <div class="openTime">
                <img src="../img/icons_clock.png" alt=""/>
                    ${openTime}
                </div>
                <div class="address">
                <img src="../img/icons_pin.png" alt=""/>
                    ${add}
                </div>
                <div class="tel">
                <img src="../img/icons_phone.png" alt=""/>
                    ${tel}
                </div>
            </div>
        </div>
    </li>
        `;
    }
    document.querySelector('.districtList').innerHTML = str;
}
function getDistrictList() {
    for (let i = 0; i < data.length; i++) {
        let zipcode = data[i].Zipcode;
        if (districtList.filter((item) => item.code == zipcode).length <= 0) {
            let name = getName(zipcode);
            districtList.push(
                {
                    name: name,
                    code: data[i].Zipcode
                }
            );
        }
    }
}
//取得郵遞區號的地名
function getName(zipcode) {
    let name;
    switch (zipcode) {
        case '800':
            name = '新興區';
            break;
        case '801':
            name = '前金區';
            break;
        case '802':
            name = '苓雅區';
            break;
        case '803':
            name = '鹽埕區';
            break;
        case '804':
            name = '鹽埕區';
            break;
        case '805':
            name = '旗津區';
            break;
        case '806':
            name = '前鎮區';
            break;
        case '807':
            name = '三民區';
            break;
        case '811':
            name = '楠梓區';
            break;
        case '812':
            name = '小港區';
            break;
        case '813':
            name = '左營區';
            break;
        case '814':
            name = '仁武區';
            break;
        case '815':
            name = '大社區';
            break;
        case '817':
            name = '東沙群島';
            break;
        case '819':
            name = '南沙群島';
            break;
        case '820':
            name = '岡山區';
            break;
        case '821':
            name = '路竹區';
            break;
        case '822':
            name = '阿蓮區';
            break;
        case '823':
            name = '田寮區';
            break;
        case '824':
            name = '燕巢區';
            break;
        case '825':
            name = '橋頭區';
            break;
        case '826':
            name = '梓官區';
            break;
        case '827':
            name = '彌陀區';
            break;
        case '828':
            name = '永安區';
            break;
        case '829':
            name = '湖內區';
            break;
        case '830':
            name = '鳳山區';
            break;
        case '831':
            name = '大寮區';
            break;
        case '832':
            name = '林園區';
            break;
        case '833':
            name = '鳥松區';
            break;
        case '840':
            name = '大樹區';
            break;
        case '842':
            name = '旗山區';
            break;
        case '843':
            name = '美濃區';
            break;
        case '844':
            name = '六龜區';
            break;
        case '845':
            name = '內門區';
            break;
        case '846':
            name = '杉林區';
            break;
        case '847':
            name = '甲仙區';
            break;
        case '848':
            name = '桃源區';
            break;
        case '849':
            name = '那瑪夏區';
            break;
        case '851':
            name = '茂林區';
            break;
        case '852':
            name = '茄萣區';
            break;
        default:
            name = 'a';
            break;
    }
    return name;
}

document.querySelectorAll('.selectWrap select')[0].addEventListener('change', updateDistrictList, false);

//更新列表
function updateDistrictList() {
    let code = this.value;
    sortedData = data.filter((item) => {
        return item.Zipcode == code;
    });
    renderDistrictList(sortedData);
}