import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type'
import { Attachment } from '../../enterprise/entities/attachment'
import { IAttachmentsRepository } from '../repositories/attachments-repository'
import { Uploader } from '../storage/uploader'

interface IUploadAndCreateAttachmentRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type IUploadAndCreateAttachmentResponse = Either<
  InvalidAttachmentTypeError,
  {
    attachment: Attachment
  }
>

@Injectable()
export class UploadAndCreateAttachment {
  constructor(
    private attachmentsRepository: IAttachmentsRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    body,
    fileName,
    fileType,
  }: IUploadAndCreateAttachmentRequest): Promise<IUploadAndCreateAttachmentResponse> {
    if (!/^(image\/(jpeg|jpg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAttachmentTypeError(fileType))
    }

    const { url } = await this.uploader.upload({
      body,
      fileName,
      fileType,
    })

    const attachment = Attachment.create({
      title: fileName,
      url,
    })

    await this.attachmentsRepository.create(attachment)

    return right({ attachment })
  }
}
