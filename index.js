const badgr = require("./badgr.js");
const { IdentitystoreClient, DescribeUserCommand } = require("@aws-sdk/client-identitystore");
const client = new IdentitystoreClient({ region: "eu-west-1" });

exports.handler = async (event) => {
  //let token = await getConnexionToken()
    input = {
        "IdentityStoreId": "d-93670b1d31",
        "UserId": "93670b1d31-dcf6e9ac-0c04-4405-b751-a976fa599afa"
     }
    const command = new DescribeUserCommand(input);
    const response = await client.send(command);
    console.log(response)


    /*let userlist = await getUserAwardedList(
      "Bearer NkrpkHvxFduzS54jKSLEFXXe1CtBIy",
      "rFeAiLf4THyx1Zl0ugBA8A"
    );*/
    //console.log(userlist);
    //console.log(token)
  return response;
};

