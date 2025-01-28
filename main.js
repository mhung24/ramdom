(() => {
  const $ = document.querySelector.bind(document);

  let timeRotate = 7000; //7 giây
  let currentRotate = 0;
  let isRotating = false;
  const wheel = $(".wheel");
  const btnWheel = $(".btn--wheel");
  const showMsg = $(".msg");

  //=====< Danh sách phần thưởng >=====

  // Chọn checkbox tự động

  const listGift = [
    {
      text: "20K",
      percent: 50 / 100,
    },
    {
      text: "50K",
      percent: 40 / 100,
    },
    {
      text: "100K",
      percent: 50 / 100,
    },
    {
      text: "200K",
      percent: 50 / 100,
    },
    {
      text: "500K",
      percent: 50 / 100,
    },
    {
      text: "20K",
      percent: 40 / 100,
    },
    {
      text: "50K",
      percent: 40 / 100,
    },
    {
      text: "10K",
      percent: 30 / 100,
    },
    {
      text: "20K",
      percent: 50 / 100,
    },
    {
      text: "50K",
      percent: 40 / 100,
    },
  ];

  //=====< Số lượng phần thưởng >=====
  const size = listGift.length;

  //=====< Số đo góc của 1 phần thưởng chiếm trên hình tròn >=====
  const rotate = 360 / size;

  //=====< Số đo góc cần để tạo độ nghiêng, 90 độ trừ đi góc của 1 phần thưởng chiếm >=====
  const skewY = 90 - rotate;

  listGift.map((item, index) => {
    //=====< Tạo thẻ li >=====
    const elm = document.createElement("li");

    //=====< Xoay và tạo độ nghiêng cho các thẻ li >=====
    elm.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;

    //=====< Thêm background-color so le nhau và căn giữa cho các thẻ text>=====
    if (index % 2 == 0) {
      elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
        rotate / 2
      }deg);" class="text text-1">
                <b>${item.text}</b>
            </p>`;
    } else {
      elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
        rotate / 2
      }deg);" class="text text-2">
            <b>${item.text}</b>
            </p>`;
    }

    //=====< Thêm vào thẻ ul >=====
    wheel.appendChild(elm);
  });

  /********** Hàm bắt đầu **********/
  const start = () => {
    showMsg.innerHTML = "";
    isRotating = true;
    //=====< Lấy 1 số ngầu nhiên 0 -> 1 >=====
    const random = Math.random();

    //=====< Gọi hàm lấy phần thưởng >=====
    const gift = getGift(random);

    //=====< Số vòng quay: 360 độ = 1 vòng (Góc quay hiện tại) >=====
    currentRotate += 360 * 10;

    //=====< Gọi hàm quay >=====
    rotateWheel(currentRotate, gift.index);

    //=====< Gọi hàm in ra màn hình >=====
    showGift(gift);
  };

  /********** Hàm quay vòng quay **********/
  const rotateWheel = (currentRotate, index) => {
    $(".wheel").style.transform = `rotate(${
      //=====< Góc quay hiện tại trừ góc của phần thưởng>=====
      //=====< Trừ tiếp cho một nửa góc của 1 phần thưởng để đưa mũi tên về chính giữa >=====
      currentRotate - index * rotate - rotate / 2
    }deg)`;
  };

  const rdlx1 = document.getElementById("wrap_msg");

  /********** Hàm lấy phần thưởng **********/
  const getGift = (randomNumber) => {
    let currentPercent = 0;
    let list = [];

    listGift.forEach((item, index) => {
      //=====< Cộng lần lượt phần trăm trúng của các phần thưởng >=====
      currentPercent += item.percent;

      //=====< Số ngẫu nhiên nhỏ hơn hoặc bằng phần trăm hiện tại thì thêm phần thưởng vào danh sách >=====
      if (randomNumber <= currentPercent) {
        list.push({ ...item, index });
      }
    });

    // if (
    //   username.value.toUpperCase() === "HUNG" ||
    //   username.value.toUpperCase() === "HÙNG"
    // ) {
    //   const listArray = [
    //     {
    //       text: "100K",
    //       percent: 50 / 100,
    //       index: 2,
    //     },
    //     {
    //       text: "50K",
    //       percent: 40 / 100,
    //       index: 1,
    //     },
    //     {
    //       text: "100K",
    //       percent: 50 / 100,
    //       index: 2,
    //     },
    //     {
    //       text: "200K",
    //       percent: 50 / 100,
    //       index: 3,
    //     },
    //     {
    //       text: "500K",
    //       percent: 50 / 100,
    //       index: 4,
    //     },
    //     {
    //       text: "20K",
    //       percent: 40 / 100,
    //       index: 5,
    //     },
    //     {
    //       text: "50K",
    //       percent: 40 / 100,
    //       index: 6,
    //     },
    //     {
    //       text: "10K",
    //       percent: 30 / 100,
    //       index: 7,
    //     },
    //     {
    //       text: "20K",
    //       percent: 50 / 100,
    //       index: 8,
    //     },
    //     {
    //       text: "50K",
    //       percent: 40 / 100,
    //       index: 9,
    //     },
    //   ];

    //   getData(listArray[0]);
    //   return listArray[0];
    // } else {
    //   getData(list[0]);
    //   return list[0];
    // }

    getData(list[0]);
    return list[0];
  };

  /********** In phần thưởng ra màn hình **********/
  const showGift = (gift) => {
    let timer = setTimeout(() => {
      isRotating = false;

      showMsg.innerHTML = `Chúc mừng bạn đã nhận được "${gift.text}"`;
      rdlx1.style.display = "flex";
      clearTimeout(timer);
    }, timeRotate);
  };

  let ip;
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      ip = data.ip;
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra:", error);
    });

  let list = [
    {
      username: "",
      ip: "",
      money: "",
    },
  ];

  const getData = (item) => {
    list = [
      {
        ip: ip,
        money: item.text,
      },
    ];

    // const data = localStorage.getItem("data");
    // const value = JSON.parse(data);

    // if (data === null) {
    //   localStorage.setItem("data", JSON.stringify(list));
    // } else {
    //   err_gift.innerHTML = `Cái gì vậy má trúng ${value[0].money} rồi mà vẫn còn tham à`;
    //   msg_err.style.display = "none";
    // }
  };
  /********** Sự kiện click button start **********/
  btnWheel.addEventListener("click", () => {
    !isRotating && start();
  });
})();

// document.addEventListener("keydown", function (event) {
//   // Ngăn chặn nhấn F12
//   if (event.key === "F12") {
//     event.preventDefault();
//   }
// });

// // Ngăn chặn mở DevTools bằng chuột
// document.addEventListener("contextmenu", function (event) {
//   event.preventDefault(); // Ngăn mở menu chuột phải
// });

const rdlx1 = document.getElementById("wrap_msg");

function showPopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("show"); // Thêm lớp để kích hoạt hiệu ứng
}

function closePopup() {
  const popup = document.getElementById("popup");
  location.reload();
  // popup.classList.remove("show");
  rdlx1.style.display = "none";
}

// Hiển thị ô chúc mừng khi trang được tải
window.onload = showPopup;
