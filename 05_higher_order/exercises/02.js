const loop = (n, test, updateFn, fn) => {
    for(let i = n; i > 0; i--){
        if(!test(i)) break
        
        fn(i)
        updateFn(i)
    }
}

loop(3, n => n > 0, n => n - 1, console.log)