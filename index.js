const badgr = import("./badgr.js");

exports.handler = async (event) => {
  return "ok";
};

(async () => {
    let token = await badgr.getConnexionToken()
    /*let userlist = await getUserAwardedList(
      "Bearer NkrpkHvxFduzS54jKSLEFXXe1CtBIy",
      "rFeAiLf4THyx1Zl0ugBA8A"
    );*/
    //console.log(userlist);
    console.log(token)
  })();

