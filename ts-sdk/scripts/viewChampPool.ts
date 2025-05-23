import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { CHAMP_MARKET_OBJECT_IDS } from '../src';
import { champMarket, mockcoins } from '../src/suigen';

const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

const pool = await champMarket.cpmm.Pool.fetch(
  suiClient,
  [mockcoins.red.RED.phantom(), mockcoins.wsui.WSUI.phantom()],
  CHAMP_MARKET_OBJECT_IDS.POOLS.RED_WSUI,
);

console.log(pool);
