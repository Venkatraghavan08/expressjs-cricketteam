const express = requrie("express");
const path = requrie("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const dbPath = path.join(__dirname, "cricketTeam.db");
const app = express();
app.use(express.json());
const dataBase = null;
const initialieserver = async () => {
  try {
    dataBase = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
     app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initialieserver();

const convertobj=(dbObject)=>{
    return{
        playerId:dbObject.player_id,
        playerName:dbObject.player_name,
        jerseyNumber:dbObject.jersey_number,
        role:dbObject.role,
    };
};

app.get('/players/',async (request,response)=>{
    const getPlayerQuery=`
    SELECT
    * 
    FROM 
        cricket_team;`;
    const queryArray=await dataBase.all(getPlayerQuery);
    respond.send(queryArray.map*(eachArray)=>
    convertobj(eachArray))
    );
});

app.post('/players/',async (request,response)=>{
    const {playername,jerseyNumber,role}=request.body
    const playerQuery=`INSERT INTO cricket_team(player_name,jersey_number)
    values('${player_name},${jersey_number},'${role}') 
    ;`
    const player= await dataBase.run(player);
    response.send("Player Added to Team")
})
app.put('/players/:playerId',async (request,response)=>{
    const { player_id } = request.params
    const updatequerey=`UPDATE create_team
     SET 
    player_name='${playerName}',
    jersey_number=${jerseyNumber}
    role='${role};'`
    await dataBase.run(updatequerey);
    response.send('Player Details Updated')
});
app.delete('/players/:playerId',async (request,response)=>{
    const { player_id } = request.params
    const deletequerey=`DELET FROM cricket_team
    WHERE player_id=${playerId};`
    await dataBase.run(deletequerey);
    response.send('Player Removed');
});

module.exports=app;