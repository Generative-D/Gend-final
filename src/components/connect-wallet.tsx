import { useWallet } from "@txnlab/use-wallet";
import Account from "./account";
import styled from "@emotion/styled/macro";
import tw from "twin.macro";

interface ConnectWalletInterface {
  openModal: boolean;
  closeModal: () => void;
}

const ConnectWallet = ({ openModal, closeModal }: ConnectWalletInterface) => {
  const { providers, activeAddress } = useWallet();

  return (
    // <dialog
    //   id="connect_wallet_modal"
    //   className={`modal ${openModal ? "modal-open" : ""}`}
    // >
    <Dialog id="connect_wallet_modal" openModal={openModal}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-2xl">
          {activeAddress ? "Wallet Connected" : "Select wallet provider"}
        </h3>

        <div className="grid m-2 pt-5">
          {activeAddress && (
            <>
              <Account />
              account
              <div className="divider" />
            </>
          )}

          {!activeAddress &&
            providers?.map((provider) => (
              <button
                data-test-id={`${provider.metadata.id}-connect`}
                className="btn border-1  m-2"
                key={`provider-${provider.metadata.id}`}
                onClick={() => {
                  return provider.connect();
                }}
              >
                <img
                  alt={`wallet_icon_${provider.metadata.id}`}
                  src={provider.metadata.icon}
                  style={{
                    objectFit: "contain",
                    width: "30px",
                    height: "auto",
                  }}
                />

                <span>{provider.metadata.name}</span>
              </button>
            ))}
        </div>

        <div className="modal-action ">
          <button
            data-test-id="close-wallet-modal"
            className="btn"
            onClick={() => {
              closeModal();
            }}
          >
            Close
          </button>
          {activeAddress && (
            <button
              className="btn btn-secondary"
              data-test-id="logout"
              onClick={() => {
                if (providers) {
                  const activeProvider = providers.find((p) => p.isActive);
                  if (activeProvider) {
                    activeProvider.disconnect();
                  } else {
                    // Required for logout/cleanup of inactive providers
                    // For instance, when you login to localnet wallet and switch network
                    // to testnet/mainnet or vice verse.
                    localStorage.removeItem("txnlab-use-wallet");
                    window.location.reload();
                  }
                }
              }}
            >
              Logout
            </button>
          )}
        </div>
      </form>
    </Dialog>
  );
};

interface DialogProps {
  openModal: boolean;
  closeModal?: () => void;
}

const Dialog = styled.dialog<DialogProps>((props) => [
  tw`fixed inset-0 z-50 overflow-y-auto`,
  props.openModal ? tw`block` : tw`hidden`,
]);

export default ConnectWallet;
