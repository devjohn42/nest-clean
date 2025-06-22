import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AttachamentProps {
  title: string
  link: string
}

export class Attachament extends Entity<AttachamentProps> {
  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  static create(props: AttachamentProps, id?: UniqueEntityID) {
    const attachament = new Attachament(props, id)

    return attachament
  }
}
