import { ModuleName } from "@/core/public_api";
import BaseApi from "../base_api";
import axiosAPI from "..";

export default class EmployeeApi extends BaseApi {
  constructor(){
    super(ModuleName.Employee + 's');
  }

  /**
   * API Login
   * Khắc Tiềm - 08.03.2023
   */
  public login = (employee: any) => {
    return axiosAPI.post(`/Login/Authentication`, employee)
  }

  /**
   * API Change Password
   * Khắc Tiềm - 08.03.2023
   */
  public changePassword = (employee: any) => {
    return axiosAPI.post(`/Login/change-password`, employee)
  }
}