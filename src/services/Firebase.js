
const admin = require("firebase-admin");
const { v4: uuidv4 } = require('uuid');
const FCM = require("fcm-node");

const serviceAccount = require("../config/firebase-sdk.json");

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


module.exports = {
    uploadImage,
    sendPushNotification

};
