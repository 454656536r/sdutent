import axios from 'axios';

const baseURL = 'https://testshool.zzgoodqc.cn/index.php/index/';
const apiService = {
  // 数据分页
  getAllStudentList: (token,currentPage) => {
    return axios.post(`${baseURL}User/getAllStudentList`, {pagelimit:6,page:currentPage}, {
      headers: {
        token: token
      }
    });
  },
  teacherlist: (wedid)=>{
    return axios.post(`${baseURL}User/getWxStudentList`,{webid:wedid});
  },
  deleteWxUser: (id) => {
    return axios.post(`${baseURL}User/delWxUser`, { id: id });
  },
  editor: (arr) => {
    return axios.post(`${baseURL}User/addWxUser`, arr);
  },
  addevent: (add) => {
    return axios.post(`${baseURL}User/addWxUser`, add);
  },
  teacher: () => {
    return axios.post(`${baseURL}User/getwebUsers`);
  },
  // 登录
  login: (napwd) => {
    return axios.post(`${baseURL}index/login`, napwd)
  },
  // 搜索
  search: (token,searchlist) => {
    return axios.post(`${baseURL}User/getAllStudentList`, {name:searchlist}, {
      headers: {
        token: token,
      }

    })
  }
};

export default apiService;
