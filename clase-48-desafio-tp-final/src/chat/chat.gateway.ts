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
    }
  
    async handleConnection(client: any, ...args: any[]) {
      const messages = await this.mensajesDao.getAll();
      client.emit('all messages', messages)
    }
  
    handleDisconnect(client: any) {
    }

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

  }