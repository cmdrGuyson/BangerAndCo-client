//Utility function to determine is age is greater than 18
exports.isOver18 = (birthday_string) => {
  let birthday = new Date(birthday_string);
  let ageDifMs = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
};

//Utility function to determine is age is greater than 25
exports.isOver25 = (birthday_string) => {
  let birthday = new Date(birthday_string);
  let ageDifMs = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970) >= 25;
};
