mergeInto(LibraryManager.library, {
    ConnectWallet: function () {
        dispatchReactUnityEvent("ConnectWallet");
    },
    SignMessage: function () {
        dispatchReactUnityEvent("SignMessage");
    }
});