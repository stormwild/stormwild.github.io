(function(){
    window.addEventListener('load', function(){
        console.log(window.innerWidth, window.innerHeight);
        
        var width = 100, 
            height = 800;
        
        window.resizeTo(width, height);
        
        console.log(window.innerWidth, window.innerHeight);
    });
    
})();