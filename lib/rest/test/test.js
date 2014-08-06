function Test(){
    
}

Test.prototype.method1 = function(hello){
    console.log(hello);
}

var test = new Test();

test['method1']('hello');