var name = 'zero';
function outer() {
    var name = 'new'
  console.log('외부', name);
  function inner() {
    var name = 'nero';
    console.log('내부', name);
  }
  inner();
}
outer();

//  console.log(enemy); ---> undefined

var name2 = 'zero';
function log() {
  console.log(name2);
}

function wrapper() {
  name2 = 'nero';
  log();
}
wrapper();

var name3 = 'zero';
function log2() {
  console.log(name3);
}

function wrapper2() {
  var name3 = 'nero';
  log2();
}
wrapper2();
