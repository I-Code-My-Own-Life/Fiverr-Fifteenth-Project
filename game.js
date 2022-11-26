// const Application = new PIXI.Application;
const app = new PIXI.Application({
    resize:window,
    width:innerWidth,
    height:innerHeight,
    transparent:false,
    antialias: true,
    resolution: window.devicePixelRatio,
    willReadFrequently:true
});
let moveButton = false;
// app.renderer.backgroundColor = 0x23395D;
app.renderer.resize(innerWidth,innerHeight )
document.body.appendChild(app.view);

// Writing a text : 
let style = new PIXI.TextStyle({
    fill: "#2FF397",
    fontSize: 5,
    fontWeight: "bold",
    align:"center",
    dropShadow:true,
    dropShadowBlur:0,
    stroke:"#2F40F3",
    strokeThickness:2,
})
let style2 = new PIXI.TextStyle({
    fill: "#2FF397",
    fontSize: 20,
    fontWeight: "bold",
    align:"center",
    dropShadow:true,
    dropShadowBlur:0,
    stroke:"#2F40F3",
    strokeThickness:2,
})
let style3 = new PIXI.TextStyle({
    fill: "#FF3611",
    fontSize: 30,
    fontWeight: "bold",
    align:"center",
    dropShadow:true,
    dropShadowBlur:0,
    stroke:"#2F40F3",
    strokeThickness:2,
})
const text = new PIXI.Text("Rock Paper Scissors !", style);
text.x  = ((innerWidth / 2) - text.width * 2 );
text.y  = 50;
app.stage.addChild(text);

// Let's draw the button : 
let buttonX = 530;
let buttonY = 300;
let buttonWidth = 150;
let buttonHeight  = 60;
let buttonRadius = 30;
let button = new PIXI.Graphics();
button.beginFill(0x3e494b);
button.lineStyle(4, 0x0, .3);
button.drawRoundedRect(
    buttonX,
    buttonY,
    buttonWidth,
    buttonHeight,
    buttonRadius
);
button.endFill();

let previousChosenPlayer = [];
let previousChosenComputer = [];
let playerChosen = [];
let options = ["rock","paper","scissors"];
let computerChosen = [];
let computerSprites = [];
// The text in the button : 
const text2 = new PIXI.Text("Let's play !", style2)
text2.x  = buttonX + (buttonWidth / 6);
text2.y  = buttonY + (buttonHeight / 4);
app.stage.addChild(button);
app.stage.addChild(text2);
// Let's make our three sprites here : 
                        // Rock : 
let rock = PIXI.Sprite.from('./Assets/rock.png');
app.stage.addChild(rock);
rock.width = 80;
rock.height = 150;
rock.position.set(200,innerHeight - rock.height * 2);
                        // Paper : 
let paper = PIXI.Sprite.from('./Assets/paper.png');
app.stage.addChild(paper);
paper.width = 80;
paper.height = 150;
paper.position.set(innerWidth / 2 - paper.width,innerHeight -paper.height * 2);
                        // Scissors : 
let scissors = PIXI.Sprite.from('./Assets/scissors.png');
app.stage.addChild(scissors);
scissors.width = 80;
scissors.height = 150;
scissors.position.set(innerWidth - 400,innerHeight - scissors.height * 2);
let gravity = 0.1;
let r = 0.1;
let score = 0;
let scoreCom = 0;
// Our score : 
let scoreElem = new PIXI.Text(`Your Score : ${score}`, style2);
scoreElem.x = 100;
scoreElem.y = innerHeight / 2 - 150;
app.stage.addChild(scoreElem);
// Computer's score : 
let scoreComputer = new PIXI.Text(`AI Score : ${scoreCom}`, style2);
scoreComputer.x = innerWidth / 2 + 150;
scoreComputer.y = innerHeight / 2 - 150;
app.stage.addChild(scoreComputer);
// Let's draw our restart button : 
// Let's draw the button : 
let bX = 530;
let bY = 300;
let bWidth = 150;
let bHeight  = 60;
let bRadius = 30;
let restartButton = new PIXI.Graphics();
restartButton.beginFill(0x3e494b);
restartButton.lineStyle(4, 0x0, .3);
restartButton.drawRoundedRect(
    bX,
    bY,
    bWidth,
    bHeight,
    bRadius
);
restartButton.endFill();
// The text in the button : 
const text3 = new PIXI.Text("Restart", style2)
text3.x  = buttonX + (bWidth / 4);
text3.y  = buttonY + (bHeight / 4);
// Our animation loop : 
app.ticker.add((delta) => {
    scoreElem.text = `Your Score : ${score}`;
    scoreComputer.text = `Computer's Score : ${scoreCom}`;
    if(text.style != null){
        if(text.style.fontSize < 50){
            text.y  = 50;       
            text.x -= 7.5;
            text.style.fontSize += 1.5;
        }
    }
    if(moveButton){
        button.y += gravity;
        text2.y += gravity;
        gravity += 0.5;
    }
    // When the button gets below the canvas remove it from the screen : 
    if(button.y > innerHeight){
        app.stage.removeChild(button);
        const text2 = new PIXI.Text("Choose one !", style2)
        text2.x  = innerWidth / 2;
        text2.y  = innerHeight / 2;
        app.stage.removeChild(text2);
    }
    for(let everyObj of playerChosen){
        app.stage.addChild(everyObj);
        if(i <= 2){
            // everyObj.rotation += r;
        }
        if((everyObj.rotation > 1.8 || everyObj.rotation < -0.2 )){
            r = -r;
        }
    }
    // console.log(computerChosen);
    for(let i = 0; i < computerSprites.length; i++){
        if(computerSprites[i].x > 900){
            computerSprites[i].x -= 10
        }
    }
    for(let i = 0; i < playerChosen.length; i++){
        if(playerChosen[i].x < 200){
            playerChosen[i].x += 10
        }
    }
    for(let i = 0; i < previousChosenPlayer.length; i++){
            // previousChosenPlayer[i].x -= 10
    }
    for(let i = 0; i < previousChosenComputer.length; i++){
        // previousChosenComputer[i].x += 10
    }
    app.stage.children.forEach(function(child){
        if(child.d){
            child.destroy(true);
        }
    });
});
let texts = [];
                                    // Interactiveness here : 
button.interactive = true;
button.on("pointerdown",function (){
    moveButton = true;
    app.stage.addChild(restartButton);
    app.stage.addChild(text3);
})
rock.interactive = true;
let i = 0;
let j = 0;
let k = 0;
rock.on("pointerdown",function (){ 
    if(moveButton){
        // Chossing a random option for our computer :
        let randomOption = options[Math.floor(Math.random() * options.length)];
        computerChosen.push(randomOption);
        // Displaying what our computer chose :
        let comOption = new PIXI.Sprite.from(`./Assets/Computer/${randomOption}-computer.png`); 
        comOption.width = 150;
        comOption.height = 80
        comOption.position.set(innerWidth + 100,300);
        // For moving the computer computerSprites; 
        computerSprites.push(comOption);
        app.stage.addChild(comOption);
        // Displaying what our player chose : 
        let rock = PIXI.Sprite.from('./Assets/Player/rock-player.png');
        rock.width = 150;
        rock.height = 80;
        // rock.d = true;
        rock.position.set(-50,300);
        // rock.rotation -= 10.5;
        // To move the player sprite : 
        playerChosen.push(rock);
        for(let i = 0; i < texts.length; i++){
            app.stage.removeChild(texts[i]);
        }
        if(randomOption == "rock"){
            console.log("This is draw !!!");
            let text2 = new PIXI.Text("Draw", style3)
            text2.x  = innerWidth / 2 - text2.width;
            text2.y  = innerHeight / 2 - 150;
            texts.push(text2);
            app.stage.addChild(text2);
        }
        else if(randomOption == "scissors"){
            console.log("You Won !!!");
            let text2 = new PIXI.Text("You Won !!!", style3)
            text2.x  = innerWidth / 2 - text2.width;
            text2.y  = innerHeight / 2 - 150;
            texts.push(text2);
            app.stage.addChild(text2);
            score++;
        }
        else if(randomOption == "paper"){
            console.log("You Lost !!!");
            let text2 = new PIXI.Text("You Lost !!!", style3)
            text2.x  = innerWidth / 2 - text2.width;
            text2.y  = innerHeight / 2 - 150;
            texts.push(text2);
            app.stage.addChild(text2);
            scoreCom++;
        }

        if(i > 0){
            // previousChosenPlayer.push(rock);
            // previousChosenComputer.push(comOption);
        }
        for(let i = 0; i < previousChosenPlayer.length; i++){
            app.stage.removeChild(previousChosenPlayer[i]);
            // previousChosenPlayer[i].destroy(true);
        }
        for(let i = 0; i < previousChosenComputer.length; i++){
            app.stage.removeChild(previousChosenComputer[i]);
        }
        if(k <= 0){
        }
        i++;
        previousChosenPlayer.push(rock);
        previousChosenComputer.push(comOption);
    }
})

paper.interactive = true;
paper.on("pointerdown",function (){ 
    if(moveButton){
        // Chossing a random option for our computer :
        let randomOption = options[Math.floor(Math.random() * options.length)]; 
        computerChosen.push(randomOption);
        // Displaying what our computer chose :
        let comOption = new PIXI.Sprite.from(`./Assets/Computer/${randomOption}-computer.png`); 
        comOption.width = 150;
        comOption.height = 80
        comOption.position.set(innerWidth + 100,300);
        // For moving the computer computerSprites; 
        computerSprites.push(comOption);
        app.stage.addChild(comOption);
        let paper = PIXI.Sprite.from('./Assets/Player/paper-player.png');
        paper.width = 150;
        paper.height = 80;
        // paper.d = true;
        paper.position.set(-50,300);
        // paper.rotation -= 10.5;
        // paper.x += 100;
        // To move the player sprite : 
        playerChosen.push(paper);

        for(let i = 0; i < texts.length; i++){
            app.stage.removeChild(texts[i]);
        }
        if(randomOption == "rock"){
            console.log("You Won !!!");
            let text2 = new PIXI.Text("You Won !!!", style3)
            text2.x  = innerWidth / 2 - text2.width;
            text2.y  = innerHeight / 2 - 150;
            texts.push(text2);
            app.stage.addChild(text2);
            score++;
        }
        else if(randomOption == "scissors"){
            console.log("You Lost !!!");
            let text2 = new PIXI.Text("You Lost !!!", style3)
            text2.x  = innerWidth / 2 - text2.width;
            text2.y  = innerHeight / 2 - 150;
            texts.push(text2);
            app.stage.addChild(text2);
            scoreCom++;
        }
        else if(randomOption == "paper"){
            app.stage.addChild(text2);
            console.log("This is draw !!!");
            let text2 = new PIXI.Text("Draw", style3)
            text2.x  = innerWidth / 2 - text2.width;
            text2.y  = innerHeight / 2 - 150;
            texts.push(text2);
            app.stage.addChild(text2);
        }

        if(j > 0){
            // previousChosenPlayer.push(paper);
            // previousChosenComputer.push(comOption);
        }
        for(let i = 0; i < previousChosenPlayer.length; i++){
            app.stage.removeChild(previousChosenPlayer[i]);
            // previousChosenPlayer[i].destroy(true);
        }
        for(let i = 0; i < previousChosenComputer.length; i++){
            app.stage.removeChild(previousChosenComputer[i]);
        }
        if(k <= 0){
        }
        j++;
        previousChosenPlayer.push(paper);
        previousChosenComputer.push(comOption);
    }
    // app.stage.addChild(paper);
})
scissors.interactive = true;
scissors.on("pointerdown",function (){ 
    if(moveButton){
        // Chossing a random option for our computer :
        let randomOption = options[Math.floor(Math.random() * options.length)]; 
        computerChosen.push(randomOption);
        // Displaying what our computer chose :
        let comOption = new PIXI.Sprite.from(`./Assets/Computer/${randomOption}-computer.png`); 
        comOption.width = 150;
        comOption.height = 80
        comOption.position.set(innerWidth + 100,300);
        // For moving the computer computerSprites; 
        computerSprites.push(comOption);
        app.stage.addChild(comOption);
        let scissors = PIXI.Sprite.from('./Assets/Player/scissors-player.png');
        scissors.width = 150;
        scissors.height = 80;
        // scissors.d = true;
        scissors.position.set(-50,300);
        // scissors.rotation -= 10.5;
        // scissors.x += 100;
        // To move what the player chose :
        playerChosen.push(scissors);

        for(let i = 0; i < texts.length; i++){
            app.stage.removeChild(texts[i]);
        }
        if(randomOption == "rock"){
            console.log("You Lost !!!");
            let text2 = new PIXI.Text("You Lost !!!", style3)
            text2.x  = innerWidth / 2 - text2.width;
            text2.y  = innerHeight / 2 - 150;
            texts.push(text2);
            app.stage.addChild(text2);
            scoreCom++;
        }
        else if(randomOption == "scissors"){
            app.stage.addChild(text2);
            console.log("This is draw !!!");
            let text2 = new PIXI.Text("Draw", style3)
            text2.x  = innerWidth / 2 - text2.width;
            text2.y  = innerHeight / 2 - 150;
            texts.push(text2);
            app.stage.addChild(text2);
        }
        else if(randomOption == "paper"){
            console.log("You Won !!!");
            let text2 = new PIXI.Text("You Won !!!", style3)
            text2.x  = innerWidth / 2 - text2.width;
            text2.y  = innerHeight / 2 - 150;
            texts.push(text2);
            app.stage.addChild(text2);
            score++;
        }
        if(k > 0){
            // previousChosenPlayer.push(scissors);
            // previousChosenComputer.push(comOption);
        }
        for(let i = 0; i < previousChosenPlayer.length; i++){
            app.stage.removeChild(previousChosenPlayer[i]);
            // previousChosenPlayer[i].destroy(true);
        }
        for(let i = 0; i < previousChosenComputer.length; i++){
            app.stage.removeChild(previousChosenComputer[i]);
        }
        if(k <= 0){
        }
        k++;
        previousChosenPlayer.push(scissors);
        previousChosenComputer.push(comOption);
    }
})
// Restarting the game : 
// First the making the restart button interactive :
restartButton.interactive = true;
restartButton.on("pointerdown",function (){
    console.log("Reload the game !!!")
    location.reload();
})