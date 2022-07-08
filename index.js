const badgr = require("./badgr-api/badgr.js");
const event = require("./AddMemberToGroup.json");
const {
  IdentitystoreClient,
  DescribeUserCommand,
} = require("@aws-sdk/client-identitystore");
const client = new IdentitystoreClient({ region: "eu-west-1" });

/*exports.handler = async (event) => {
   
  return "ok";
};*/

(async () => {
  //Recuperer dans l'event (identityStoreId, memberId, groupId)

  const identityStoreId = event.requestParameters.identityStoreId;
  const groupId = event.requestParameters.groupId;
  const memberId = event.requestParameters.member.memberId;

  //Recuperer le nom de l'utilisateur a partir de l'userId et de IdentityStore Id

  input = {
    IdentityStoreId: identityStoreId,
    UserId: memberId,
  };
  const command = new DescribeUserCommand(input);
  const response = await client.send(command);
  const userName = response.UserName

  //Recuperer l'id du badges a attribuer par correspondance avec le groupId

  const badgeId = "rFeAiLf4THyx1Zl0ugBA8A"

  //Recuperer la liste des nom d'utilisateur qui on recu le badge

  const badgrToken = await getConnexionToken()
  let userNameList = await getUserAwardedList(
    badgrToken,
    badgeId
  );

  //Si l'utilisateur concerner n'est pas dans la liste
  let needBadge = true
  userNameList.forEach(element => {
    if(userName == element){
      needBadge = false
    }
  });

  //Lui attribuer le badge
  if(needBadge) {
    console.log(userName+" vas recevoir un badge")
    toReturn = await awardBadge(badgrToken,badgeId,userName)
  }
  else {
    console.log(userName+" ne vas pas recevoir un badge")
    toReturn = "Pas de badge"
  }
  console.log(toReturn)
  return toReturn
})();