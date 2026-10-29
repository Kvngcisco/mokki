/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react'
import { DEXSCREENER_API, DEXSCREENER_PAIR_API } from '../config'

export interface MarketData {
  price: number | null
  priceChange1h: number | null
  priceChange24h: number | null
  priceChange6h: number | null
  marketCap: number | null
  fdv: number | null
  volume24h: number | null
  liquidity: number | null
  buys24h: number | null
  sells24h: number | null
  pairAddress: string | null
  lastUpdated: Date | null
}

const REFRESH_INTERVAL = 30_000 // 30 seconds

function formatDexData(data: any): MarketData {
  const pair = data?.pairs?.[0]
  if (!pair) {
    return {
      price: null, priceChange1h: null, priceChange24h: null,
      priceChange6h: null, marketCap: null, fdv: null,
      volume24h: null, liquidity: null, buys24h: null,
      sells24h: null, pairAddress: null, lastUpdated: null,
    }
  }
  return {
    price: parseFloat(pair.priceUsd ?? '0'),
    priceChange1h: pair.priceChange?.h1 ?? null,
    priceChange24h: pair.priceChange?.h24 ?? null,
    priceChange6h: pair.priceChange?.h6 ?? null,
    marketCap: pair.marketCap ?? pair.fdv ?? null,
    fdv: pair.fdv ?? null,
    volume24h: pair.volume?.h24 ?? null,
    liquidity: pair.liquidity?.usd ?? null,
    buys24h: pair.txns?.h24?.buys ?? null,
    sells24h: pair.txns?.h24?.sells ?? null,
    pairAddress: pair.pairAddress ?? null,
    lastUpdated: new Date(),
  }
}

export function useMarketData() {
  const [data, setData] = useState<MarketData>({
    price: null, priceChange1h: null, priceChange24h: null,
    priceChange6h: null, marketCap: null, fdv: null,
    volume24h: null, liquidity: null, buys24h: null,
    sells24h: null, pairAddress: null, lastUpdated: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isStale, setIsStale] = useState(false)
  const [noPair, setNoPair] = useState(false)

  const refresh = useCallback(async () => {
    setNoPair(false)
    let lastError: unknown = null
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        let json: any = null
        for (const url of [DEXSCREENER_PAIR_API, DEXSCREENER_API]) {
          const res = await globalThis.fetch(url, { cache: 'no-store' })
          if (!res.ok) continue
          const j = await res.json()
          if (j?.pairs?.length) { json = j; break }
        }
        if (!json) throw new Error('no pair data')
        const formatted = formatDexData(json)
        setData(formatted)
        setNoPair(false)
        setError(null)
        setIsStale(false)
        setLoading(false)
        return
      } catch (e: any) {
        lastError = e
        if (attempt === 0) await new Promise(resolve => setTimeout(resolve, 900))
      }
    }
    setError((lastError as any)?.message ?? null)
    setIsStale(Boolean(lastError))
    setNoPair(!lastError)
    setData(formatDexData({ pairs: null }))
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
    const interval = setInterval(refresh, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [refresh])

  return { data, loading, error, isStale, noPair, refresh }
}
