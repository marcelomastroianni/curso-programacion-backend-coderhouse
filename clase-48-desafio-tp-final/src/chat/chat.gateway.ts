import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  import { DaoFactory } from '../daos/';

  /*
  @WebSocketGateway(81, {
    cors: { origin: '*' },
  })*/
  @WebSocketGateway({
    cors: { origin: '*' },
  })
  export class ChatGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    @WebSocketServer() server: Server;

    mensajesDao: any;


    constructor() {
        this.mensajesDao = DaoFactory.getDao("mensajes");
    }

  
    afterInit(server: any) {
      console.log('Esto se ejecuta cuando inicia')
    }
  
    async handleConnection(client: any, ...args: any[]) {
      console.log('Hola alguien se conecto al socket 👌👌👌');
      const messages = await this.mensajesDao.getAll();
      client.emit('all messages', messages)
    }
  
    handleDisconnect(client: any) {
      console.log('ALguien se fue! chao chao')
    }

    /*
    @SubscribeMessage('event_get_messages')
    async handleGetMessages(client: Socket, room: string) {
        const messages = await this.mensajesDao.getAll();
        client.emit('messages', messages);
    }*/

    @SubscribeMessage('chat message')
    async handleChatMessage(client: Socket, msg) {
        try{
            //msg.created_at = new Date().toLocaleDateString("es-AR",{dateStyle: 'short', timeStyle: 'medium'});
            msg.created_at = new Intl.DateTimeFormat('es-AR', { dateStyle: "short", timeStyle: "medium" }).format(new Date());  
         }
         catch(err){
            msg.created_at = new Date();
            console.log(err);
         }
        const newMessage = await this.mensajesDao.save(msg);
        const messages = await this.mensajesDao.getAll();
        this.server.emit('all messages', messages)

    }
  
  
    /*
    @SubscribeMessage('event_join')
    handleJoinRoom(client: Socket, room: string) {
      client.join(`room_${room}`);
    }
  
    @SubscribeMessage('event_message') //TODO Backend
    handleIncommingMessage(
      client: Socket,
      payload: { room: string; message: string },
    ) {
      const { room, message } = payload;
      console.log(payload)
      this.server.to(`room_${room}`).emit('new_message',message);
    }
  
    @SubscribeMessage('event_leave')
    handleRoomLeave(client: Socket, room:string) {
      console.log(`chao room_${room}`)
      client.leave(`room_${room}`);
    }
    */
  }