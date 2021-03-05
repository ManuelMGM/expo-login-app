import { ServerUser, users } from "./mockedUsers";
import User from "./User";

const defualtToken: string = "jwt-token";

enum Errors {
  INVALID_SESSION = "INVALID_SESSION",
  BAD_REQUEST = "BAD_REQUEST",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
}

interface Response {
  result: boolean;
  data?: any;
  error?: { code: Errors; message: string };
}

class Requests {
  findUser(email: string, password: string): ServerUser {
    return users.find(
      (user) => user.email == email && user.password == password
    );
  }

  async get(url: string, query: any = {}): Promise<Response> {
    return new Promise((resolve) => {
      const result = this.getMethod(url, query);

      // making asynchronous method (simulating server time)
      setTimeout(() => resolve(result), 3000);
    });
  }

  async getMethod(url: string, query: any = {}) {
    if (url === "/api/v0/users/me") {
      if (query?.token === defualtToken) {
        const currentUser: ServerUser = await User.get();
        if (!currentUser) {
          return {
            result: false,
            error: {
              code: Errors.INVALID_SESSION,
              message: "Sesión de usuario inválido.",
            },
          };
        }

        const user = this.findUser(currentUser.email, currentUser.password);

        if (!!user) {
          //Update user on localStorage in case user has been changed on DB for some reason
          User.set(user);
          return { result: true, data: user };
        } else {
          return {
            result: false,
            error: {
              code: Errors.INVALID_SESSION,
              message: "Sesión de usuario expirada o desactualizada.",
            },
          };
        }
      }
    }

    return {
      result: false,
      error: {
        code: Errors.BAD_REQUEST,
        message: "El formato de la consulta es inválida.",
      },
    };
  }

  async post(url: string, body: any = {}): Promise<Response> {
    return new Promise((resolve) => {
      const result = this.postMethod(url, body);

      // making asynchronous method (simulating server time)
      setTimeout(() => resolve(result), 3000);
    });
  }

  postMethod(url: string, body: any = {}): Response {
    if (url === "/api/v0/authenticate") {
      if (body?.email && body?.password) {
        const { email, password } = body,
          user = this.findUser(email, password);

        if (!!user) {
          return { result: true, data: user };
        } else {
          return {
            result: false,
            error: {
              code: Errors.INVALID_CREDENTIALS,
              message: "Usuario o Contraseña inválido.",
            },
          };
        }
      }
    }

    return {
      result: false,
      error: {
        code: Errors.BAD_REQUEST,
        message: "El formato de la consulta es inválida.",
      },
    };
  }
}

export default new Requests();
