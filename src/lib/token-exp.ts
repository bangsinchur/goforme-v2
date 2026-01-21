export function decodeJwtPayload(token: string) {
    const[,payload]= token.split(".");
    if(!payload) return null;
    return JSON.parse(Buffer.from(payload,"base64").toString("utf-8"));
}

export function isTokenExpired(token: string|null) {
    if(!token) return true;
    try{
        const payload = decodeJwtPayload(token);
        const exp = payload?.exp;
        if(typeof exp !== "number") return true
        return Date.now() / 1000 > exp
    }catch(error){
        return true;
    }
}