import { UniqueEntityId } from '../entity/unique-entity-id'

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityId
}
