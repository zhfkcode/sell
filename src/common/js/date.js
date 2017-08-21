export function formaDate(date,fmt){
if(/(y+)/.test(fmt)){
  fmt=fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.length))
}
let o={
  'M+':date.getMonth()+1,
  'd+':date.getDay(),
  'h+':date.getHours(),
  'm+':date.getMinutes(),
  's+':date.getSeconds()
}
for(let k in o){
  if(new RegExp(`(${k})`).test(fmt)){
let str=o[k]+'';
fmt=fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str))
  }
}
return fmt;
function padLeftZero(str){
  return ("00"+str).substr(str.length);
}
}



























//
// function formadate(fmt){
//   var o={
//     'M+':this.getMonth()+1,
//     'd+':this.getDay(),
//     'm+':this.getMinutes(),
//     'h+':this.getHours(),
//     's+':this.getSeconds()
//   }
//   for(let k in o){
//     if(new RegExp(`${k}`).test(fmt)){
//       let str=o[k]+'';
//       fmt=fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:("00"+str.substr(str.length)))
//     }
//   }
//   if(/y+/.text(fmt)){
//     fmt=fmt.replace(RegExp.$1,(this.getFullYear()+'').substr(4-RegExp.$1.length))
//   }
// }
