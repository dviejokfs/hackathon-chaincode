export FABRIC_CA_CLIENT_HOME=$PWD/tmp-fabric-ca/curator/admin
fabric-ca-client enroll -u https://admin:adminpw@localhost:7040 --tls.certfiles=$PWD/tmp-fabric-ca/curator/tls-cert.pem

fabric-ca-client register --id.name admin-chaincode --id.secret adminpw \
 --id.type admin -u https://admin:adminpw@localhost:7040 \
 --tls.certfiles=$PWD/tmp-fabric-ca/curator/tls-cert.pem

export FABRIC_CA_CLIENT_HOME=$PWD/tmp-fabric-ca/curator/admin-chaincode
rm -rf $FABRIC_CA_CLIENT_HOME
fabric-ca-client enroll -u https://admin-chaincode:adminpw@localhost:7040 \
 --tls.certfiles=$PWD/tmp-fabric-ca/curator/tls-cert.pem

 