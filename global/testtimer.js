function print(msg){
  console.log(msg);
}
print('1. start');
setTimeout(print, 1000, '6. setTimeout');
setInterval(print, 800, '5. setInterval');
setImmediate(print, '4. setImmediate');

// nextTick은 Event Loop에서 돌면서 
// setTimeout, setInterval, setImmediate, I/O Callback 
// 등등 모든것을 확인하면서 항시 계속 확인해줌
process.nextTick(print, '3. nextTick');
print('2. finish');