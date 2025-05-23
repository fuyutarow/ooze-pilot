import { CHAMP_MARKET_OBJECT_IDS, MOCKCOINS_OBJECT_IDS } from '@/objectIds';
import { champMarket, mockcoins } from '@/suigen';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { describe, expect, it } from 'vitest';
import { getKeyInfoFromAlias } from './keyInfo';

describe('Champ Market Tests', () => {
  const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
  const alice = getKeyInfoFromAlias('alice')?.keypair;
  if (!alice) throw new Error('Alice keypair not found');

  it('Alice swaps red for wsui', async () => {
    const tx = new Transaction();
    tx.setSender(alice.toSuiAddress());
    tx.setGasBudget(100_000_000);

    const coinIn = mockcoins.wsui.mint(tx, {
      treasuryCap: MOCKCOINS_OBJECT_IDS.TREASURY_CAPS.WSUI,
      u64: 10_000n * 1_000_000_000n,
    });

    const coinOut = champMarket.cpmm.swapYToX(tx, [mockcoins.red.RED.$typeName, mockcoins.wsui.WSUI.$typeName], {
      pool: CHAMP_MARKET_OBJECT_IDS.POOLS.RED_WSUI,
      coin: coinIn,
    });

    tx.transferObjects([coinOut], alice.toSuiAddress());

    const txBytes = await tx.build({ client: suiClient });
    const dryRunResult = await suiClient.dryRunTransactionBlock({
      transactionBlock: txBytes,
    });
    expect(dryRunResult.effects.status.status).toBe('success');
  });
});
