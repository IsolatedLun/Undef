export interface JWT_Tokens {
    access: string;
    refresh: string;
}

export function updateTokens(tokens: JWT_Tokens): void {
    localStorage.setItem('access', tokens.access);
    localStorage.setItem('refresh', tokens.refresh);
}

export function getAccess(): string {
    return localStorage.getItem('access')!
}

export function getRefresh(): string {
    return localStorage.getItem('refresh')!
}