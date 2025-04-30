export interface IDecodedJwtToken {
  id: string; //userId
}

export interface IJwtTokens {
  accessToken: string;
  refreshToken: string;
}
