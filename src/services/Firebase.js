
const admin = require("firebase-admin");
const { v4: uuidv4 } = require('uuid');
const FCM = require("fcm-node");

const serviceAccount = require("../config/firebase-sdk.json");
const serverKey="AAAAh-9Ji_U:APA91bFkMulDkAdBv-BijDRP2q7me3N8nyigZlemmfpjw1G5TB59-KQBIxg2yilOBsL3-TEexzct1q936s3WK8q0JGdZoZKYr72ePi3LzcC8ms64mtzfdTHQ6lxZ8Zn5y27toXRqJomX";

var fcm = new FCM(serverKey);

const BUCKET ="prmflowershop.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET
});

const bucket =  admin.storage().bucket();

const uploadImage =  (image) =>{

    return new Promise( async(resolve,reject)=>{
        try {
            const filename = uuidv4();
            const file = bucket.file(filename);
        
            const stream = file.createWriteStream({
                metadata:{
                    contentType: image.mimetype,
                },
            });
        
            stream.on("error",(e) =>{
                console.log(e);
            })
        
            stream.on("finish", async()=>{
                await file.makePublic();

                
            })
        
            stream.end(image.buffer);
            resolve(`https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${filename}?alt=media`);
            
        }catch (e){
            console.log(e);
            reject(e);
        }
    })
}


const sendPushNotification =(token, title, message) => {
    return new Promise( async(resolve,reject)=>{
        try {
            const message = {
                token: token,
                notification: {
                  title: title,
                  body: message,
                },  
            };
          
            admin.messaging().send(message); resolve('hhe');
                // .then(response => {
                //   console.log('Push notification sent:', response);
                //   resolve('Push notification sent:', response);
                // })
                // .catch(error => {
                //   console.log('Error sending push notification:', error);
                //   resolve('Error sending push notification:', error);
                // });
        }catch (e){
            reject(e);
        }
    })
   
  }

  const pushNoti=()=>{
    const message = {
        token: "cS8_GueEQwm9boMEImnR3e:APA91bHwBuufX38B9s-rOxoX0BySzy5Ug2M_4QkGwp7LcMLhWPdwB4raS7gQHJC4MWYTdA1K8ay5f-9ck_WAqzrRCXBV9sl6C4ksTKi0x3BkCg4kyQz19z3gjhRaQgwprcdBxrLBFsML",//set token
        notification: {
          title: "Flower shop",
          body: "thanh toán thành công",
        },  
    };

    fcm.send(message, function (err, response) {
        if (err) {
          console.log("____(fcmErr) Something has gone wrong!" + err);
          console.log("____(fcmErr) Respponse:! " + response);
        } else {
          // showToast("Successfully sent with response");
          console.log("_____(fcm) Successfully sent with response: ", response);
        }
      });
  }


module.exports = {
    uploadImage,
    sendPushNotification,
    pushNoti

};
