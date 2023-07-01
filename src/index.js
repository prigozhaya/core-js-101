function retry(func, attempts) {
  return () => {
    try {
      return func();
    } catch (e) {
      for (let i=attempts;i>0;i--){
        return func();
      }
    }
  }
}

let attempt = 0, retryer = retry(() => {
  if (++attempt % 2) {throw new Error('test');}
  else {return attempt;} 
}, 2);
console.log(retryer());