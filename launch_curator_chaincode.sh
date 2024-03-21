export CORE_TLS_CLIENT_CERT_PATH="$PWD/certs/curator/client.crt"
export CORE_PEER_TLS_ROOTCERT_FILE="$PWD/certs/curator/peer.crt"
export CORE_TLS_CLIENT_KEY_PATH="$PWD/certs/curator/client.key"
export CORE_CHAINCODE_BUILDLEVEL="2.4.2"
export CORE_TLS_CLIENT_CERT_FILE="$PWD/certs/curator/client_pem.crt"
export CORE_CHAINCODE_LOGGING_LEVEL="info"
export CORE_PEER_LOCALMSPID="CuratorOrg"
export CORE_CHAINCODE_ID_NAME="basic-product_0.0.1:7d3ade7cb69b6b7ca5f0bad6f15979f879d14611a5e60fc357a6b756e69a55f2"
export CORE_CHAINCODE_LOGGING_FORMAT="%{color}%{time:2006-01-02 15:04:05.000 MST} [%{module}] %{shortfunc} -> %{level:.4s} %{id:03x}%{color:reset} %{message}"
export CORE_CHAINCODE_LOGGING_SHIM="info"
export CORE_TLS_CLIENT_KEY_FILE="$PWD/certs/curator/client_pem.key"
export CORE_PEER_TLS_ENABLED="true"

npm run start -- --peer.address peer0.curator.local:7041