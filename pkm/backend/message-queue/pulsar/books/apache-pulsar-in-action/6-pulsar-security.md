# 6 Pulsar security

This chapter covers

- Encrypting data transmitted into and out of a Pulsar cluster

- Enabling client authentication using JSON Web Tokens (JWTs)

- Encrypting data stored inside Apache Pulsar

本章内容包括

- 对传入和传出 Pulsar 集群的数据进行加密

- 使用 JSON Web Token（JWT）启用客户端认证

- 对存储在 Apache Pulsar 内部的数据进行加密

This chapter covers how to secure your cluster in order to prevent unauthorized access to the data sent through Apache Pulsar. While the tasks I am going to cover are not important in a development environment, they are critically important for a production deployment to reduce the risk of unauthorized access to sensitive information, ensure data loss prevention, and protect your organization’s public reputation. Modern systems and organizations utilize a combination of security controls and safeguards to provide multiple layers of defense that prevent access to data within the system. This is particularly true for those that must maintain regulatory compliance with security regulations, such as HIPPA, PCI-DSS, or GDPR, just to name a few.

本章讲解如何保护你的集群，以防止未经授权者访问经由 Apache Pulsar 发送的数据。我要讲的这些任务在开发环境中并不重要，但对于生产部署却至关重要——它们能降低敏感信息被未授权访问的风险、确保数据不丢失，并保护你所在组织的公众声誉。现代的系统和组织会组合运用多种安全控制与防护措施，构筑多层防御，阻止他人访问系统内的数据。对于那些必须遵守安全法规（例如 HIPPA、PCI-DSS 或 GDPR，仅举几例）以满足合规要求的组织来说，这一点尤为成立。

Pulsar integrates well with several existing security frameworks that allow you to leverage these tools to secure your Pulsar cluster at multiple levels in order to mitigate the risk of a lapse in one of the security mechanisms, resulting in a total security failure. For instance, even if an unauthorized user were able to access your system with a compromised password, they would still need a valid encryption key to read the encrypted message data.

Pulsar 能与若干现有的安全框架良好集成，使你可以借助这些工具在多个层面上保护 Pulsar 集群，从而降低因某一道安全机制失效而导致整体安全崩溃的风险。举例来说，即便某个未授权用户凭借一个已泄露的密码进入了你的系统，他仍然需要一个有效的加密密钥才能读取被加密的消息数据。


## 子目录

- [6.1 Transport encryption](<6-pulsar-security/6.1-transport-encryption.md>)
- [6.2 Authentication](<6-pulsar-security/6.2-authentication.md>)
- [6.3 Authorization](<6-pulsar-security/6.3-authorization.md>)
- [6.4 Message encryption](<6-pulsar-security/6.4-message-encryption.md>)
- [Summary](<6-pulsar-security/summary.md>)
