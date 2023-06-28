1. npm i 입력해서 모듈들 설치
2. config.json 파일에 본인정보 입력
3. .env 파일 확인
3. npx sequelize db:create 입력해서 mysql에 database 생성
4. app.js에 sequelize.sync({ force: true }) 로 변경 후 npm start 입력해서 테이블 생성
5. 테이블 생성 됐으면 서버 실행 종료하고 npx sequelize db:seed:all로 더미데이터 db에 등록
6. app.js에 sequelize.sync({ force: fasle }) 로 변경해서 테이블 재생성 막기