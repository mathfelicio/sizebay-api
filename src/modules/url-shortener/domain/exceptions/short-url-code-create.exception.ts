

export class ShortUrlCodeCreateException extends Error {
    constructor() {
        super(`Falha ao gerar código único para a URL curta`);
        this.name = "ShortUrlCodeCreateException";
    }
}