import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { Either, right } from "@/core/either";
import { Notification } from "../../enterprise/entities/notification";
import { INotificationsRepository } from "../repositories/notifications-repository";

export interface ISendNotificationUseCaseRequest {
  recipientId: string;
  title: string;
  content: string;
}

export type TSendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification;
  }
>;

export class SendNotificationUseCase {
  constructor(private notificationsRepository: INotificationsRepository) {}

  async execute({
    recipientId,
    content,
    title,
  }: ISendNotificationUseCaseRequest): Promise<TSendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content,
    });

    await this.notificationsRepository.create(notification);

    return right({ notification });
  }
}
