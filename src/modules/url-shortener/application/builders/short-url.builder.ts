import { Injectable } from "@nestjs/common";

@Injectable()
export class ShortUrlBuilder {
  build(code: string) {
    const appBaseUrl = process.env.APP_BASE_URL || "http://localhost:3050";

    return `${appBaseUrl.replace(/\/$/, "")}/shorten/${code}`;
  }
}
