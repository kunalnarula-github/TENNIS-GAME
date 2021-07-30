var canvas;
        var canvascontext;
        var ballx = 50;
        var bally = 50;
        var ballSpeedX = 10;
        var ballspeedy = 4;

        var player1Score = 0
        var player2Score = 0
        const WINNING_SCORE = 3
        var showingWinScreen = false;

        var paddle1y = 250
        var paddle2y = 250
        const paddle_Height = 100
        const paddle_Thickness = 10

        function calculatemousepos(evt){
            var rect = canvas.getBoundingClientRect();
            var root = document.documentElement;
            var mouseX = evt.clientX - rect.left - root.scrollLeft
            var mouseY = evt.clientY - rect.top - root.scrollTop

            return {
                x:mouseX,
                y:mouseY
            }
        }

        function handleMouseClick(evt) {
            if(showingWinScreen){
                player1Score = 0;
                player2Score = 0;
                showingWinScreen = false;
            }
        }

        window.onload=function() {
        console.log("hello world!");
        canvas = document.getElementById('game canvas');
        canvascontext = canvas.getContext('2d');
              var fps = 30
        setInterval( function() {
            moveEverything();
            drawEverything();
        } , 1000/fps ) ;

        canvas.addEventListener('mousedown', handleMouseClick );

        canvas.addEventListener('mousemove',
        function(evt) {
                         var mousePos= calculatemousepos(evt);
                         paddle1y = mousePos.y-(paddle_Height/2);
        });
        }
        
        function ballReset() {
            if (player1Score >= WINNING_SCORE ||
                player2Score >= WINNING_SCORE) {
                    showingWinScreen = true;
                }
            ballSpeedX=-ballSpeedX;
            ballx=canvas.width/2;
            bally=canvas.height/2;
        }
        
        function computermovement(){
            var paddle2yCenter = paddle2y +(paddle_Height/2)
            if( paddle2yCenter< bally-35){
                paddle2y += 6;
            }
            else if(paddle2yCenter>bally+35) {
                paddle2y -= 6;
            }
        }

        function moveEverything(){
            if (showingWinScreen){
                return;
            }
            computermovement();
            ballx=ballx+ballSpeedX
            if(ballx>canvas.width) {
                if(bally > paddle2y && 
                    bally < paddle2y+ paddle_Height) {
                        ballSpeedX=-ballSpeedX
                        var deltaY = bally - (paddle2y - paddle_Height/2);
                        ballspeedy= deltaY * 0.15
                    } else {
                        player1Score++
                        ballReset();
                 }
            
            }
            if(ballx<0) {
                if(bally > paddle1y && 
                    bally < paddle1y+ paddle_Height) {
                        ballSpeedX=-ballSpeedX
                        var deltaY = bally - (paddle1y - paddle_Height/2);
                        ballspeedy= deltaY * 0.15
                    } else {
                        player2Score++
                        ballReset();
                 }
            }
            bally=bally+ballspeedy
            if(bally>canvas.height) {
                ballspeedy=-ballspeedy;
            }
            if(bally<0) {
                ballspeedy=-ballspeedy;
            }
        }
        
        function drawNet() {
            for( var i=0;i<canvas.height;i+=40) {
                canvascontext.fillStyle=('white')
                canvascontext.fillRect(canvas.width/2-1,i,2,20)
            }
        }

        function drawEverything() {    
        canvascontext.fillStyle = '#00BBF9';
        canvascontext.fillRect(0,0,canvas.width,canvas.height);
        if (showingWinScreen){
            canvascontext.fillStyle=('white')
            if (player1Score >= WINNING_SCORE){
                canvascontext.fillText("Left Player Won!",350,200);                
            }
               else if (player2Score >= WINNING_SCORE){
                canvascontext.fillText("Right Player Won!",350,200); 
               }
            canvascontext.fillStyle=('white')
            canvascontext.fillText("click to continue",350,500);
                return;
            }
            drawNet();
            
        canvascontext.fillStyle=('white')
        canvascontext.fillRect(0,paddle1y,paddle_Thickness,paddle_Height)
        canvascontext.fillStyle=('white')
        canvascontext.fillRect(canvas.width-paddle_Thickness,paddle2y,paddle_Thickness,paddle_Height)

        canvascontext.fillStyle=('white')
        canvascontext.fillText(player1Score,100,100)
        canvascontext.fillText(player2Score,canvas.width-100,100)
        
        canvascontext.fillStyle = ''
        canvascontext.beginPath();
        canvascontext.arc(ballx,bally,10, 0,Math.PI*2,true);
        canvascontext.fill();
        }