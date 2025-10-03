function counter(){
    let count = 0;
    function increase(){
        count++;
        console.log(count);
    }
        function decrease(){
        count--;
        console.log(count);
    }
    return{increase, decrease};
}
counter();
counter();
let myCounter= counter();
myCounter.increase();
myCounter.increase();
myCounter.increase();
myCounter.decrease();

