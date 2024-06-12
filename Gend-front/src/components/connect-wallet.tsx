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
    <>
      <Dialog id="connect_wallet_modal" openModal={openModal}>
        <SelectWalletForm method="dialog">
          <Title>
            {activeAddress ? "Wallet Connected" : "Select wallet provider"}
          </Title>

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
                <WalletButton
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
                      width: "40px",
                      height: "auto",
                    }}
                  />

                  <span>{provider.metadata.name}</span>
                </WalletButton>
              ))}
          </div>

          <div className="modal-action ">
            <button
              onClick={() => {
                closeModal();
              }}
            >
              Close
            </button>
            {activeAddress && (
              <button
                onClick={() => {
                  if (providers) {
                    const activeProvider = providers.find((p) => p.isActive);
                    if (activeProvider) {
                      activeProvider.disconnect();
                    } else {
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
        </SelectWalletForm>
      </Dialog>
      <Dim openModal={openModal} />
    </>
  );
};

interface DialogProps {
  openModal: boolean;
  closeModal?: () => void;
}

const Dialog = styled.dialog<DialogProps>((props) => [
  tw`fixed  z-50 overflow-y-auto`,
  props.openModal ? tw`block` : tw`hidden`,
]);

const SelectWalletForm = tw.form`
  flex flex-col items-center
  gap-48
`;

const Title = tw.div`
  font-xxxxl-b
`;

const WalletButton = tw.button`
  flex items-center gap-24
  w-256 h-64
  font-xxl-b
  bg-gray-200
  p-12
  rounded-md
`;

const Dim = styled.div<DialogProps>((props) => [
  tw`fixed w-full h-full bg-black bg-opacity-50 inset-0 z-1`,
  props.openModal ? tw`block` : tw`hidden`,
]);

export default ConnectWallet;
