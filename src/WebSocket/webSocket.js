import {
  NOTIFICATION_REQUEST,
  ALL,
  NOTIFICATION_CANCELATION,
  TOKEN,
  DEV_TOKEN
} from "./webSocketHelper";
import { BehaviorSubject } from "rxjs";
import { io } from "socket.io-client";
var deviceIDSubscribed;
import { WebSocketLink } from 'apollo-link-ws'
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
// var receiver = ["gateway123"];
// var sender = "het.kansara@myant.ca";



// var socket = io(webSocketLink, {
//   transports: ['websocket', 'polling', 'flashsocket'],
//   extraHeaders: headers
// });

// let lastLocationTimestamp = 0,
//   lastStepsTimestamp = 0;
// const date = Date.now();
// export const subscriber = new BehaviorSubject("");
const headers = { Authorization: DEV_TOKEN}
// // Create the connection and keep the reference
const webSocketLink = "wss://prod-websocket.skiinserver.com";
const devLink = "wss://lxwkunc4vj.execute-api.us-east-1.amazonaws.com/dev";

export const OpenSocket = () => {
  const ws = new WebSocket(devLink, null, {
    headers: headers,
  })

  // const headers = { Authorization: 'Bearer ' + validAccessToken }
  // log.info("HK Token", headers)
  // closedManually = false
  // // Create the connection and keep the reference
  // const webSocketLink = this.remoteConfig.getValue(WebSocketEndpoint)
  // this.ws = new WebSocket(webSocketLink, null, {
  //   headers,
  // })
  
  ws.onopen = () => {
    console.log("Connection has been established");
  };

  ws.onmessage = (event) => {
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

  ws.onerror = (err) => {
    console.log("The error is ", err);
  };
};

// export const CloseSocket = () => {
//   ws.close();
// };

// export const SendRequest = (type) => {

//   // type: type, 
//   // protocol: '1.0.0', 
//   // receiver: ["gateway123"],
//   // sender: "het.kansara@myant.ca",
//   // message_id: 475002, 
//   // request_ack: true,
//   // timestamp: date,
//   const message = {
//     header: {
//       'protocol': '1.0.0', 
//       'receiver': ['gateway123'], 
//       'sender': 'het.kansara@myant.ca', 
//       'timestamp': Date.now(), 
//       'message_id': 475002, 
//       'type': type, 
//       'request_ack': true, 
//       'length': 0,
//       'data': {
//       }
//     }
//   };
//   try {
//     ws.send(
//       JSON.stringify({
//         action: "sendmessage",
//         data: JSON.stringify(message),
//       })
//     );
//     console.log("Message Sent to", receiver[0], message);
//   } catch (er) {
//     console.log("Could not send the request, because ", er);
//   }
// };

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
