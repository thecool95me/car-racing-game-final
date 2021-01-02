class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);


    cars = [car1, car2, car3, car4];
    car2.addImage(car1img)
    car3.addImage(car2img)
    car4.addImage(car3img)
    car1.addImage(car4img)

    finishLine = false

  }


  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      //var display_position = 100;
    background("brown")
    image (track,0,-displayHeight*4,displayWidth,displayHeight*5  )  
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 0;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10)
          fill("black")
          //rect(x,y,80,80)
          text(player.name,x,y+100)
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null&&finishLine === false){
      player.distance +=10
      player.update();
    }
if (player.distance>1000&&finishLine === false){
  Player.updateCarsAtEnd()
  player.rank = CarsAtEnd
  player.update()
  finishLine = true
}
    drawSprites();
  }
  end(){
    camera.position.x = 0
    camera.position.y = 0
    background ("black")
    fill("yellow")
    text ("GAME OVER",50,50)
    console.log ("GAME OVER")
    console.log(player.rank)
    for (var plr in allPlayers){
      if (allPlayers[plr].rank===1){
        text("winner  "+allPlayers[plr].name,0,85)
      }
    }
  }
}
