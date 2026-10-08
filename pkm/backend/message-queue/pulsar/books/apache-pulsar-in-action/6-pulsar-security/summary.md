## Summary

- Pulsar supports TLS wire encryption, which ensures that all data transferred between clients and the Pulsar broker is encrypted.
  Pulsar 支持 TLS 链路加密，它确保客户端与 Pulsar broker 之间传输的所有数据都是加密的。

- Pulsar supports TLS authentication with client certificates, which allows you to distribute these credentials only to trusted users and limit cluster access to only those in possession of a valid client certificate.
  Pulsar 支持使用客户端证书进行 TLS 认证，这让你可以只把这些凭据分发给受信任的用户，并把集群访问权限定为只有持有效客户端证书的人才能进入。

- Pulsar allows you to use JSON web tokens to authenticate users and map them to a specific role.
  Pulsar 允许你使用 JSON Web Token 来认证用户，并把他们映射到某个特定角色。

- Once authenticated, a user is granted a role token that is used to determine which resources within the Pulsar cluster the user is authorized to read from and write to.
  一旦通过认证，用户就会被授予一个角色令牌，该令牌用于决定此用户在 Pulsar 集群内被授权读取和写入哪些资源。

- Pulsar supports message-level encryption to provide security for data stored on the local disk in the bookies. This prevents unauthorized access to any sensitive data that may be inside those messages.
  Pulsar 支持消息级加密，用于保护存储在 bookie 本地磁盘上的数据。这可以防止他人未授权访问这些消息中可能包含的任何敏感数据。
