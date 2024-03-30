let ws: WebSocket | null = null;
const subscribers: Record<EventsType, SubscriberType[]> = {
  'messagesRecieved': [],
  'statusChanged': [],
};

type EventsType = 'messagesRecieved' | 'statusChanged'

type SubscriberType = (data: any) => any

const cleanup = () => {
  ws?.removeEventListener('close', resetHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.close()
  ws = null
}

const messageHandler = (e: any) => {
  subscribers.messagesRecieved.forEach((f: any) => {
    console.log('messageHandler')
    f(JSON.parse(e.data))
  });
  console.log(JSON.parse(e.data).length)
}
const resetHandler = () => {
  cleanup()
  setTimeout(chatAPI.start, 3000)
}

const createChannel = () => {
  ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('close', resetHandler)
  console.log('channel was created')
}

export const chatAPI = {
  subscribe(subscriber: any, eventName: EventsType) {
    subscribers[eventName] = [...subscribers[eventName], subscriber]
    return () => {
      subscribers[eventName] = subscribers[eventName].filter((f: any) => f !== subscriber)
    }
  },
  unsubscribe(subscriber: any, eventName: EventsType) {
    subscribers[eventName] = subscribers[eventName].filter((f: any) => f !== subscriber)
  },
  start() {
    createChannel()
  },
  stop() {
    subscribers.messagesRecieved = [] 
    subscribers.statusChanged = [] 
    cleanup()
  },
  sendMessage(message: string) {
    ws?.send(message)
  },

}