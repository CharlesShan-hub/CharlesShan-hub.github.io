---
title: A.2.2 The Pulsar Helm chart
tags:
  - book
date: 2026-10-08
comment:
---
### A.2.2 The Pulsar Helm chart

I have covered what Helm charts are and how they can be used to deploy an entire application. You will be glad to know that there is a Helm chart for Apache Pulsar that is included in the open source distribution, and you can easily access the chart by cloning the repo, using git, as shown in the following listing.

我已经讲过 Helm chart 是什么、以及它们如何被用来部署一整个应用。你会很高兴地得知：Apache Pulsar 有一个 Helm chart，它随开源发行版一并提供；你可以通过用 git 克隆那个仓库来轻松获得这个 chart，如下面这份清单所示。

Listing A.7 Downloading the Pulsar Helm chart

```bash
git clone https://github.com/apache/pulsar-helm-chart    ❶
 
cd pulsar-helm-chart                                     ❷
```

❶ Clone the Helm chart repo.

❶ 克隆那个 Helm chart 仓库。

❷ Change into the folder that the repo was cloned into.

❷ 切换到该仓库被克隆进的那个文件夹。

Once you have cloned the repo, you can examine the contents of the Helm chart inside the chart’s subfolder, as shown in the next listing. As expected, the directory structure conforms to the Helm directory structure we saw earlier in listing A.6 with Chart.yaml and values.yaml files at the base level along with a directory of template files.

一旦你克隆好那个仓库，就可以在该 chart 的子文件夹内查看这个 Helm chart 的内容，如下一份清单所示。不出所料，其目录结构符合我们早先在清单 A.6 中所看到的 Helm 目录结构：在基础层级上有 Chart.yaml 和 values.yaml 两个文件，并配有一个存放模板文件的目录。

Listing A.8 The Pulsar Helm chart directory layout

```bash
    ls  ./charts/pulsar/                                    ❶
Chart.yaml    templates    values.yaml
 
ls ./charts/pulsar/templates/*.yaml                       ❷
./charts/pulsar/templates/autorecovery-configmap.yaml
./charts/pulsar/templates/autorecovery-service.yaml
./charts/pulsar/templates/autorecovery-statefulset.yaml
./charts/pulsar/templates/bookkeeper-cluster-initialize.yaml
./charts/pulsar/templates/bookkeeper-configmap.yaml
./charts/pulsar/templates/bookkeeper-pdb.yaml
./charts/pulsar/templates/bookkeeper-podmonitor.yaml
./charts/pulsar/templates/bookkeeper-service.yaml
./charts/pulsar/templates/bookkeeper-statefulset.yaml
./charts/pulsar/templates/bookkeeper-storageclass.yaml
./charts/pulsar/templates/broker-cluster-role-binding.yaml
./charts/pulsar/templates/broker-configmap.yaml
./charts/pulsar/templates/broker-pdb.yaml
./charts/pulsar/templates/broker-podmonitor.yaml
./charts/pulsar/templates/broker-rbac.yaml
./charts/pulsar/templates/broker-service-account.yaml
./charts/pulsar/templates/broker-service.yaml
./charts/pulsar/templates/broker-statefulset.yaml
./charts/pulsar/templates/dashboard-deployment.yaml
./charts/pulsar/templates/dashboard-ingress.yaml
./charts/pulsar/templates/dashboard-service.yaml
./charts/pulsar/templates/function-worker-configmap.yaml
./charts/pulsar/templates/grafana-admin-secret.yaml
./charts/pulsar/templates/grafana-configmap.yaml
./charts/pulsar/templates/grafana-deployment.yaml
./charts/pulsar/templates/grafana-ingress.yaml
./charts/pulsar/templates/grafana-service.yaml
./charts/pulsar/templates/keytool.yaml
./charts/pulsar/templates/namespace.yaml
./charts/pulsar/templates/prometheus-configmap.yaml
./charts/pulsar/templates/prometheus-deployment.yaml
./charts/pulsar/templates/prometheus-pvc.yaml
./charts/pulsar/templates/prometheus-rbac.yaml
./charts/pulsar/templates/prometheus-service.yaml
./charts/pulsar/templates/prometheus-storageclass.yaml
./charts/pulsar/templates/proxy-configmap.yaml
./charts/pulsar/templates/proxy-ingress.yaml
./charts/pulsar/templates/proxy-pdb.yaml
./charts/pulsar/templates/proxy-podmonitor.yaml
./charts/pulsar/templates/proxy-service.yaml
./charts/pulsar/templates/proxy-statefulset.yaml
./charts/pulsar/templates/pulsar-cluster-initialize.yaml
./charts/pulsar/templates/pulsar-manager-admin-secret.yaml
./charts/pulsar/templates/pulsar-manager-configmap.yaml
./charts/pulsar/templates/pulsar-manager-deployment.yaml
./charts/pulsar/templates/pulsar-manager-ingress.yaml
./charts/pulsar/templates/pulsar-manager-service.yaml
./charts/pulsar/templates/tls-cert-internal-issuer.yaml
./charts/pulsar/templates/tls-certs-internal.yaml
./charts/pulsar/templates/toolset-configmap.yaml
./charts/pulsar/templates/toolset-service.yaml
./charts/pulsar/templates/toolset-statefulset.yaml
./charts/pulsar/templates/zookeeper-configmap.yaml
./charts/pulsar/templates/zookeeper-pdb.yaml
./charts/pulsar/templates/zookeeper-podmonitor.yaml
./charts/pulsar/templates/zookeeper-service.yaml
./charts/pulsar/templates/zookeeper-statefulset.yaml
./charts/pulsar/templates/zookeeper-storageclass.yaml
```

❶ Examine the structure of the generated Pulsar Helm chart directory.

❶ 查看所生成的 Pulsar Helm chart 目录的结构。

❷ List all of the generated templates.

❷ 列出所生成的全部模板。

As we can see from listing A.8, there are quite a few templates that encapsulate the bulk of the chart logic. Let’s examine the templates associated with the Pulsar brokers to get a better understanding of the details these templates contain.

从清单 A.8 中可以看到，有相当多的模板封装了这个 chart 的主体逻辑。让我们来查看一下与各个 Pulsar broker 相关联的那些模板，以便更好地理解这些模板所包含的细节。

Listing A.9 The Pulsar broker deployment configuration file

```yaml
cat ./charts/pulsar/templates/broker-service.yaml            ❶
...
 
{{- if .Values.components.broker }}
apiVersion: v1
kind: Service
metadata:
  name: "{{ template "pulsar.fullname" . }}-{{ .Values.broker.component }}"
  namespace: {{ .Values.namespace }}
  labels:
    {{- include "pulsar.standardLabels" . | nindent 4 }}
    component: {{ .Values.broker.component }}
  annotations:
{{ toYaml .Values.broker.service.annotations | indent 4 }}
spec:
  ports:
  # prometheus needs to access /metrics endpoint
  - name: http
    port: {{ .Values.broker.ports.http }}                    ❷
  {{- if or (not .Values.tls.enabled) (not .Values.tls.broker.enabled) }}
  - name: pulsar
    port: {{ .Values.broker.ports.pulsar }}                  ❸
  {{- end }}
  {{- if and .Values.tls.enabled .Values.tls.broker.enabled }}  ❹
  - name: https
    port: {{ .Values.broker.ports.https }}                   ❺
  - name: pulsarssl
    port: {{ .Values.broker.ports.pulsarssl }}               ❻
  {{- end }}
  clusterIP: None
  selector:
    app: {{ template "pulsar.name" . }}
    release: {{ .Release.Name }}
    component: {{ .Values.broker.component }}
{{- end }}
```

❶ The file containing the Pulsar Broker service definition

❶ 包含 Pulsar Broker 服务定义的那个文件。

❷ The HTTP port to use

❷ 要使用的 HTTP 端口。

❸ The data port to use

❸ 要使用的数据端口。

❹ Whether the Broker should use TLS or not

❹ Broker 是否应当使用 TLS。

❺ The secured HTTPS port to use

❺ 要使用的安全 HTTPS 端口。

❻ The secured data port to use

❻ 要使用的数据安全端口。

As you can see in listing A.9, the Pulsar broker definition file depends on parameterized values for configuration. As you may suspect, these values are provided in the values.yaml file that was generated for us when we ran the script to produce the Pulsar Helm chart. The following listing shows the corresponding section of the values.yaml file that contains the definitions for the Pulsar broker.

正如你在清单 A.9 中所看到的，那个 Pulsar broker 定义文件依赖于一些被参数化的取值来做配置。正如你可能猜到的，这些值是在 values.yaml 文件中提供的——当我们运行那个脚本来生成 Pulsar Helm chart 时，该文件就被一并生成好了。下面这份清单展示了 values.yaml 文件中包含各个 Pulsar broker 定义的那一段。

Listing A.10 The Pulsar broker-related values in values.yaml

```yaml
## Pulsar: Broker cluster
## templates/broker-statefulset.yaml
##
broker:
  # use a component name that matches your grafana configuration
  # so the metrics are correctly rendered in grafana dashboard
  component: broker
  replicaCount: 3                                               ❶
  # If using Prometheus-Operator enable this PodMonitor to discover broker scrape targets
  # Prometheus-Operator does not add scrape targets based on k8s annotations
  podMonitor:
    enabled: false
    interval: 10s
    scrapeTimeout: 10s
  ports:                                                        ❷
    http: 8080
    https: 8443
    pulsar: 6650
    pulsarssl: 6651
  # nodeSelector:
    # cloud.google.com/gke-nodepool: default-pool
  ...
    resources:                                                  ❸
    requests:
      memory: 512Mi
      cpu: 0.2
  ## Broker configmap
  ## templates/broker-configmap.yaml                            ❹
  ##
  configData:
    PULSAR_MEM: >
      -Xms128m -Xmx256m -XX:MaxDirectMemorySize=256m            ❺
    PULSAR_GC: >
      -XX:+UseG1GC
      -XX:MaxGCPauseMillis=10
      -Dio.netty.leakDetectionLevel=disabled
      -Dio.netty.recycler.linkCapacity=1024
      -XX:+ParallelRefProcEnabled
      -XX:+UnlockExperimentalVMOptions
      -XX:+DoEscapeAnalysis
      -XX:ParallelGCThreads=4
      -XX:ConcGCThreads=4
      -XX:G1NewSizePercent=50
      -XX:+DisableExplicitGC
      -XX:-ResizePLAB
      -XX:+ExitOnOutOfMemoryError
      -XX:+PerfDisableSharedMem                                 ❻
    managedLedgerDefaultEnsembleSize: "2"                       ❼
    managedLedgerDefaultWriteQuorum: "2"                        ❽
    managedLedgerDefaultAckQuorum: "2"                          ❾
```

❶ Specifies a total of three broker instances

❶ 指定总共三个 broker 实例。

❷ Section that specifies the various port values

❷ 指定各个端口取值的那一段。

❸ Section that specifies the pod resources

❸ 指定 pod 各项资源的那一段。

❹ The associated broker configuration map

❹ 与之关联的 broker 配置映射（configmap）。

❺ The JVM memory settings for the broker pods

❺ broker 各 pod 的 JVM 内存设置。

❻ The JVM garbage collection settings for the broker pods

❻ broker 各 pod 的 JVM 垃圾回收设置。

❼ The ensemble size for the Pulsar ledger

❼ Pulsar ledger 的 ensemble 大小。

❽ The write quorum size for the Pulsar ledger

❽ Pulsar ledger 的写入仲裁大小。

❾ The ack quorum for the Pulsar ledger

❾ Pulsar ledger 的确认仲裁数。

As you can see from listing A.10, these settings are on the small side in terms of resources. This is because the default Pulsar Helm chart is designed specifically for minikube-based deployment. You can modify these values to suit your own needs.

从清单 A.10 中可以看到，这些设置在资源方面偏小。这是因为默认的 Pulsar Helm chart 是专门为基于 minikube 的部署而设计的。你可以修改这些值，以适配自己的需求。
