import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { Server } from 'ws';

@WebSocketGateway()
class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  logger: Logger = new Logger(EventsGateway.name);

  constructor(private config: ConfigService) {}

  async afterInit() {
    this.logger.log(`WebSocket is running on: ${this.config.get('app.port')}`);
  }

  async handleConnection(client: Client) {
    client.Id = randomUUID();
  }

  async handleDisconnect() {
    return;
  }
}

export default EventsGateway;
