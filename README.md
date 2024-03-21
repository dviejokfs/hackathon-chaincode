```bash
export CHANNEL_NAME=product-channel
export CHAINCODE_ADDRESS="localhost:9996"

fabric-chaincode-dev start --config=test-network/connection-profiles/cpp-all.yaml \
    --channel=$CHANNEL_NAME --chaincode="basic-product" \
    -o CuratorOrg -u admin \
    -o PartnerOrg1 -u admin \
    --policy="OR('CuratorOrg.member', 'PartnerOrg1.member')" \
    --chaincodeAddress="${CHAINCODE_ADDRESS}" --envFile=$PWD/.chaincode-env

```