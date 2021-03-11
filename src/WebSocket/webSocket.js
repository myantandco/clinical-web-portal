// import {
//   NOTIFICATION_REQUEST,
//   ALL,
//   NOTIFICATION_CANCELATION
// } from "./webSocketHelper";
// import { BehaviorSubject } from "rxjs";
// import { io } from "socket.io-client";
// var deviceIDSubscribed;
// var socketData = {
//   ecg: {
//     1: [],
//     2: [],
//     3: [],
//   },
//   location: "",
//   steps: "",
//   activity: "",
//   heartrate: "",
// };
import { Auth } from 'aws-amplify'

var receiver = ["gateway123"];
// var sender = "het.kansara@myant.ca";

const webSocketLink = "wss://prod-websocket.skiinserver.com";
let ws;

// const devLink = "wss://lxwkunc4vj.execute-api.us-east-1.amazonaws.com/dev";
// io.set('transports', ['xhr-polling'])

export const OpenSocket = () => {
  return new Promise((resolve, reject)=> {
    Auth.currentAuthenticatedUser().then((user) => {
      ws = new WebSocket(webSocketLink, user?.signInUserSession?.accessToken?.jwtToken)
      ws.onopen = () => {
        resolve(true)
        console.log("connected") 
      }

      ws.onmessage = (event) => {
        console.log(event)
        
        // if (event) {
        //   let data = parseMessage(event);
        //   if (data && data.header.subType === "location") {
        //     if (lastLocationTimestamp < data.phoneTimestamp) {
        //       lastLocationTimestamp = data.phoneTimestamp;
        //       socketData.location = data.data;
        //       subscriber.next({ type: "location", socketData: socketData });
        //     }
        //   } else if (data && data.header.subType === "steps") {
        //     if (lastStepsTimestamp < data.phoneTimestamp) {
        //       lastStepsTimestamp = data.phoneTimestamp;
        //       socketData.steps = data.data;
        //       subscriber.next({ type: "steps", socketData: socketData });
        //     }
        //   } else if (data && data.header.subType === "activity") {
        //     socketData.activity = data.data;
        //     subscriber.next({ type: "activity", socketData: socketData });
        //   } else if (
        //     data &&
        //     data.header.subType === "heartRate" &&
        //     data.metaData.ECGChannel === 1
        //   ) {
        //     socketData.heartrate = data.data;
        //     subscriber.next({ type: "heartRate", socketData: socketData });
        //   }
        // }
      };

      ws.onclose = () => {
        console.log("Connection has been terminated");
      };
      
      // ws.onerror = (err) => {
      //   console.log("The error is ", err);
      // };
    })
  })
};

// export const CloseSocket = () => {
//   ws.close();
// };

export const SendRequest = (type) => {

  // type: type, 
  // protocol: '1.0.0', 
  // receiver: ["gateway123"],
  // sender: "het.kansara@myant.ca",
  // message_id: 475002, 
  // request_ack: true,
  // timestamp: date,
  const message = {
    header: {
      'protocol': '1.0.0', 
      'receiver': ['gateway123'], 
      'sender': 'het.kansara@myant.ca', 
      'timestamp': Date.now(), 
      'message_id': 475002, 
      'type': type, 
      'request_ack': true, 
      'length': 0,
      'data': {
      }
    }
  };
  try {
    ws.send(
      JSON.stringify({
        action: "sendmessage",
        data: JSON.stringify(message),
      })
    );
    console.log("Message Sent to", receiver[0], message);
  } catch (er) {
    console.log("Could not send the request, because ", er);
  }
};

const parseMessage = (event) => {
  if (event) {
    const message = JSON.parse(event.data);
    return message;
  }
  return {};
};

// export const stopMessage = (type) => {
//   let deviceIDRequestForCancellation = deviceIDSubscribed;
//   const message = {
//     receiver,
//     date,
//     header: {
//       type: type,
//       subType: ALL,
//     },
//     // metaData: {
//     //   deviceIDRequestForCancellation,
//     // },
//   };
//   try {
//     ws.close();
//     // ws.send(
//     //   JSON.stringify({
//     //     action: "sendmessage",
//     //     data: JSON.stringify(message),
//     //   })
//     // );
//     console.log(
//       "Cancellation Request for",
//       // deviceIDRequestForCancellation,
//       // "Sent to",
//       receiver[0]
//     );
//   } catch (er) {
//     console.log("Could not send the request, because ", er);
//   }
// };
