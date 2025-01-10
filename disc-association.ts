interface CreateUserAction {
  type: "CREATE_USER";
  payload: { name: string; age: number };
}

interface DeleteUserAction {
  type: "DELETE_USER";
  payload: { userId: number };
}

interface UpdateUserAction {
  type: "UPDATE_USER";
  payload: { userId: number; name?: string; age?: number };
}

interface BlockUserAction {
  type: "BLOCK_USER";
  payload: { userId: number; reason: string };
}

type Action = CreateUserAction | DeleteUserAction | UpdateUserAction | BlockUserAction;

function handleAction(action: Action) {
  switch (action.type) {
    case "CREATE_USER":
      console.log(`Created user: ${action.payload.name}, age: ${action.payload.age}`);
      break;
    case "DELETE_USER":
      console.log(`Deleted user with ID: ${action.payload.userId}`);
      break;
    case "UPDATE_USER":
      console.log("Updated user:", action.payload);
      break;
    case "BLOCK_USER":
      console.log(`Blocked user with ID: ${action.payload.userId} for ${action.payload.reason}`);
      break;
    default:
      const exhaustiveCheck: never = action;
  }
}
