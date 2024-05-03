using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.Scripting;
using UnityEngine.UIElements;

namespace Skibitsky.Unity.Web3ModalWagmi
{
    public class Dapp : MonoBehaviour
    {
        [SerializeField] private UIDocument _uiDocument;

        private Button _connectButton;
        private Button _signButton;
        
        [DllImport("__Internal")]
        private static extern void ConnectWallet();
        
        [DllImport("__Internal")]
        private static extern void SignMessage();
        
        private void Awake()
        {
            _connectButton = _uiDocument.rootVisualElement.Q<Button>("ConnectButton");
            _connectButton.clicked += ConnectButtonClicked;
            
            _signButton = _uiDocument.rootVisualElement.Q<Button>("SignButton");
            _signButton.clicked += SignButtonClicked;
            
            SetConnectedState("false");
        }
        
        private static void ConnectButtonClicked()
        {
            Debug.Log("[UnityDapp] ConnectButtonClicked");
            ConnectWallet();
        }
        
        private void SignButtonClicked()
        {
            Debug.Log("[UnityDapp] SignButtonClicked");
            SignMessage();
        }

        [Preserve]
        public void SetConnectedState(string value)
        {
            Debug.Log("[UnityDapp] SetConnectedState");
            
            if (_connectButton == null || _signButton == null)
                return;
            
            if (bool.TryParse(value, out var valueBool))
            {
                _connectButton.SetEnabled(!valueBool);
                _signButton.SetEnabled(valueBool);
            }
        }

        [Preserve]
        public void SetModalOpenState(string value)
        {
            Debug.Log($"SetModalOpenState: {value}");
#if !UNITY_EDITOR && UNITY_WEBGL
        // disable WebGLInput.captureAllKeyboardInput so elements in web page can handle keyboard inputs
        WebGLInput.captureAllKeyboardInput = !bool.Parse(value);
#endif
        }
    }
}