const axios = require("axios");
const moment = require("moment");

const { Hospital } = require("../models");

exports.getHospitalList = async (req, res) => {
  console.log("동물병원 진입");
  const hospitals = await Hospital.findAll();
  res.json(hospitals);
};

exports.getWeather = async (req, res) => {
  // 주소 없는 경우 예외 처리 추가해야함

  // 순서 확인할것.
  // 1. 캐시 데이터 확인
  // 2. 캐시 데이터 없으면 날씨API에서 값 얻어옴
  // 3. 날씨API에서 요구하는 값은 로그인한 유저의 주소값을 KAKAO API에 넣은 뒤 getGrid로 변환해서 얻은 값
  console.log("날씨 컨트롤러 진입");
  const id = req.user.id;

  // 캐시된 데이터가 있는지 확인
  const cachedData = req.cookies[`weatherData${id}`];
  if (cachedData) {
    // 캐시된 데이터가 있으면 캐시된 데이터를 반환
    console.log("캐시된 데이터 반환");
    return res.json(JSON.parse(cachedData));
  } else {
    console.log("캐시 데이터 없음 API 요청합니다");

    // 캐시된 데이터가 없으면 API 요청보내 데이터를 구함
    // 주소 -> 좌표 변환
    await axios
      .get("https://dapi.kakao.com/v2/local/search/address.json", {
        params: {
          // query: "대구광역시 서구 내당동 245-4",
          query: req.user.address2,
        },
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_MAPS_API_KEY}`,
        },
      })
      .then(async (response) => {
        // 주소로 좌표를 구해서 nx와 ny에 나누어 저장
        const rs = getGrid(response.data.documents[0].y, response.data.documents[0].x);
        const nx = rs.x;
        const ny = rs.y;

        // base_date, base_time 결정
        const { base_date, base_time } = getBaseTime();
        // const base_date = getBaseTime()

        console.log("진입테스트");
        // 날씨 API 쿼리문에 사용할 변수 선언
        const apiAddress = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
        const serviceKey = process.env.WEATHER_API_KEY;
        const pageNo = "1";
        const numOfRows = "1000";
        const dataType = "JSON";
        const query =
          apiAddress +
          "?" +
          "serviceKey=" +
          serviceKey +
          "&" +
          "pageNo=" +
          pageNo +
          "&" +
          "numOfRows=" +
          numOfRows +
          "&" +
          "dataType=" +
          dataType +
          "&" +
          "base_date=" +
          base_date +
          "&" +
          "base_time=" +
          base_time +
          "&" +
          "nx=" +
          nx +
          "&" +
          "ny=" +
          ny;

        // 가장 가까운 다음 시간을 구해서(example : 1시 23분 -> 2시 00분)
        // 날씨 API 요청에 활용
        const nextHour = moment().add(1, "hour");
        const date = nextHour.format("YYYYMMDD");
        const hour = nextHour.format("HH") + "00";
        await axios
          .get(query)
          .then((response) => {
            // POP=강수확률, TMP=1시간 기온, fcstValue 수치값
            let temp, pop;
            response.data.response.body.items.item.forEach((data) => {
              if (data.fcstDate == date && data.fcstTime == hour) {
                if (data.category == "TMP") {
                  console.log(`현재온도 : ${data.fcstValue}`);
                  temp = data.fcstValue;
                } else if (data.category == "POP") {
                  console.log(`강수확률 : ${data.fcstValue}`);
                  pop = data.fcstValue;
                }
              }
            });

            const weatherData = {
              temp,
              pop,
            };

            // 쿠키 설정
            res.cookie(`weatherData${id}`, JSON.stringify(weatherData), {
              maxAge: 10 * 60 * 1000, // 캐시 유효 시간 10분
            });
            return res.json(weatherData);
          })
          .catch((error) => {
            console.log("날씨API 에러발생");
            console.error(error);
            return res.status(500).send("날씨 데이터를 가져올 수 없습니다.");
          });
      })
      .catch((error) => {
        console.log("주소API 에러발생");
        console.error(error);
        return res.status(500).send("입력받은 주소를 좌표로 변환할 수 없습니다");
      });
  }
};

// 위도 경도를 좌표로 변환
function getGrid(v1, v2) {
  const RE = 6371.00877; // 지구 반경(km)
  const GRID = 5.0; // 격자 간격(km)
  const SLAT1 = 30.0; // 투영 위도1(degree)
  const SLAT2 = 60.0; // 투영 위도2(degree)
  const OLON = 126.0; // 기준점 경도(degree)
  const OLAT = 38.0; // 기준점 위도(degree)
  const XO = 43; // 기준점 X좌표(GRID)
  const YO = 136; // 기준점 Y좌표(GRID)

  const DEGRAD = Math.PI / 180.0;
  const RADDEG = 180.0 / Math.PI;

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);
  const rs = {};

  let ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);

  let theta = v2 * DEGRAD - olon;
  if (theta > Math.PI) {
    theta -= 2.0 * Math.PI;
  }
  if (theta < -Math.PI) {
    theta += 2.0 * Math.PI;
  }
  theta *= sn;
  rs["x"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  rs["y"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

  return rs;
}

// 가장 최근의 예보시각을 반환
function getBaseTime() {
  // ❍ 단기예보
  // - Base_time : 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 (1일 8회)
  // - API 제공 시간(~이후) : 02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10

  // base_date, base_time 결정
  // 현재 시각을 기준으로 가장 최근(과거)의 예보를 찾는다
  const now = moment();
  const baseTimeArray = ["02", "05", "08", "11", "14", "17", "20", "23"]; // 예보 발표 시각
  const diff = [];

  // diff 배열에 현재 시각과 발표 시각의 차이를 저장(음수면 24를 더해서 저장)
  for (let i = 0; i < baseTimeArray.length; i++) {
    diff[i] = parseInt(now.format("HH")) - parseInt(baseTimeArray[i]);
    if (diff[i] < 1) {
      diff[i] += 24;
    }
  }

  let baseData;
  diff.forEach((element, index) => {
    if (element > 0 && element < 4) {
      const base = now.subtract(diff[index], "hour");
      baseData = {
        base_date: base.format("YYYYMMDD"),
        base_time: base.format("HH") + "00",
      };
    }
  });

  return baseData;
}
