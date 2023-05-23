// chain

export enum SupportedProviderImplementations {
  LedgerConnect = "LedgerConnect",
  WalletConnect = "WalletConnect",
}

// logging

export type EnableDebugLogsFunction = () => void;

// support

export type CheckSupportOptions = {
  providerType: SupportedProviders;
  chainId?: number;
  bridge?: string;
  infuraId?: string;
  rpc?: { [chainId: number]: string };
};

export type CheckSupportResult = {
  isLedgerConnectSupported: boolean;
  isLedgerConnectEnabled: boolean;
  isChainIdSupported?: boolean;
  providerImplementation: SupportedProviderImplementations;
};

export type CheckSupportFunction = (
  options: CheckSupportOptions
) => CheckSupportResult;

// ethereum

export type EthereumRequestPayload = {
  method: string;
  params?: unknown[] | object;
};

export interface EthereumProvider {
  providers?: EthereumProvider[];
  connector?: unknown;
  request<T = unknown>(args: EthereumRequestPayload): Promise<T>;
  disconnect?: { (): Promise<void> };
  emit(eventName: string | symbol, ...args: any[]): boolean;
  on(event: any, listener: any): void;
  removeListener(event: string, listener: any): void;
}

// solana

export interface SolanaProvider {
  signTransaction(...args: unknown[]): Promise<unknown>;
  signAllTransactions(...args: unknown[]): Promise<unknown>;
  signAndSendTransaction(...args: unknown[]): Promise<unknown>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

// getProvider

export enum SupportedProviders {
  Ethereum = "Ethereum",
  Solana = "Solana",
}

export type ProviderResult = EthereumProvider | SolanaProvider;

export type GetProviderFunction = () => Promise<ProviderResult>;

// script loader

export interface LedgerConnectKit {
  enableDebugLogs: EnableDebugLogsFunction;
  checkSupport: CheckSupportFunction;
  getProvider: GetProviderFunction;
}

import { checkSupport, getProvider, enableDebugLogs } from "../connect-kit/src";

export async function loadConnectKit(): Promise<LedgerConnectKit> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolve({ checkSupport, getProvider, enableDebugLogs });
  });
}
