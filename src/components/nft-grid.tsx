import { useEffect } from 'react'
import abi from '../utils/abi.json'
import { useContractRead } from 'wagmi'
import { Nft, NftGrid } from '../utils/types'
import { Typography } from '@ensdomains/thorin'

export default function Gallery({ nfts, tokenId, setTokenId }: NftGrid) {
  const nftsIds = nfts?.map((nft) => nft.tokenId)

  const { data: domains } = useContractRead({
    addressOrName: '0xa3d2BDC03A0e7Fd1641e9D718d80E1C1300Eb5F9',
    contractInterface: abi,
    functionName: 'getTokensDomains',
    args: [nftsIds],
    chainId: 1,
  })

  // Add domains to nfts if already claimed
  useEffect(() => {
    if (domains) {
      nfts?.forEach((nft, index) => {
        nft.domain = domains[index]
      })
    }
  }, [nfts, domains])

  return (
    <div className="nfts">
      {nfts &&
        nfts.map((nft: Nft) => (
          <div
            className={'nft' + (nft.tokenId === tokenId ? ' selected' : '')}
            key={nft.tokenId}
            onClick={() => setTokenId(nft.tokenId)}
          >
            <Typography as="span" className="nft__id">
              {nft.tokenId}
            </Typography>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="nft__image" src={nft.image} alt={nft.name} />
            <Typography
              as="p"
              style={{
                lineBreak: 'anywhere',
              }}
            >
              {nft?.domain}
            </Typography>
          </div>
        ))}
    </div>
  )
}
