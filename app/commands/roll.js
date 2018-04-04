function roll(args, callback) {
  if (isNaN(args[0])) {
    callback(Math.floor(Math.random() * 101));
  }
  if (isNaN(args[1])) {
    callback(Math.floor(Math.random() * parseInt(args[0])));
  }
  else if (parseInt(args[1]) == 0) {
    callback("0");
  }

  callback(parseInt(args[0]) + Math.floor(Math.random() * (parseInt(args[1]) - parseInt(args[0]) + 1)));
};

export { roll };