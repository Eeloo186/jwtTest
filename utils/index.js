exports.reformatDate = (row, type) => {
  // createdAt column의 값을 변경합니다
  const datetime = row.createdAt;

  // 년, 월, 일, 시, 분을 원하는 형태로 조합
  const year = datetime.getFullYear();
  const month = ("0" + (datetime.getMonth() + 1)).slice(-2);
  const day = ("0" + datetime.getDate()).slice(-2);
  const hour = ("0" + datetime.getHours()).slice(-2);
  const minute = ("0" + datetime.getMinutes()).slice(-2);
  if (type == "full") {
    row.dataValues.createdAt = `${year}-${month}-${day} ${hour}:${minute}`;
  } else if (type == "time") {
    row.dataValues.createdAt = `${hour}:${minute}`;
  } else if (type == "date") {
    row.dataValues.createdAt = `${month}-${day}`;
  }
};
