exports.formatDates = list => {
  return list.map(({ ...changeDates }) => {
    changeDates.created_at = new Date(changeDates.created_at);
    return changeDates;
  });
};

exports.makeRefObj = list => {
  let obj = {};
  for (let position in list) {
    obj[list[position].title] = list[position].article_id;
  }
  return obj;
};

exports.formatComments = (comments, articleRef) => {
  return [];
};
