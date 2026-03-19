import { NotFoundException } from '@nestjs/common';

export class ShortUrlNotFoundException extends NotFoundException {
    constructor() {
        super(`URL encurtada não encontrada`);
        this.name = 'ShortUrlNotFoundException';
    }
}
