import { ApiBase } from "src/services/base";
import type {
  RequestParams,
  BaseResponse,
  BasePaginationResponse,
} from "src/services/base";
import { pwdEncrypt } from "src/utils/encryption";
import { SiteApis } from "src/services/api";

export interface Profile {
  id: number;
  created: string;
  updated: string;
  age: number;
  location: string;
  QQ: string;
  telephone: string;
  gender: string;
  avatar: string;
  first_login: true;
  user: User;
  // "roles": [] # TODO
}

export interface User {
  id: number;
  username: string;
  email:  string;
  phone:  string;
  avatar:  string | null;
  role: string;
  is_super_admin:boolean;
  age: number;
  gender: number;
}

export interface loginResponsePayload extends User {
  refresh_token:string;
  access_token:string;
}



/** ***   permission  ******/
export interface Menu {
  name: string;
  url: string;
  icon: string;
  type: number;
  component: string;
  route_name: string;
  parent_id: number;
  id: number;
  children: Menu[];
}

export interface Permissions {
  menu: Menu[];
}

export interface userInfo {
  profile: Profile;
  permissions: Permissions;
  roles: string[];
}

export interface loginFormOrRegisterForm {
  username?: string;
  password: string;
  telephone?: string;
  email?: string;
}

export interface loginResponse extends BaseResponse {
  data: loginResponsePayload;
}

export interface RegisterResponse extends BaseResponse {
  data:Profile
}

export interface GetUserProfileResponse extends BaseResponse {
  data: userInfo;
}

export type registerResponse = BaseResponse;

export interface refreshTokenForm {
  refresh: string;
}
export interface refreshTokenResponse extends BaseResponse {
  data: {
    access: string;
  };
}

export interface GetThirdLoginUrlResponse extends BaseResponse {
  data: {
    url: string;
  };
}

export interface LoginByThirdResponse extends BaseResponse {
  data: {
    oauth_id: number;
    is_bind: boolean;
    access_token: string;
    refresh_token: string;
    profile: Profile;
    permissions_dict: any;
  };
}

export type BindAccountResponse = LoginByThirdResponse;

// export interface GenuListPagination extends BasePaginationResponse {
//   results: Menu[];
// }
export interface GetMenuListResponse extends BaseResponse {
  data: Menu[];
}

export interface GetMenuDetailResponse extends BaseResponse {
  data: Menu;
}

export interface UserListPagination extends BasePaginationResponse {
  results: User[];
}
export interface GetUserListResponse extends BasePaginationResponse {
  data: UserListPagination;
}

export class Apis extends ApiBase {
  public login(loginForm: loginFormOrRegisterForm, params: RequestParams = {}) {
    const pwd = pwdEncrypt(loginForm.password);
    const temForm = {
      count: loginForm.username,
      password: pwd,
      email: loginForm.email,
      telephone: loginForm.telephone,
    };
    return this.request<loginResponse>({
      method: SiteApis.usercenter.login.method,
      url: SiteApis.usercenter.login.url,
      requiredLogin: false,
      data: temForm,
      ...params,
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  }

  public logout(params: RequestParams = {}) {
    return this.request<loginResponse>({
      method: SiteApis.usercenter.logout.method,
      url: SiteApis.usercenter.logout.url,
      requiredLogin: true,
      ...params,
    });
  }

  public async getUserProfile(params: RequestParams = {}) {
    return this.get<GetUserProfileResponse>({
      url: "api/v1/auth/user/profile",
      requiredLogin: true,
      ...params,
    });
  }

  public register(
    registerForm: loginFormOrRegisterForm,
    params: RequestParams = {}
  ) {
    console.log(">>>> register form", registerForm)
    const pwd = pwdEncrypt(registerForm.password);
    const temForm = {
      username: registerForm.username,
      password: pwd,
      email: registerForm.email,
      telephone: registerForm.telephone,
    };
    return this.request<registerResponse>({
      method: SiteApis.usercenter.register.method,
      url: SiteApis.usercenter.register.url,
      requiredLogin: false,
      data: temForm,
      ...params,
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  }

  public async refreshToken(
    requestForm: refreshTokenForm,
    params: RequestParams = {}
  ) {
    await this.request<refreshTokenResponse>({
      url: SiteApis.usercenter.refreshToken.url,
      method: SiteApis.usercenter.refreshToken.method,
      requiredLogin: SiteApis.usercenter.refreshToken.authenticated,
      data: requestForm,
      ...params,
    });
  }

  // ###################### admin ##########################
  /**
   *
   * 获取所有的菜单
   */
  public getMenuList(query_params: any, requestParams: RequestParams = {}) {
    return this.request<GetMenuListResponse>({
      url: SiteApis.usercenter.getMenus.url,
      ...requestParams,
      params: query_params,
      requiredLogin: SiteApis.usercenter.getMenus.authenticated,
      method: SiteApis.usercenter.getMenus.method,
    });
  }

  /**
   * 获取菜单详情
   */
  public async getMenuDetail(id: number, params: RequestParams = {}) {
    const res = await this.get<GetMenuDetailResponse>({
      url: `/api/v1/rbac/menus/${id}`,
      ...params,
      requiredLogin: true,
    });
    return res;
  }

  /**
   * 创建菜单
   */
  public createMenu(form: Menu, params: RequestParams = {}) {
    return this.post<BaseResponse>({
      url: "/api/v1/rbac/menus/",
      data: form,
      ...params,
      requiredLogin: true,
    });
  }

  /**
   * 更新菜单
   */

  public updateMenu(id: number, form: Menu, params: RequestParams = {}) {
    return this.put<BaseResponse>({
      url: `/api/v1/rbac/menus/${id}/`,
      data: form,
      ...params,
      requiredLogin: true,
    });
  }

  /**
   * 删除菜单
   */
  public deleteMenu(id: number, params: RequestParams = {}) {
    return this.delete<BaseResponse>({
      url: `/api/v1/rbac/menus/${id}/`,
      ...params,
      requiredLogin: true,
    });
  }

  /**
   * 获取用户列表
   */
  public getUserList(query_params: any, params: RequestParams = {}) {
    return this.get<GetUserListResponse>({
      url: "/api/v1/auth/user",
      ...params,
      requiredLogin: true,
      params: query_params,
    });
  }

  /**
   * 删除用户
   */
  public deleteUser(id: number, params: RequestParams = {}) {
    return this.delete<GetUserListResponse>({
      url: `/api/v1/auth/user/${id}`,
      ...params,
      requiredLogin: true,
    });
  }

  public resetPwd(
    user_id: number,
    resetPwdForm: any,
    params: RequestParams = {}
  ) {
    console.log(">>>>", resetPwdForm);
    const pwd = pwdEncrypt(resetPwdForm.new_password);
    return this.put<BaseResponse>({
      url: `/api/v1/auth/user/${user_id}/password`,
      data: {
        new_password: pwd,
      },
      ...params,
      requiredLogin: true,
    });
  }

  // ###################### third login ###############################
  public getThirdLoginUrl(type: string, params: RequestParams = {}) {
    return this.get<GetThirdLoginUrlResponse>({
      url: `api/v1/auth/third/url/${type}`,
      ...params,
    });
  }

  public loginByGithub(authCode: string, params: RequestParams = {}) {
    return this.get<LoginByThirdResponse>({
      url: `/api/v1/auth/third/githubLogin?code=${authCode}`,
      ...params,
    });
  }

  public bindAccount(
    loginForm: loginFormOrRegisterForm,
    oauth_id: number,
    params: RequestParams = {}
  ) {
    const pwd = pwdEncrypt(loginForm.password);
    const temForm = {
      username: loginForm.username,
      password: pwd,
      email: loginForm.email,
      telephone: loginForm.telephone,
    };
    return this.post<BindAccountResponse>({
      url: `api/v1/auth/third/bind?oauth_id=${oauth_id}`,
      data: temForm,
      ...params,
    });
  }
}

const AuthApis = new Apis({});

export { AuthApis };
