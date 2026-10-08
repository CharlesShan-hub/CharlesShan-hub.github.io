---
title: index
tags:
  - book
date: 2026-10-08
comment:
---
# index

A

ACID (atomicity, consistency, isolation, and durability) 25

active failover 32-34

active-standby geo-replication pattern 360-361

actuators 312

addressing topics 54

administering Pulsar

advanced administration 91-94

message inspection 93-94

persistent topic metrics 91-93

creating tenant, namespace, and topic 71-72

IO connectors 156-159

listing connectors 156

monitoring connectors 157-159

Java admin API 72

Pulsar Helm chart 350

advanced message queuing protocol (AMQP) 4

adverse events 242-247

function death 243-247

lagging function 244-245

non-progressing function 245-247

resiliency patterns 242-247

function death 243-247

lagging function 244-245

non-progressing function 245-247

aggregation geo-replication pattern 361-362

aggregator pattern 227

AMQP (advanced message queuing protocol) 4

analysis latency 310

AnomalyDetector function 332

Apache Pulsar 37

additional resources 37

Apache Kafka vs. 19-29

data durability 23-25

message acknowledgment 26-28

message consumption 21-23

message retention 28-29

multilayered architecture 19-21

enterprise messaging systems 4-7

acknowledgment 6

asynchronous communication 6

message consumption 6-7

message retention 6

geo-replication and active failover 32-34

getting started 69-70

guaranteed message delivery 29-30

message consumption patterns 7-8

message queuing 7-8

publish-subscribe messaging 7

messaging systems 8-19

distributed messaging systems 13-19

Enterprise service buses 11-13

generic 8-9

message-oriented middleware 9-11

real-world use cases 34-36

connected cars 36

fraud detection 36

microservices platforms 35-36

unified messaging systems 35

resiliency to failure 31

bookie failure recovery 31

broker failure recovery 31

scalability 30-31

instant scaling without data rebalancing 31

seamless cluster expansion 30

unbounded topic partition storage 30-31

support 32

APIs 193-194

gRPC protocol 193-194

messaging protocol 194

REST protocol 193-194

approximation, univariant analysis 325

apt package manager 343

architecture

Apache Pulsar vs. Apache Kafka 19-21

IIoT architecture 311-313

logical architecture 50-59

physical architecture 39-50

schema registry 195-198

complex types 197-198

primitive types 196-197

asynchronous communication, EMS 6

asynchronous geo-replication 354-358

active-standby geo-replication pattern 360-361

aggregation geo-replication pattern 361-362

configuring 356-358

configure services to use configuration store 357-358

deploying configuration store 356-357

initializing cluster metadata 357

multi-active geo-replication pattern 358-360

atomicity, consistency, isolation, and durability (ACID) 25

authentication 169-179

JWT 174-179

TLS 169-174

authorization 179-186

example scenario 181-186

authorization policies 184-186

order placement use case 181-183

tenant creation 183

roles 179-181

clients 181

super users 180

tenant administrators 181

auto_ack function 121

auto-recovery, Kafka 21

AutoCloseable interface 133

AutoUpdate strategy setting 200

available-sinks command 156

available-sources command 156

AvgSensorReadingFunction 109

Avro schemas 207-209

AWS (Amazon Web Services)

authentication 65-66

offload configuration 65-67

AWS_ACCESS_KEY_ID variable 65

AWS_SECRET_ACCESS_KEY variable 65

B

backlog quotas 181

message expiration vs. 63-64

message retention 61-62

backward compatibility, schema registry 201-203

batch processing, ML models 291

batching 98

bidirectional messaging mesh 328-332

BiDirectionalAnomalyDetector function 332

bin/pulsar-admin source create command 149

bin/pulsar-admin source delete command 152

blocking script 72

bookie failure recovery 31

bookie instances 39

bookie nodes 20

BooKKeeper physical architecture 46-47

broker failure recovery 31

broker instances 39

broker nodes 20

BufferedWriter method 139

BufferedWriter variable 139

built-in connectors 152-156

configuring and creating MongoDB sink connectors 154-156

launching MongoDB cluster 152-153

linking Pulsar and MongoDB containers\
153-154

bundles 41-42

C

CA (certificate authority) 163

cache, resiliency patterns and 262-264

capture latency 310

cardinality sketches 326

CAS (compare-and-swap) operation 48

catch-up reads 43

certificate authority (CA) 163

circuit breaker resiliency pattern 252-256

CircuitBreaker object 256

CircuitBreaker.decorateCheckedSupplier method 256

clients

authorization 181

configuring for Pulsar Helm chart 350-351

close method 133

closed state 252

cluster deployment mode, Pulsar functions\
127-128

cluster master 339

cluster mode 147

\<cluster-name\> command 342

clustering

cluster expansion 30

MOM 10-11

clusterName parameter 358

compare-and-swap (CAS) operation 48

compatibility, schema registry 198-200

backward compatibility 201-203

consumer schema compatibility verification 200

forward compatibility 203-204

full compatibility 204

producer schema compatibility verification 199-200

CompletableFuture 261

complex schema types 197-198

config parameter 132

configuration data 49

configuration store 39, 356

configurationStoreServers setting 358

configuring

asynchronous geo-replication 356-358

configure services to use configuration store 357-358

deploying configuration store 356-357

initializing cluster metadata 357

Pulsar functions

at-least-once processing guarantees 122-123

at-most-once processing guarantees 122

effectively-once processing guarantees 123

connected car service 36

consume() method 142

consumer schema compatibility verification 200

consumer_backlog_eviction policy 62

consumers

in Go client 88-90

in Java client 76-81

in Python client 84-85

content enricher pattern 237-239

content filter pattern 239-240

content-based router pattern, message routing 232-234

Context object 103, 132

credential refresh resiliency pattern 266-268

CreditCardAuthorizationService 254

CreditCardService 234

customer_id data element 183

customer-mobile-app-simulator module 209

CustomerSimulatorSource class 209

customizations field 215

cycles 317

D

DAGs (directed acyclic graphs) 101, 223, 242

data access 289

data sources 272-273

device validation 273-283

driver location data 283-288

use cases 273-288

data access patterns 43-44

data durability

Kafka 24-25

Pulsar 23-25

data flow, Pulsar functions 128

data pipelines 222-225

DataFlow programming 223-225

procedural programming 222-223

data processing layer, IIoT architecture 313

data retention policies 181

DataFlow programming 223-225

DDS (data distribution service) 4

dead letter policy, Java client 81-82

debugging deployed IO connectors 149-152

decorators 254

deep learning 304

Deeplearing4j (DL4J) library 306

defaultNumberOfNamespaceBundles property 42

defaultRetentionSizeInMB configuration property 60

defaultRetentionTimeInMinutes configuration property 60

delivery time estimation, ML models 297-303

deploying 302-303

feature vector mapping 300-302

ML model export 297-300

DeliveryTimeEstimator 303

deploying

IO connectors 147-152

creating and deleting 148-149

debugging deployed connectors 149-152

ML models 291-292

batch processing 291

near real-time deployment 291-294

Pulsar functions 117-128

deployment modes 127-128

function configuration 120-123

function deployment 124-125

function deployment life cycle 126

generating deployment artifact 118-120

Pulsar function data flow 128

device validation 273-283

DeviceRegistrationService 276

DeviceValidation function 274

DeviceValidationService 275

directed acyclic graphs (DAGs) 101, 223, 242

DirectoryConsumerThread type 140

DirectorySource connector 142

distributed messaging systems 13-19

Kafka partition-centric storage 16-17

Pulsar partition-centric storage 18-19

DL4J (Deeplearing4j) library 306

docker exec command 71, 350

docker log command 69

domain-schema module 207

driver location data 283-288

DriverLocation topic 283

DriverLocationSink connector 288

dynamic router pattern, message routing 229-232

dynamic scaling, Kafka 20-21

E

echoFunc function 107

edge analytics 338

IIoT architecture 311-313

data processing layer 313

perception and reaction layer 311-312

transportation layer 312-313

multivariate analysis 328-335

bidirectional messaging mesh 328-332

multivariate dataset construction 332-335

overview 318

Pulsar-based processing layer 313-316

telemetric data 316-317

univariant analysis 319-328

approximation 325-328

noise reduction 319-321

overview 318

statistical analysis 321-325

edge computing 310

EMS (enterprise messaging systems) 4-7

acknowledgment 6

asynchronous communication 6

message consumption 6-7

message retention 6

enable-tls.sh script 163

encryption key property 188

ESB (Enterprise service buses) 11-13

eviction policy 323

exclusive subscriptions 56-57

executeFutureSupplier method 261

F

failover subscriptions 57-58

failure recovery 31

bookie failure recovery 31

broker failure recovery 31

fallback resiliency pattern 264-266

fault detection 247-248

feature calculation, ML models 296-297

feature stores, ML models 295-296

feature vectors, ML models 294-297

feature calculation 296-297

feature stores 295-296

FileRecord type 141

FileWriter variable 139

follower replicas 24

forward compatibility, schema registry 203-204

fraud detection 36

frequent item sketches 326

full compatibility, schema registry 204

function get command 125

function getstatus command 124

functions input 243

G

gen-client-certs.sh script 170

gen-rsa-key.sh script 186

gen-token.sh script 177

generic messaging systems 8-9

serving layer 9

storage layer 9

geo-replication 32-34, 352-362

asynchronous geo-replication 354-358

active-standby geo-replication pattern 360-361

aggregation geo-replication pattern 361-362

configuring 356-358

multi-active geo-replication pattern 358-360

synchronous geo-replication 352-354

GeoEncoding function 268

GeoEncodingService 237, 261

getState method 108

Go client 86-90

creating Pulsar client with 87

Pulsar consumers in 88-90

Pulsar producers in 87-88

Pulsar readers in 90

—go switch 124

Golang SDK functions 107-108

GridCellCalculator function 287

GridCellTrackingService 287

gRPC protocol 193-194

guaranteed message delivery 29-30

H

H5 format 306

half-open state 254

helm install \<chartname\> command 345

helm install command 344

helm package \<chartname\> command 344

I

IIoT (industrial internet of things) architecture 311-313

data processing layer 313

perception and reaction layer 311-312

transportation layer 312-313

initialize-cluster-metadata command 357

input topics 101

integration testing

IO connectors 144-145

Pulsar functions 113-117

IO connectors 160

administering 156-159

listing connectors 156

monitoring connectors 157-159

built-in connectors 152-156

configuring and creating MongoDB sink connectors 154-156

launching MongoDB cluster 152-153

linking Pulsar and MongoDB containers\
153-154

defined 131

deploying 147-152

creating and deleting connectors 148-149

debugging deployed connectors 149-152

developing 137-142

PushSource connectors 139-142

sink connectors 138-139

PushSource connectors 135-137

sink connectors 131-134

source connectors 134-135

testing 142-147

integration testing 144-145

packaging 146-147

unit testing 142-144

IOException 139

IoT gateway 313

J

- -jar switch 124

Java

deploying ML model neural nets in 306-307

Java admin API 72

language native functions 102

Java client 75-83

client configuration 75-76

dead letter policy 81-82

Pulsar consumers in 76-81

Pulsar producers in 76

Pulsar readers in 82-83

Java SDK functions 103-105

java.util.Collection input type 325

java.util.Function interface 102

JPMML library 302

JSON Web Token (JWT) 174-179

JWT (JSON Web Token) 174-179

K

Kafka 19-29

data durability 24-25

message acknowledgment 26-27

message consumption 21-23

message retention 28

multilayered architecture 19-21

auto-recovery 21

dynamic scaling 20-21

key-shared subscriptions 59

KeywordFilterFunction 111

KeywordFilterFunctionLocalRunnerTest 117

kubectl apply -f filename command 343

kubectl exec command 350

kubectl tool 340

Kubernetes in Action ( Lukša) 339

Kubernetes platform 339-351

creating Kubernetes cluster 339-342

install prerequisites 340-341

with Minikube 341-342

Pulsar Helm chart 342-351

administering 350

anatomy of 344-345

configuring clients 350-351

defined 343-345

L

language native functions 102

Java 102

Python 102

layered architecture 39-41

leader replica 24

—link switch 153

LinkedBlockingQueue 137

list command 156

listing IO connectors 156

load balancing 42

load shedding 43

loadBalancerBrokerOverloadedThreshold-\
Percentage property 43

LocalRunner 116, 211

LocationTrackingService 283

LoggedInUser topic 280

logical architecture 50-59

addressing topics 54

consumers 54-55

namespaces 51-52

partitioned topics 52-54

producers 54-55

subscriptions 54-59

exclusive 56-57

failover subscriptions 57-58

key-shared subscriptions 59

shared subscriptions 58-59

tenants 51

topics 52

logical storage architecture 44-46

logical subscriber 21

LookupService 261

Lukša, Marko 339

M

main() method 107

managed ledger information 49

Map type 134

message acknowledgment

enterprise messaging systems 6

Kafka 26-27

Pulsar 26-28

message bus 11

message consumption 7-8

enterprise messaging systems 6-7

Kafka 21-23

message queuing 7-8

publish-subscribe messaging 7

Pulsar 21-23

message encryption 186-190

message expiration

message backlog vs. 63-64

overview 62-63

message queuing 7-8

message queuing telemetry transport (MQTT) 312

message retention

backlog quotas 61-62

data retention 60-61

enterprise messaging systems 6

Kafka 28

Pulsar 28-29

message routing patterns 225-234

content-based router 232-234

dynamic router 229-232

splitter 225-229

message transformation patterns 234-240

content enricher 237-239

content filter 239-240

message translator 235-236

message translator pattern 235-236

message-oriented middleware (MOM) 9-11

MessageListener interface 78

messaging protocol 194

messaging systems 8-19

distributed messaging systems 13-19

partition-centric storage in Kafka 16-17

segment-centric storage in Pulsar 18-19

Enterprise service buses 11-13

generic 8-9

serving layer 9

storage layer 9

message-oriented middleware 9-11

metadata storage 48-50

configuration data 49

dynamic coordination between services 50

managed ledger information 49

ZooKeeper 48-49

micro-batching 98-99

microservice communication

APIs and 193-194

importance of 195

schema registry 192-195

microservices platforms 35-36

Microsoft message queuing (MSMQ) 4

Minikube, creating Kubernetes cluster with\
341-342

ML (machine learning) models 307

delivery time estimation 297-303

feature vector mapping 300-302

ML model export 297-300

model deployment 302-303

deploying 291-292

batch processing 291

near real-time deployment 291-294

feature vectors 294-297

feature calculation 296-297

feature stores 295-296

neural nets 304-307

deployment in Java 306-307

training 304-306

MOM (message-oriented middleware) 9-11

mongo command 152

mongo-test-sink connector 155

MongoDB container

launching 152-153

linking Pulsar and 153-154

MongoDB sink connectors 154-156

monitoring IO connectors 157-159

MQTT (message queuing telemetry transport) 312

MSMQ (Microsoft message queuing) 4

multi-active geo-replication pattern 358-360

multilayered architecture

auto-recovery 21

dynamic scaling 20-21

Kafka 19-21

Pulsar 19-21

multivariate analysis 328-335

bidirectional messaging mesh 328-332

multivariate dataset construction 332-335

overview 318

mvn clean install command 118, 147

N

namespaces

creating 71-72

logical architecture 51-52

NAR (NiFi archive) files 118

near real-time deployment, ML models 291-294

network (RTT) round-trip time 355

neural nets, ML models 304-307

deployment in Java 306-307

training 304-306

NiFi archive (NAR) files 118

nifi-nar-maven-plugin 130

nodes 339

noise reduction, univariant analysis 319-321

non-transient faults 246

Nygard, Michael 252

O

one-touch processing 326

onFailure method 268

open method 139

order_id data element 183

order-validation-service module 216

OrderSolicitationService 229

OrderValidationAggregator 227

OrderValidationService 211, 221

org.apache.pulsar.functions.api.Function interface 103

org.apache.pulsar.functions.api.Record interface 133

org.apache.pulsar.functions.api.SerDe interface 104

org.apache.pulsar.io.core.PushSource class 136

org.apache.pulsar.io.core.Sink interface 132

org.apache.pulsar.io.core.Source interface 134

P

packaging IO connectors 146-147

partition-centric storage

Kafka 16-17

Pulsar 18-19

partitioned topics 52-54

peek-messages command 93

perception and reaction layer, IIoT architecture 311-312

persistenceEnabled setting 284

pf.Start() method 107

physical architecture 39-50

layered architecture 39-41

metadata storage 48-50

configuration data 49

dynamic coordination between services 50

managed ledger information 49

ZooKeeper 48-49

stateless serving layer 41-44

bundles 41-42

data access patterns 43-44

load balancing 42

load shedding 43

stream storage layer 44

BooKKeeper physical architecture 46-47

logical storage architecture 44-46

PMML (Predictive Model Markup Language) 298

primitive schema types 196-197

procedural programming 222-223

process method 102, 140

processing-guarantees function 121

processOrder function 222

producer schema compatibility verification\
199-200

producer_exception policy 62

producer_request_hold policy 62

producers 54-55

in Go client 87-88

in Java client 76

in Python client 83-84

programming model, Pulsar functions 101

ps command 66

public tenant 71

publish-credentials.sh script 168

publish-subscribe messaging 7

Pulsar clients 72-90

Go client 86-90

creating Pulsar client with Go 87

Pulsar consumers in 88-90

Pulsar producers in 87-88

Pulsar readers in 90

Java client 75-83

client configuration 75-76

dead letter policy 81-82

Pulsar consumers in 76-81

Pulsar producers in 76

Pulsar readers in 82-83

Python client 83-86

Pulsar consumers in 84-85

Pulsar producers in 83-84

Pulsar readers in 86

Pulsar Functions 129

defined 100-101

deploying 117-128

deployment modes 127-128

function configuration 120-123

function deployment 124-125

function deployment life cycle 126

generating deployment artifact 118-120

Pulsar function data flow 128

developing 102-110

language native functions 102

Pulsar SDK 103-108

stateful functions 108-110

function death 243-247

lagging function 244-245

non-progressing function 245-247

programming model 101

stream processing 97-100

micro-batching 98-99

stream native processing 99-100

traditional batching 98

testing 111-117

integration testing 113-117

unit testing 112-113

Pulsar Functions patterns 240

data pipelines 222-225

DataFlow programming 223-225

procedural programming 222-223

message routing patterns 225-234

content-based router 232-234

dynamic router 229-232

splitter 225-229

message transformation patterns 234-240

content enricher 237-239

content filter 239-240

message translator 235-236

Pulsar Helm chart 342-351

administering 350

anatomy of 344-345

configuring clients 350-351

defined 343-345

Pulsar proxy 41

Pulsar SDK 103-108

Golang SDK functions 107-108

Java SDK functions 103-105

Python SDK functions 105-106

pulsar_rate_in function 248

pulsar_rate_out function 248

pulsar_storage_backlog_size function 248

pulsar-admin 71

pulsar-admin sink get command 158

pulsar-admin sink list command 156

pulsar-admin sink status command 157

pulsar-admin sink update command 159

Pulsar-based processing layer 313-316

pulsar-client 119

pulsar-standalone-secure 211

PulsarClient object 75

PushSource connectors 135-137, 139-142

putstate command 299

putState method 108

—py switch 124

Python client 83-86

Pulsar consumers in 84-85

Pulsar producers in 83-84

Pulsar readers in 86

Python language-native functions 102

Python SDK functions 105-106

Q

quantiles, defined 326-328

R

ranking 327

rate limiter resiliency pattern 257-259

read() method 134

readers

in Go client 90

in Java client 82-83

in Python client 86

real-time compute 4

real-time messaging 4

rebalancing 23

receive() method 78

recipient list pattern 229

RegisterdDevices table 280

RegisteredUsers table 274

*Release It!* (Nygard) 252

remote procedure call (RPC) 5

resiliency patterns 270

adverse events 242-247

function death 243-247

lagging function 244-245

non-progressing function 245-247

cache 262-264

circuit breaker 252-256

credential refresh pattern 266-268

fallback pattern 264-266

fault detection 247-248

multiple layers of resiliency 268-270

rate limiter 257-259

retry pattern 249-252

time limiter 260-262

resource pools 340

REST protocol 5, 193-194

RestaurantFeaturesLookup function 301

retain-ordering function 121

retry resiliency pattern 249-252

Retry.decorateCheckedSupplier method 251

return address pattern 230

return-addr property 230

roles

clients 181

super users 180

tenant administrators 181

RoundRobinPartition routing mode 53

RPC (remote procedure call) 5

S

SCADA (supervisory control and data acquisition) 312

scalability 30-31

cluster expansion 30

instant scaling without data rebalancing 31

topic partition storage 30-31

scalable storage 4

ScheduledThreadExecutor 334

schema registry 217

architecture 195-198

complex types 197-198

primitive types 196-197

compatibility 198-200

backward compatibility 201-203

consumer schema compatibility verification 200

forward compatibility 203-204

full compatibility 204

producer schema compatibility verification 199-200

example scenario 205-217

consuming food order events 211-212

evolving schema 215-217

modelling food order event in Avro 207-209

producing food order events 209-211

microservice communication 192-195

APIs 193-194

importance of schema registry 195

versioning 198

SchemaInfo data structure 195

SchemaInfo object 197

seasonality 317

security 190

authentication 169-179

JWT 174-179

TLS 169-174

authorization 179-186

example scenario 181-186

roles 179-181

message encryption 186-190

transport encryption 162-169

sendData method 117

serverless programming model 100

service-oriented architecture (SOA) applications 11

serving layer, generic messaging systems 9

set-clusters command 359

setCryptoFailureAction() method 189

sharding 10

shared subscriptions 58-59

simple moving average 320

simple object access protocol (SOAP) 5

SinglePartition routing mode 53

sink connectors 131-134

developing 138-139

MongoDB 154-156

SinkContext 132

sinks type 131

SketchConsolidator function 334

SOA (service-oriented architecture) applications 11

SOAP (simple object access protocol) 5

SoCs (systems on a chip) 313

source connectors 134-135

—source-config-file parameter 134

SourceContext object 135

sources type 131

splitter pattern, message routing 225-229

startConsumer method 117

stateful functions 108-110

stateless serving layer 41-44

bundles 41-42

data access patterns 43-44

load balancing 42

load shedding 43

statistical analysis 321-325

status field 201

storage layer, generic messaging systems 9

stream native processing 99-100

stream processing 12, 97-100

micro-batching 98-99

stream native processing 99-100

traditional batching 98

stream storage layer 44

BooKKeeper physical architecture 46-47

logical storage architecture 44-46

subscriptions 54-59

exclusive 56-57

failover subscriptions 57-58

key-shared subscriptions 59

shared subscriptions 58-59

super users 180

supervisory control and data acquisition (SCADA) 312

support 32

synchronous geo-replication 352-354

systems on a chip (SoCs) 313

T

tailing reads 43

telemetric data 316-317

telemetry 316

tenant administrators 181

tenants 51, 71-72

tensors 306

testing

IO connectors 142-147

integration testing 144-145

packaging 146-147

unit testing 142-144

Pulsar functions 111-117

integration testing 113-117

unit testing 112-113

tiered storage 64-67

AWS authentication 65-66

AWS offload configuration 65

configuring offload to run automatically 66-67

tiered-storage offload 181

time limiter resiliency pattern 260-262

time-to-live (TTL) policies 63

TLS (transport layer security)

authentication 169-174

enabling on Pulsar 162-169

tlsTrustCertsFilePath property 164

topic partition storage 30-31

topics 52, 54, 71-72

training, ML model neural nets 304-306

transient faults 246

transport encryption 162-169

transportation layer, IIoT architecture 312-313

trigger policy 323

Try.of method 251

TTL (time-to-live) policies 63

U

UnauthorizedException 268

unified messaging systems 35

unit testing

IO connectors 142-144

Pulsar functions 112-113

univariant analysis 319-328

approximation 325-328

noise reduction 319-321

overview 318

statistical analysis 321-325

UnknownDevices topic 277

update command 159

UserDetails object 278

UserDetailsByActiveUser function 278

UserDetailsLookup class 278

V

ValidatedFoodOrder object 227

Vavr functional library 266

VerificationCodeSender function 280

VerificationCodeValidator function 280

versioning, schema registry 198

Void function 109

-volume switch 168

W

withFallback method 265

WOL (write-ahead log) 44

WordCount function 110

write method 132

Y

yum package manager 343

Z

zkServers property 354

ZooKeeper 48-49

zookeeper-shell tool 48

zookeeperServers parameter 358

zookeeperServers property 354
