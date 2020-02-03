exports.formatDates = list => {
  console.log(list);
  return list.map(({ ...changeDates }) => {
    changeDates.created_at = new Date(changeDates.created_at);
    console.log(changeDates, "***");
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
  formattedComments = [];
  comments.forEach(item => {
    const newItem = { ...item };
    newItem.author = newItem.created_by;
    delete newItem.created_by;
    newItem.article_id = articleRef[newItem.belongs_to];
    delete newItem.belongs_to;
    newItem.created_at = new Date(newItem.created_at);
    formattedComments.push(newItem);
  });
  return formattedComments;
};

// alternative formatComments function:

// exports.formatComments = (comments, articleRef) => {
//   formattedComments = [];
//   comments.forEach(item => {
//     const newItem = { ...item };
//     const newObject = {
//       body: newItem.body,
//       author: newItem.created_by,
//       article_id: articleRef[newItem.belongs_to],
//       created_at: new Date(newItem.created_at),
//       votes: newItem.votes
//     };
//     formattedComments.push(newObject);
//   });
//   return formattedComments;
// };
