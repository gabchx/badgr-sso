//const data = require('./data.json')
//const FileCookieStore = require('tough-cookie-filestore2')
const axios = require("axios");
const FormData = require("form-data");

const username = "gabriel.chaiix@gmail.com";
const password = "ruvrEc-muqjif-2hehmi";
const endpoint = "https://api.eu.badgr.io";
const issuerOpenBadgeId = "IfS6R-d0QH6A7JbmoUsKkQ";

getConnexionToken = async () => {
  try {
    const response = await axios({
      url: endpoint + "/o/token",
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
      data: {
        grant_type: "password",
        client_id: "public",
        username: username,
        password: password,
      },
    });
    const { data } = response;
    const token = data.token_type + " " + data.access_token;
    return token;
  } catch (error) {
    return error;
  }
};

//Ajouter la recuperation du token de refreshing
awardBadge = async (authToken, badgeId) => {
  try {
    const json = JSON.stringify({
      issuerOpenBadgeId: issuerOpenBadgeId,
      recipient: {
        identity: "bellebopobrau-3838@yopmail.com",
        type: "email",
        hashed: true,
      },
      narrative:
        "This is an overall narrative describing how the badge was earned.",
      evidence: [
        {
          url: "https://api.eu.badgr.io/public/badges/" + badgeId,
          narrative:
            "This is a narrative describing the individual evidence item.",
        },
      ],
      expires: "2025-03-31T23:59:59Z",
      notify: true,
      extensions: {
        "extensions:recipientProfile": {
          "@context":
            "https://openbadgespec.org/extensions/recipientProfile/context.json",
          type: ["Extension", "extensions:RecipientProfile"],
          name: "Public McPlaintext",
        },
      },
    });

    const response = await axios({
      url: endpoint + "/v2/badgeclasses/" + badgeId + "/assertions",
      method: "post",
      headers: {
        Accept: "*/*",
        Authorization: authToken,
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
      data: json,
    });
    const { data } = response;
    return data.status;
  } catch (error) {
    return error;
  }
};

getUserAwardedList = async (authToken, badgeId) => {
  try {
    const response = await axios({
      //GET RequestID
      url: endpoint + "/v2/badgeclasses/" + badgeId + "/assertions",
      method: "get",
      headers: {
        Accept: "*/*",
        Authorization: authToken,
        //"Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
      params: {
        entity_id: badgeId,
      },
    });

    const { data } = response;
    const listRaw = data.result;
    const listEmail = [];
    listRaw.forEach((element) => {
      listEmail.push(element.recipient.plaintextIdentity.split('@')[0]);
    });

    return listEmail;
  } catch (error) {
    return error;
  }
};

/*
(async () => {
  let token = await getConnexionToken()
  let userlist = await getUserAwardedList(
    "Bearer NkrpkHvxFduzS54jKSLEFXXe1CtBIy",
    "rFeAiLf4THyx1Zl0ugBA8A"
  );
  console.log(userlist);
  //console.log(token)
})();
*/