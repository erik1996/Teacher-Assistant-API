import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as postmark from 'postmark';
import { RequestLogger } from '../logger/types/logger';
// import { Logger } from 'src/logger/logger.service';

@Injectable()
export class EmailService {
  private readonly client: postmark.ServerClient;
  private readonly fromEmail: string;

  constructor(
    private readonly configService: ConfigService,
    // private readonly logger: Logger,
  ) {
    const apiKey = this.configService.get<string>('POSTMARK_API_KEY');
    if (!apiKey) {
      throw new Error('POSTMARK_API_KEY is not set');
    }

    this.fromEmail =
      this.configService.get<string>('POSTMARK_FROM_EMAIL') || '';
    this.client = new postmark.ServerClient(apiKey);
  }

  async sendTemplateEmail(
    toEmail: string,
    templateAlias: string,
    templateModel: Record<string, any>,
    logger: RequestLogger,
  ): Promise<void> {
    const skip =
      this.configService.get<string>('SKIP_EMAIL_SENDING') === 'true';

    if (skip) return;

    try {
      const result = await this.client.sendEmailWithTemplate({
        From: this.fromEmail,
        To: toEmail,
        TemplateAlias: templateAlias,
        TemplateModel: templateModel,
      });

      logger.debug(
        `Email sent to ${toEmail} using Postmark template: ${templateAlias}`,
        { result },
      );
    } catch (error) {
      logger.error(`Failed to send email to ${toEmail}: ${error.message}`, {
        stack: error?.stack || error?.toString() || 'Unknown error',
      });
      throw new Error('Failed to send email via Postmark');
    }
  }
}
