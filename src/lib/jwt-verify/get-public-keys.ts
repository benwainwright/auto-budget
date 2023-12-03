import Axios from "axios";
import jwkToPem from "jwk-to-pem";
import { getIssuer } from "./get-issuer";
import type { PublicKeyMeta } from "./public-key-meta";

interface PublicKey {
  alg: string;
  e: string;
  kid: string;
  kty: "RSA";
  n: string;
  use: string;
}

interface PublicKeys {
  keys: PublicKey[];
}

interface MapOfKidToPublicKey {
  [key: string]: PublicKeyMeta;
}

// eslint-disable-next-line fp/no-let
let cacheKeys: MapOfKidToPublicKey | undefined;
export const getPublicKeys = async (
  region: string,
  poolId: string,
): Promise<MapOfKidToPublicKey> => {
  if (!cacheKeys) {
    const issuer = getIssuer(region, poolId);
    const url = `${issuer}/.well-known/jwks.json`;
    const response = await fetch(url);
    const publicKeys = (await response.json()) as PublicKeys;
    // eslint-disable-next-line fp/no-mutation
    cacheKeys = publicKeys.keys.reduce<MapOfKidToPublicKey>(
      (agg: MapOfKidToPublicKey, current: PublicKey) => {
        const pem = jwkToPem(current);
        // eslint-disable-next-line fp/no-mutation
        agg[current.kid] = { instance: current, pem };
        return agg;
      },
      {},
    );
    return cacheKeys;
  } else {
    return cacheKeys;
  }
};
