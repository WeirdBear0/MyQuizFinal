class Quiz{
    constructor() {
      this.correct = "2"
    }
    getState() {
        var stateRef = database.ref('gameState');
        stateRef.on("value",  (data) => {
            gameState = data.val();
            console.log(gameState)
        })
    
      }
    
      update(state) {
        database.ref('/').update({
          gameState: state
        });
      }
    
      async start() {
        if (gameState === 0) {
          console.log("start called")
          player = new Player();
          var playerCountRef = await database.ref('playerCount').once("value");
          if (playerCountRef.exists()) {
            playerCountRef = playerCountRef.val();
            player.getCount();
          }
          question = new Question()
          question.display();
        }
      }
      play(){
        Player.getPlayerInfo();
        question.hide();
        background("yellow")
        textSize(25)
        text("Results...", 200, 220)
        var y = 240
        for (const key in allPlayers) {
          if(allPlayers[key].answer === this.correct){
            fill("green")
          }
          else{
            fill("red")
          }
          y += 20
          textSize(20);
          text(allPlayers[key].name +" : " + allPlayers[key].answer, 200, y)

        }

      }

    
}