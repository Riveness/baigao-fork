
/**
* 菜单管理
*/
import axios from 'axios';
import type { AdminMenuDto } from './dto/AdminMenuDto';


/**
* createMenu：新增菜单
* 
* @returns 
*/
export const AdminMenuControllerCreate = (data: AdminMenuDto, config?: any) => {
   return axios.post(`/api/admin/menu/create`, data, config);
}
/**
* updateMenu：编辑菜单
* id：id;
* @returns 
*/
export const AdminMenuControllerUpdate = (id: string,data: AdminMenuDto, config?: any) => {
   return axios.post(`/api/admin/menu/update/${id}`, data, config);
}
/**
* getMenu：获取菜单树
* keyWord：undefined;
* @returns 
*/
export const AdminMenuControllerGetTree = (query: { keyWord: string }, config?: any) => {
   return axios.get(`/api/admin/menu/getMenu`, { params: query,...config });
}
/**
* getTreeByMenuType：根据菜单资源属性获取菜单树
* menuType：menuType;
* @returns 
*/
export const AdminMenuControllerGetTreeByMenuType = (menuType: number, config?: any) => {
   return axios.get(`/api/admin/menu/getMenu/${menuType}`, { ...config });
}
/**
* deleteMenu：删除菜单
* id：id;
* @returns 
*/
export const AdminMenuControllerDelete = (id: string, config?: any) => {
   return axios.delete(`/api/admin/menu/delete/${id}`, config);
}
             
/**
* changeMenuParent:移动菜单
* id：id;pId：pId;
* @returns 
*/
export const AdminMenuControllerChangeParent = (id: string,pId: string, config?: any) => {
   return axios.post(`/api/admin/menu/changeParent/${id}/${pId}`, {}, config);
}
