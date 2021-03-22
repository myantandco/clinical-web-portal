import { BehaviorSubject } from "rxjs";
import { Auth } from 'aws-amplify'
const webSocketLink = "wss://prod-websocket.skiinserver.com";
const podList = new BehaviorSubject({})
const ecgData = new BehaviorSubject({})
let ws;

export const getPodList = () => {
  return podList
}

export const getECGData = () => {
  return ecgData
}

export const OpenSocket = () => {
  return new Promise((resolve, reject)=> {
    Auth.currentAuthenticatedUser().then((user) => {
      ws = new WebSocket(webSocketLink, user?.signInUserSession?.accessToken?.jwtToken)
      ws.onopen = () => {
        resolve(true)
        console.log("connected") 
      }

      ws.onmessage = (event) => {
        if (event) {
          let data = parseMessage(event);
          if(data && data.header && data.header.type == "ack" && data.data && data.data.type && data.data.type == "get_connected_pods" && data.data.data) {
            podList.next(data.data.data)
          }
          if(data && data.header && data.header.type == "stream_ecg" && data.data) {
            ecgData.next(data.data)
          }
        }
      };

      ws.onclose = () => {
        console.log("Connection has been terminated");
      };
      
      ws.onerror = (err) => {
        console.log("The error is ", err);
      };
    })
  })
};

export const CloseSocket = () => {
  ws.close();
};

export const getConnectedPods = () => {
  // type: type, 
  // protocol: '1.0.0', 
  // receiver: ["gateway123"],
  // sender: "het.kansara@myant.ca",
  // message_id: 475002, 
  // request_ack: true,
  // timestamp: date,
  let requestMessage = {
    header: {
      'protocol': '1.0.0', 
      'receiver': ['gateway123'], 
      'sender': 'mockserver', 
      'timestamp': Date.now(), 
      'message_id': 475002, 
      'type': "get_connected_pods", 
      'request_ack': true, 
      'length': 0,
      'data': {
      }
    }
  };
  SendRequest(requestMessage)
}

export const ECGStream = (podid, serviceFlag) => {
  // type: type, 
  // protocol: '1.0.0', 
  // receiver: ["gateway123"],
  // sender: "het.kansara@myant.ca",
  // message_id: 475002, 
  // request_ack: true,
  // timestamp: date,
  let requestMessage = {
    header: {
      "protocol": "1.0.0", 
      "receiver": ["gateway123"], 
      "sender": "mockserver", 
      'timestamp': Date.now(), 
      "message_id": 475002, 
      "type": "config_stream", 
      "request_ack": true, 
      "length": 1
    },
    data: {
      "stream_id": ["ecg"], 
      "pod_serial": [podid], 
      "enable": serviceFlag
    }
  };
  SendRequest(requestMessage)
}

export const SendRequest = (requestMessage) => {
  try {
    ws.send(
      JSON.stringify({
        action: "sendmessage",
        data: JSON.stringify(requestMessage),
      })
    );
    console.log("Message Sent ", requestMessage);
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

export const getChartObject = (channelData) => {
  let returnObj = {}
  let lastTimeStamp = 0;
  do {
    let data = channelData.splice(0, 6);
    let chunkData = channelData.splice(0, data[data.length-1]);
    // chunkData = chunkData.filter((value, index) => {
    //   return index % 2 != 0;
    // });
    if(lastTimeStamp!=0 && (data[2] - lastTimeStamp) > 72) {
      let missingSamples = parseInt((data[2] - lastTimeStamp) % 72)
      let value = data[2]
      for(let i=0; i<missingSamples; i++) {
        returnObj[value+72] = [0,0,0,0,0,0,0,0,0,0,0,0]
      }
      returnObj[data[2]] = chunkData
    }
    returnObj[data[2]] = chunkData
  } while(channelData.length!=0)
  return returnObj
}