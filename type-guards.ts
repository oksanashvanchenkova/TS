type User = {
    username: string;
    password: string;
  };
  
  type Guest = {
    sessionId: string;
  };
  type Admin = {
    role: "admin";
    username: string;
    password: string;
  };
  
  type ExternalUser = {
    oauthToken: string;
  };
  type Entity = User | Guest | Admin | ExternalUser;


  function isUser(entity: Entity): entity is User {
    return (entity as User).username !== undefined && (entity as User).password !== undefined;
  }
  function isGuest(entity: Entity): entity is Guest {
    return (entity as Guest).sessionId !== undefined;
  }
  function isAdmin(entity: Entity): entity is Admin {
    return (entity as Admin).role === "admin";
  }
  function isExternalUser(entity: Entity): entity is ExternalUser {
    return (entity as ExternalUser).oauthToken !== undefined;
  }
  
  function login(entity: Entity): void {
    if (isUser(entity)) {
      console.log(`Авторизація користувача з ім'ям: ${entity.username}`);
    } else if (isGuest(entity)) {
      console.log(`Авторизація гостя з сесією: ${entity.sessionId}`);
    } else if (isAdmin(entity)) {
      console.log(`Вхід адміністратора з правами: ${entity.username}`);
    } else if (isExternalUser(entity)) {
      console.log(`Авторизація зовнішнього користувача з токеном: ${entity.oauthToken}`);
    } else {
      console.error("Невідомий тип користувача");
    }
  }