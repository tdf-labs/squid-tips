import { ApiPromise, WsProvider } from '@polkadot/api';
import '@polkadot/api-augment';
import { SubstrateNetwork } from '../model';

type Api = {
  [SubstrateNetwork.khala]: ApiPromise;
  [SubstrateNetwork.phala]: ApiPromise;
  [SubstrateNetwork.polkadot]: ApiPromise;
  [SubstrateNetwork.kusama]: ApiPromise;
};

let api = {} as Api;

const providers = {
  [SubstrateNetwork.khala]: 'wss://khala.api.onfinality.io/public-ws',
  [SubstrateNetwork.phala]: 'wss://phala.api.onfinality.io/public-ws',
  [SubstrateNetwork.polkadot]: 'wss://polkadot.api.onfinality.io/public-ws',
  [SubstrateNetwork.kusama]: 'wss://kusama.api.onfinality.io/public-ws',
};

export default async function getApi(
  network: SubstrateNetwork
): Promise<ApiPromise> {
  if (!api[network]) {
    api[network] = await ApiPromise.create({
      provider: new WsProvider(providers[network]),
    });

    await api[network].isReady;
  }

  return api[network];
} 