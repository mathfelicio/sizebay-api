import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";

export class UpdateShortUrlDto {
  @ApiProperty({
    description: "A nova URL original para substituir a atual",
    example: "https://www.sizebay.dev",
    required: true,
  })
  @IsNotEmpty({ message: "The field url is required" })
  @IsUrl(
    { require_protocol: true },
    { message: "The field url must be a valid URL" },
  )
  url!: string;
}
