

export class ShortUrlCodeException extends Error {
    constructor() {
        super(`Falha ao gerar código único para a URL curta`);
        this.name = "ShortUrlCodeException";
    }
}