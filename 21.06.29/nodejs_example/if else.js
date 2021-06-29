var num = 1;
var num2 = -1;
var confirm;

if(num > 0){
    confirm = "양수";
};
console.log(confirm);

if(num2 > 0){
    confirm = "양수";
}else{
    confirm = "음수";
};
console.log(confirm);

if(num2 > 0){
    confirm = "양수";
}else if(num < 0){
    confirm = "음수";
}else{
    confimr = "영";
};
console.log(confirm);