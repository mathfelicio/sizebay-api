import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";

export class CreateShortUrlDto {
  @ApiProperty({
    description: "A URL original a ser encurtada",
    example: "https://www.sizebay.com",
    required: true,
  })
  @IsNotEmpty({ message: "The field url is required" })
  @IsUrl(
    { require_protocol: true },
    { message: "The field url must be a valid URL" },
  )
  url!: string;
}
