let tb = document.getElementById("tb");
let debText = document.getElementById("debText");
let throText = document.getElementById("throText");

function deb(fn, delay = 300){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn(...args)
        }, delay);
    }
}

function throt(fn, wait=1000){
    let shouldWait = false;
    let waitingArgs = null;

    let timeoutFunc = (fn) => {
        setTimeout(()=>{
            if(waitingArgs === null){
                shouldWait = false;
            }else{
                fn(...waitingArgs);
                waitingArgs = null;
                timeoutFunc(fn)
            }
        },wait)
    }
    
    return (...args) => {
        if(shouldWait) {
            waitingArgs = args;
            return;
        };
        fn(...args);
        shouldWait = true;
        timeoutFunc(fn);
    }
}

const debounce = deb((text)=>{debText.innerText = text});
const throttle = throt((text)=>{throText.innerText = text});

tb.addEventListener("input", (e)=>{
    let text = e.target.value;
    throttle(text);
    debounce(text);
}
);