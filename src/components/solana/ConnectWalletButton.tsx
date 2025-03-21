import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { truncateMiddle } from '@/lib/utils';

export const ConnectWalletButton: React.FC = () => {
  const { publicKey } = useWallet();
  
  return (
    <div className="wallet-adapter-container">
      <style jsx global>{`
        .wallet-adapter-button {
          background-color: #5011ff !important; /* primary-500 */
          color: white;
          border-radius: 6px;
          height: 40px;
          padding: 0 18px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wallet-adapter-button:hover {
          background-color: #4700e6 !important; /* primary-600 */
        }
        .wallet-adapter-button:not([disabled]):focus-visible {
          outline-color: #5011ff;
        }
        .wallet-adapter-button-trigger {
          background-color: #5011ff;
        }
        .wallet-adapter-dropdown-list {
          background-color: #0f1320; /* dark-200 */
          border: 1px solid #0c101a; /* dark-300 */
          border-radius: 6px;
        }
        .wallet-adapter-dropdown-list-item {
          color: white;
          border-radius: 4px;
          padding: 10px 12px;
          margin: 4px;
          transition: background-color 0.2s;
        }
        .wallet-adapter-dropdown-list-item:hover {
          background-color: #0c101a; /* dark-300 */
        }
        .wallet-adapter-modal-wrapper {
          background-color: #0f1320; /* dark-200 */
        }
        .wallet-adapter-modal-button-close {
          background-color: #0c101a; /* dark-300 */
        }
        .wallet-adapter-modal-title {
          color: white;
        }
      `}</style>
      
      <WalletMultiButton />
    </div>
  );
}; 