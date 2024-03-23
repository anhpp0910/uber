(function ($) {
  // USE STRICT
  "use strict";

  $(document).ready(function () {
    var selector_map = $("#google_map");
    var img_pin = selector_map.attr("data-pin");
    var data_map_x = selector_map.attr("data-map-x");
    var data_map_y = selector_map.attr("data-map-y");
    var scrollwhell = selector_map.attr("data-scrollwhell");
    var draggable = selector_map.attr("data-draggable");

    if (img_pin == null) {
      img_pin = "images/icons/location.png";
    }
    if (data_map_x == null || data_map_y == null) {
      data_map_x = 40.007749;
      data_map_y = -93.266572;
    }
    if (scrollwhell == null) {
      scrollwhell = 0;
    }

    if (draggable == null) {
      draggable = 0;
    }

    var style = [
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [
          {
            saturation: 36,
          },
          {
            color: "#000000",
          },
          {
            lightness: 40,
          },
        ],
      },
      {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [
          {
            visibility: "on",
          },
          {
            color: "#000000",
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 17,
          },
          {
            weight: 1.2,
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 21,
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 17,
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 29,
          },
          {
            weight: 0.2,
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 18,
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 19,
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 17,
          },
        ],
      },
    ];

    var latitude = data_map_x,
      longitude = data_map_y,
      map_zoom = 14;

    var locations = [["Welcome", latitude, longitude, 2]];

    if (selector_map !== undefined) {
      var map = new google.maps.Map(document.getElementById("google_map"), {
        zoom: 13,
        scrollwheel: false,
        zoomControl: false,
        disableDoubleClickZoom: true,
        navigationControl: true,
        mapTypeControl: false,
        scaleControl: false,
        draggable: draggable,
        styles: style,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
    }

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon: img_pin,
      });

      google.maps.event.addListener(
        marker,
        "click",
        (function (marker, i) {
          return function () {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          };
        })(marker, i)
      );
    }
  });
})(jQuery);

function tinhGiaKmDauTien(loaiXe) {
  var giaTien;
  if (loaiXe == "uberCar") {
    giaTien = 8000;
  } else if (loaiXe == "uberSUV") {
    giaTien = 9000;
  } else {
    giaTien = 10000;
  }
  return giaTien;
}

function tinhGiaKm1Den19(loaiXe) {
  if (loaiXe == "uberCar") {
    return 7500;
  } else if (loaiXe == "uberSUV") {
    return 8500;
  } else {
    return 9500;
  }
}

function tinhGiaKm19TroDi(loaiXe) {
  switch (loaiXe) {
    case "uberCar":
      return 7000;
    case "uberSUV":
      return 8000;
    default:
      return 9000;
  }
}

function tinhTienCho(loaiXe) {
  switch (loaiXe) {
    case "uberCar":
      return 2000;
    case "uberSUV":
      return 3000;
    default:
      return 3500;
  }
}

function tinhTienUber() {
  var loaiXe = document.querySelector('input[name="selector"]:checked').value;
  var soKm = Number(document.getElementById("txt-km").value);
  var thoiGianCho = Number(document.getElementById("txt-wait").value);
  console.log({ loaiXe, soKm });
  // Tính giá tiền theo từng loại xe
  var giaKmDauTien = tinhGiaKmDauTien(loaiXe);
  var giaKm1Den19 = tinhGiaKm1Den19(loaiXe);
  var giaKm19TroDi = tinhGiaKm19TroDi(loaiXe);
  var giaCho = tinhTienCho(loaiXe);
  console.log("giaKmDauTien: ", giaKmDauTien);
  // Tính giá tiền dựa vào số km
  var tienChay = 0;
  if (soKm <= 1) {
    tienChay = soKm * giaKmDauTien;
  } else if (soKm > 1 && soKm <= 19) {
    tienChay = giaKmDauTien + (soKm - 1) * giaKm1Den19;
  } else {
    tienChay = giaKmDauTien + 18 * giaKm1Den19 + (soKm - 19) * giaKm19TroDi;
  }
  console.log("tienChay: ", tienChay);
  // Tính tiền chờ
  var tienCho = 0;
  if (thoiGianCho >= 3) {
    tienCho = (thoiGianCho / 3) * giaCho;
  }
  console.log("tienCho: ", tienCho);
  var tongTien = tienChay + tienCho;
  console.log("Tổng tiền: " + tongTien);

  // Hiển thị kết quả lên layout
  document.getElementById("divThanhTien").style.display = "block";
  document.getElementById("xuatTien").innerHTML =
    tongTien.toLocaleString() + "VND";
}
