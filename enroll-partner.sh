export FABRIC_CA_CLIENT_HOME=$PWD/tmp-fabric-ca/partner/admin
fabric-ca-client enroll -u https://admin:adminpw@localhost:7060 --tls.certfiles=$PWD/tmp-fabric-ca/partner/tls-cert.pem

fabric-ca-client register --id.name admin-chaincode --id.secret adminpw \
 --id.type admin -u https://admin:adminpw@localhost:7060 \
 --tls.certfiles=$PWD/tmp-fabric-ca/partner/tls-cert.pem

export FABRIC_CA_CLIENT_HOME=$PWD/tmp-fabric-ca/partner/admin-chaincode
rm -rf $FABRIC_CA_CLIENT_HOME
fabric-ca-client enroll -u https://admin-chaincode:adminpw@localhost:7060 \
 --tls.certfiles=$PWD/tmp-fabric-ca/partner/tls-cert.pem

 