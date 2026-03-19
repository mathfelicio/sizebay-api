import { IsNotEmpty, IsUrl } from "class-validator";

export class CreateShortUrlDto {
  @IsNotEmpty({ message: "The field url is required" })
  @IsUrl(
    { require_protocol: true },
    { message: "The field url must be a valid URL" },
  )
  url!: string;
}
