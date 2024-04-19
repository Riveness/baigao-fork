
/**
* 后台用户管理
*/
import axios from 'axios';
import type { AdminUserDto } from './dto/AdminUserDto';
import type { UpdatePasswordDto } from './dto/UpdatePasswordDto';


/**
* createAdminUser:创建后台用户
* 
* @returns 
*/
export const AdminUserControllerCreate = (data: AdminUserDto, config?: any) => {
   return axios.post(`/api/adminUser/create`, data, config);
}
/**
* updateAdminUser:更新后台用户信息
* id：id;
* @returns 
*/
export const AdminUserControllerUpdate = (id: string,data: AdminUserDto, config?: any) => {
   return axios.post(`/api/adminUser/update/${id}`, data, config);
}
/**
* updateAdminUserPassword:后台用户密码修改
* id：id;
* @returns 
*/
export const AdminUserControllerUpdatePassword = (id: string,data: UpdatePasswordDto, config?: any) => {
   return axios.post(`/api/adminUser/updatePassword/${id}`, data, config);
}
/**
* resetAdminUserPassword:后台用户密码重置
* id：id;
* @returns 
*/
export const AdminUserControllerResetPassword = (id: string, config?: any) => {
   return axios.post(`/api/adminUser/resetPassword/${id}`, {}, config);
}
/**
* deleteAdminUser:删除后台用户
* id：id;
* @returns 
*/
export const AdminUserControllerDelete = (id: string, config?: any) => {
   return axios.delete(`/api/adminUser/delete/${id}`, config);
}
             
/**
* getAdminUserPage:获取后台用户分页
* pageSize：单页显示条数;pageIndex：当前页码;keyWord：搜索关键字;companyUUID：所属公司;
* @returns 
*/
export const AdminUserControllerGetPage = (query: { pageSize: number,pageIndex: number,keyWord: string,companyUUID: string }, config?: any) => {
   return axios.get(`/api/adminUser/getPage`, { params: query,...config });
}
/**
* getAdminUserList:获取后台用户分页
* 
* @returns 
*/
export const AdminUserControllerGetList = ( config?: any) => {
   return axios.get(`/api/adminUser/getList`, { ...config });
}
