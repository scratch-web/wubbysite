import { UUID } from "crypto";

interface WubbyAPIWorldInfo {
  id: number;
  activePlayers: string[] | { username: string, displayName: string, permission: number }[];
  blocks: number;
  bannedPlayers: unknown[];
  creator: { id: number, name: string, displayName: string };
  description: string;
  favorites: number;
  isFeatured: boolean;
  maxPlayers: number;
  name: string;
  privateWhitelistedPlayers: number[];
  privacyState: number;
  serverJobId: UUID;
  thirdPartyWarpInfo: boolean;
  thirdPartyWarps: boolean;
  thumbnails: number | number[];
  visits: number;
  whitelistedPlayers: number[];
}